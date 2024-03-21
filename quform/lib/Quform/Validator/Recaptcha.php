<?php

/**
 * Quform_Validator_Recaptcha
 *
 * Checks the given reCAPTCHA solution is correct
 *
 * @package Quform
 * @subpackage Validator
 * @copyright Copyright (c) 2009-2021 ThemeCatcher (https://www.themecatcher.net/)
 */
class Quform_Validator_Recaptcha extends Quform_Validator_Abstract
{
    /**
     * reCAPTCHA secret key
     * @var string
     */
    protected $_secretKey;

    /**
     * reCAPTCHA version
     * @var string
     */
    protected $_version = 'v2';

    /**
     * reCAPTCHA score threshold
     * @var float
     */
    protected $_threshold = 0.5;

    /**
     * Error message templates
     * @var array
     */
    protected $_messageTemplates = array(
        'missing-input-secret' => 'The secret parameter is missing',
        'invalid-input-secret' => 'The secret parameter is invalid or malformed',
        'missing-input-response' => 'The response parameter is missing',
        'invalid-input-response' => 'The response parameter is invalid or malformed',
        'error' => 'An error occurred, please try again',
        'score-too-low' => 'Sorry, your submission failed our automated spam checks'
    );

    /**
     * Constructor
     *
     * @param array $options
     */
    public function __construct($options = null)
    {
        parent::__construct($options);

        if (is_array($options)) {
            if (array_key_exists('secretKey', $options)) {
                $this->_secretKey = $options['secretKey'];
            }
            if (array_key_exists('version', $options)) {
                $this->_version = $options['version'];
            }
            if (array_key_exists('threshold', $options)) {
                $this->_threshold = $options['threshold'];
            }
        }
    }

    /**
     * Checks the reCAPTCHA answer
     *
     * @param   string     $value  The value to check
     * @throws  Exception          If the reCAPTCHA Secret Key is missing
     * @return  boolean            True if valid false otherwise
     */
    public function isValid($value)
    {
        $response = $this->verify($value);

        if (!is_array($response) || !isset($response['success'])) {
            $this->addMessage($this->_messageTemplates['error']);
            return false;
        }

        if (!$response['success']) {
            if (isset($response['error-codes']) && is_array($response['error-codes']) && count($response['error-codes'])) {
                foreach ($response['error-codes'] as $error) {
                    if (array_key_exists($error, $this->_messageTemplates)) {
                        $message = $this->_messageTemplates[$error];
                    } else {
                        $message = $this->_messageTemplates['invalid-input-response'];
                    }

                    $this->addMessage($message);
                }
            } else {
                $this->addMessage($this->_messageTemplates['error']);
            }

            return false;
        }

        if ($this->_version == 'v3') {
            if (isset($response['score'], $response['action']) && $response['action'] == 'quform' && is_numeric($response['score'])) {
                $threshold = (float) $this->_threshold;

                if ($response['score'] < $threshold) {
                    $this->addMessage($this->_messageTemplates['score-too-low']);
                    return false;
                }
            } else {
                $this->addMessage($this->_messageTemplates['error']);
                return false;
            }
        }

        return true;
    }

    /**
     * Verify the reCAPTCHA token
     *
     * @param   string      $value  The reCAPTCHA token
     * @throws  Exception           If the reCAPTCHA Secret Key is missing
     * @return  array|bool          The response data or false on failure
     */
    protected function verify($value)
    {
        if ($this->_secretKey == null) {
            throw new Exception('reCAPTCHA Secret Key is required');
        }

        $params = array(
            'secret' => $this->_secretKey,
            'response' => $value,
            'remoteip' => Quform::getIPAddress()
        );

        $url = 'https://www.google.com/recaptcha/api/siteverify';
        $query = http_build_query($params, '', '&');

        if (function_exists('curl_init')) {
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
            curl_setopt($ch, CURLOPT_TIMEOUT, 5);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-type: application/x-www-form-urlencoded'));
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $query);
            curl_setopt($ch, CURLOPT_CAINFO, QUFORM_ROOT . '/lib/cacert.pem');
            $response = curl_exec($ch);
            curl_close($ch);
        } else {
            $options = array(
                'http' => array(
                    'method' => 'POST',
                    'header' => 'Content-type: application/x-www-form-urlencoded',
                    'content' => $query
                )
            );

            $context = stream_context_create($options);
            $response = file_get_contents($url, false, $context);
        }

        if (!is_string($response) || $response === '') {
            return false;
        }

        $response = json_decode($response, true);

        return $response;
    }
}
