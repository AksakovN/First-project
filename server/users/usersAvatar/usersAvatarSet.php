<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type");
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $json = file_get_contents('php://input');
    $dataJ = json_decode($json);
    $data = (array) $dataJ;
    if (count($data) == 0) {
        echo json_encode('');die();
    }
    $newName = $data["userID"];
    $jsonString = json_encode($newName);
    file_put_contents("usersAvatar.json", $jsonString);
}


