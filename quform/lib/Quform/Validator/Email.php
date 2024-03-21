<?php

/**
 * Quform_Validator_Email
 *
 * Checks whether or not the given value is a valid email address
 *
 * @package Quform
 * @subpackage Validator
 * @copyright Copyright (c) 2009-2021 ThemeCatcher (https://www.themecatcher.net/)
 */
class Quform_Validator_Email extends Quform_Validator_Abstract
{
    /**
     * Error message templates. Placeholders:
     *
     * %s = the given email address
     *
     * @var array
     */
    protected $_messageTemplates = array(
        'invalid' => 'Invalid email address'
    );

    /**
     * Check email address validity
     *
     * @param   string  $value  Email address to be checked
     * @return  boolean         True if email is valid, false if not
     */
    public function isValid($value)
    {
        if (!\PHPMailer\PHPMailer\PHPMailer::validateAddress($value)) {
            $this->addMessage(sprintf($this->_messageTemplates['invalid'], $value));
            return false;
        }

        return true;
    }
}
