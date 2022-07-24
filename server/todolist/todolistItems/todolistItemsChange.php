<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type");
$jsonString = file_get_contents("todolistItems.json");
$todos = json_decode($jsonString, true);

if ($_SERVER["REQUEST_METHOD"] == "POST") {  
    $json = file_get_contents('php://input');
    $dataJ = json_decode($json);
    $data = (array) $dataJ;
    if (count($data) == 0) {
        echo json_encode('');die();
    }
    if (isset($data["id"]) && !empty($data["id"])) {
        $id = $data["id"];
        $name = $data["name"];
        $text = $data["text"];
        $date = $data["date"] ?? "";
        $crDate = $data["crDate"];
        $delID = $data["delID"];
        $userID = $data["userID"];
        $newArray[] = ["id" => $id, "name" => $name, "text" => $text, "date" => $date, "crDate" => $crDate, "delID" => $delID, "userID" => $userID];
        $result = array_search($id, array_column($todos, "id"));
        array_splice($todos, $result, 1, $newArray);
        $jsonString = json_encode($todos);
        file_put_contents("todolistItems.json", $jsonString);
    }
}

