<?php
/**
 * This php code is for getting location identifier from mevo page
 */
header('Content-Type: application/javascript');

$originalPage = file_get_contents("https://rowermevo.pl");
$found = preg_match("/(locations.js\?key=)([a-z0-9]*)/", $originalPage, $matches);
if($found && !empty($matches[2])){
    $identifier = $matches[2];
    echo "var identifier = '" . $identifier . "';";
} else {
    throw new Exception("Identifier not found :-(");
}

