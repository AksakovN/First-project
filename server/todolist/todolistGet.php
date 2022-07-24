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

    if (isset($data["id"]) && !empty($data["id"])) {
        $jsonString = file_get_contents("todolist.json");
        $todos = json_decode($jsonString, true);
        $id = $data["id"];
        $name = $data["name"];
        $text = $data["text"] ?? "";
        $crDate = $data["crDate"];
        $userID = $data["userID"];
        $todos[] = ["id" => $id, "name" => $name, "text" => $text, "crDate" => $crDate, "userID" => $userID];
        $jsonString = json_encode($todos);
        file_put_contents("todolist.json", $jsonString);       
    }
}



