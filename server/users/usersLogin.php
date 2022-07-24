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

    if (isset($data["username"]) && !empty($data["username"])) {
        $jsonString = file_get_contents("users.json");
        $users = json_decode($jsonString, true);
        $username = $data["username"];
        $password = $data["password"];
        $resPassword = md5("aff" . md5($password) . "fuu");
        $Er2 = 0;
        $Er3 = 0;
        foreach ($users as $value) {
            if ($value["username"] == $username && $value["password"] == $resPassword) {
                echo json_encode($value["id"]);
                $Er2 = 0;
                $Er3 = 0;
                return;
            } else if ($value["password"] !== $resPassword) {
                $Er3 = 1;
            } else if ($value["username"] !== $username) {
                $Er2 = 1;
            }
        }
    }
    if ($Er2 == 1) {
        echo json_encode("Er2");
    } else if ($Er3 == 1) {
        echo json_encode("Er3");
    }
}

