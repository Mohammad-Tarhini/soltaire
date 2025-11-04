<?php
include("../connection/connection.php");
if(isset($_POST['name']) && isset($_POST['score'])){
    $name = $_POST['name'];
    $score = $_POST['score'];

    $stmt=$mysqli->prepare("SELECT * FROM players WHERE name=?");
    $stmt->bind_param("s", $name);
    if($stmt->execute()){
        $result=$stmt->get_result();
        if($result->num_rows > 0){
            $stmt1=$mysqli->prepare("UPDATE players SET score=? WHERE name=?");
            $stmt1->bind_param("is", $score, $name);
            if($stmt1->execute()){
                echo json_encode(["status" => "success", "message" => "Player score updated successfully"]);
            } else {
                echo json_encode(["status" => "error", "message" => "Failed to update player score"]);
            }
        }
    
    else{
    $stmt2 = $mysqli->prepare("INSERT INTO players (name, score) VALUES (?, ?)");
    $stmt2->bind_param("si", $name, $score);
    if($stmt2->execute()){
        echo json_encode(["status" => "success", "message" => "Player added successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to add player"]);
    }
    $stmt2->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid input"]);
}
}}

?>