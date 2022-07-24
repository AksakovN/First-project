<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type");
const BASE_UPLOAD_DIR = "usersAvatar";
if (!file_exists(BASE_UPLOAD_DIR)) {
    echo "error1";
    die();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $json = file_get_contents('php://input');
    $dataJ = json_decode($json);
    $data = (array) $dataJ;
    if (count($data) == 0) {
        echo json_encode('');
        die();
    }
    $newName = $data["userID"];
}
$fileName = $newName . "_";
$files = glob("usersAvatar/*.*");
$results = '';
foreach ($files as $key => $value) {
    $str = strip_tags($value);
    $count = substr_count($str, $fileName);
    if ($count > 0) {
        $results = $value;
    }
}
if ($results == '') {
    echo json_encode("error2");
} else {
    echo json_encode("http://localhost/homework/withServer/server/users/usersAvatar/$results");
}
