<?php
/**
 * PHP Built-in Server Router for WordPress & WPGraphQL
 */

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$file = __DIR__ . $uri;

// Serve existing static files directly
if ($uri !== '/' && file_exists($file)) {
    if (is_dir($file)) {
        if (file_exists($file . '/index.php')) {
            require $file . '/index.php';
            return true;
        }
    } else {
        return false; // let the built-in server serve the static file
    }
}

// Ensure PHP script execution variables
$_SERVER['SCRIPT_FILENAME'] = __DIR__ . '/index.php';
$_SERVER['SCRIPT_NAME']     = '/index.php';
$_SERVER['PHP_SELF']        = '/index.php';

// Route everything else through index.php
require __DIR__ . '/index.php';
