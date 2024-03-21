<?php
/**
 * Quform initialisation
 *
 * You shouldn't need to change this file unless there is a problem
 */

// Prevent direct script access
if ($_SERVER['REQUEST_METHOD'] != 'POST' || !defined('QUFORM_ROOT')) {
    exit;
}

// Enable error reporting if debug mode is on
if (defined('QUFORM_DEBUG') && QUFORM_DEBUG) {
    error_reporting(E_ALL);
    @ini_set('display_errors', 'On');
} else {
    error_reporting(0);
    @ini_set('display_errors', 'Off');
}

// Define constants
defined('QUFORM_VERSION') || define('QUFORM_VERSION', '2.5.0');
defined('QUFORM_CHARSET') || define('QUFORM_CHARSET', 'UTF-8');
defined('QUFORM_UPLOAD_ERR_TYPE') || define('QUFORM_UPLOAD_ERR_TYPE', 128);
defined('QUFORM_UPLOAD_ERR_FILE_SIZE') || define('QUFORM_UPLOAD_ERR_FILE_SIZE', 129);
defined('QUFORM_UPLOAD_ERR_NOT_UPLOADED') || define('QUFORM_UPLOAD_ERR_NOT_UPLOADED', 130);
defined('QUFORM_HTMLSPECIALCHARS_DOUBLE_ENCODE') || define('QUFORM_HTMLSPECIALCHARS_DOUBLE_ENCODE', version_compare(PHP_VERSION, '5.2.3', '>='));

// Include required libraries
require_once QUFORM_ROOT . '/vendor/autoload.php';
require_once QUFORM_ROOT . '/lib/Quform.php';
Quform::registerAutoload();

// Instantiate the form
$form = new Quform();
