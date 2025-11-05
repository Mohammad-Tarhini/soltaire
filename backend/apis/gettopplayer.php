<?php

// Allow requests from your frontend
header("Access-Control-Allow-Origin: *");

// Allow these HTTP methods
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type");

// If the request is preflight (OPTIONS), stop here
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
//The previous statements are taken from ChatGPT.
try{
include("../connection/connection.php");

$stmt = $mysqli->prepare("SELECT name, score FROM players ORDER BY score DESC LIMIT 5;");
if($stmt->execute()){
    $result = $stmt->get_result();
    $players = [];
    while($row = $result->fetch_assoc()){
        $players[] = $row;
    }
    if( count($players)==0){
        echo json_encode(["status" =>"error","message"=>"is empty data"]);
    }
    else{
        echo json_encode(["status" => "success", "players" => $players]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Failed to retrieve top players"]);
}
}catch(Exception  $e){
    echo json_encode(["status" =>"error" , "message" => $e->getMessage()]);
}


?>