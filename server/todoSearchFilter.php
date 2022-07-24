<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type");
$jsonTodo = file_get_contents("todo.json");
$jsonTodos = json_decode($jsonTodo, true);
$jsonTodolistItems = file_get_contents("./todolist./todolistItems/todolistItems.json");
$jsonTodoslistItems = json_decode($jsonTodolistItems, true);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $json = file_get_contents('php://input');
    $dataJ = json_decode($json);
    $data = (array) $dataJ;
    if (count($data) == 0) {
        echo json_encode('');die();
    }

    if (isset($data["userID"]) && !empty($data["userID"])) {
        $name = $data["word"];
        $id = $data["userID"];      
        if (count($jsonTodos) !== 0 && count($jsonTodoslistItems) !== 0) {
            $fullRes = array_merge($jsonTodos, $jsonTodoslistItems);        
        } else if (count($jsonTodos) == 0) {
            $fullRes = $jsonTodoslistItems;
        } else if (count($jsonTodoslistItems) == 0) {
            $fullRes = $jsonTodos;
        }  
        $giveResult = [];
        foreach ($fullRes as $value) {
            if ($value["userID"] == $id && ($value["name"] == $name || $value["date"]  == $name)) {
                $giveResult[] = $value;
            }
        }
        if (count($giveResult) == 0) {
            $giveResult = 'err';
        }
        echo json_encode($giveResult);
    } else {
        echo json_encode('');die();
    }
}
