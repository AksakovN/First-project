<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type");
$jsonString = file_get_contents("todolistItems.json");
$todos = json_decode($jsonString, true);
if (isset($todos) && !empty($todos)) {
    if ($_SERVER["REQUEST_METHOD"] == "POST") {  
        $json = file_get_contents('php://input');
        $dataJ = json_decode($json);
        $data = (array) $dataJ;
        if (count($data) == 0) {
            echo json_encode('');die();
        }
        if (isset($data["userID"]) && !empty($data["userID"])) {
            $id = $data["userID"];
            $result = [];
            foreach ($todos as $key => $value) {
                if ($value["userID"] == $id) {
                    $result[] = $value;
                };
            }
            if (count($result)  > 0) {
                echo json_encode($result);
            } else {
                echo json_encode('');
            }
        }
    } 
}

