<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type");
$jsonString = file_get_contents("todolist.json");
$jsonInnerString = file_get_contents("./todolistItems/todolistItems.json");
$todosList = json_decode($jsonString, true);
$todos = json_decode($jsonInnerString, true);

if ($_SERVER["REQUEST_METHOD"] == "POST") {  
    $json = file_get_contents('php://input');
    $dataJson = json_decode($json);
    $data = (array) $dataJson;
    if (count($data) == 0) {
        echo json_encode('');die();
    }
    if (isset($data["name"]) && !empty($data["name"])) {
        $name = $data["name"];

        $result = array_search($name, array_column($todosList, "name"));
        array_splice($todosList, $result, 1);
        $jsonString = json_encode($todosList);
        file_put_contents("todolist.json", $jsonString);

        $newArr = [];
        foreach ($todos as $key => $value) {
            if ($value['delID'] !== $name) {
                $newArr[] = $value;
            }
        }
        var_dump($newArr);  
        $jsonInnerString = json_encode($newArr);
        file_put_contents("./todolistItems/todolistItems.json", $jsonInnerString);
    }
}

