<?php
include("../connection/connection.php");
$stmt = $mysqli->prepare("SELECT top 5 name, score FROM players ORDER BY score DESC");
if($stmt->execute()){
    $result = $stmt->get_result();
    $players = [];
    while($row = $result->fetch_assoc()){
        $players[] = $row;
    }
    echo json_encode(["status" => "success", "players" => $players]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to retrieve top players"]);
}


?>