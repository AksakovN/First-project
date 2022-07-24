<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type");
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $json = file_get_contents('php://input');
    $dataJ = json_decode($json);
    $data = (array) $dataJ;
    if (count($data) == 0) {
        echo json_encode('');
        die();
    }

    if (isset($data["username"]) && !empty($data["username"])) {
        $jsonString = file_get_contents("users.json");
        $users = json_decode($jsonString, true);
        $username = $data["username"];
        $flag = 0;
        if ($users !== null) {      
            foreach ($users as $value) {
                if ($value["username"] == $username) {
                    $flag++;
                }
            }
        }
        if ($flag == 0) {
            $password = $data["password"];
            $resPassword = md5("aff" . md5($password) . "fuu");
            $email = $data["email"];
            $id = $data["username"] . time();
            $users[] = ["username" => $username, "password" => $resPassword, "email" => $email, "id" => $id];
            $jsonString = json_encode($users);
            file_put_contents("users.json", $jsonString);
            echo json_encode($id);
        } else {
            echo json_encode('Er1');
        }
    }
}
