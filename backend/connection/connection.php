<?php
$db_host = 'localhost';
$db_name = 'solitaire';
$db_user = 'root';
$db_pass = 'null';
try {
   $mysqli =new mysqli($db_host, $db_user, $db_pass, $db_name);
} catch (Exception $e) {
    die("Connection failed: " . $e->getMessage());
}
