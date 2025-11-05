<?php
$db_host = 'localhost';
$db_name = 'solitairedb';
$db_user = 'root';
$db_pass = '';
try {
   $mysqli =new mysqli($db_host, $db_user, $db_pass, $db_name);
} catch (Exception $e) {
    die("Connection failed: " . $e->getMessage());
}
