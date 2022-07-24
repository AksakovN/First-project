<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type");
$jsonString = file_get_contents("usersAvatar.json");
$avatar = json_decode($jsonString, true);
$newName = '';
if ($avatar) {
    $newName = $avatar;
}
const BASE_UPLOAD_DIR = "usersAvatar";
if (!file_exists(BASE_UPLOAD_DIR)) {
    mkdir(BASE_UPLOAD_DIR);
}
if (!empty($_FILES) && $newName !== '') {
    $file = $_FILES["avatar"];
    $name = $file["name"];
    $info = pathinfo($name);
    $baseName = $newName . "_" . $info["basename"];
    $ext = $info["extension"];
    $fileName = $info["basename"];
    $files = glob("usersAvatar/*.*");
    $results = '';
    foreach ($files as $key => $value) {
        $str = strip_tags($value);
        var_dump($value . "|" . $info["basename"]);
        $count = substr_count($str, $newName);
        if ($count > 0) {
            unlink("$value");
        }
    }
    switch ($ext) {
        case 'jpeg':
        case 'png':
        case 'jpg':
            $newPath = BASE_UPLOAD_DIR . "/" . $baseName;
            break;

        default:
            $newPath = '';
            break;
    }
    if (empty($newPath)) die();
    move_uploaded_file($file["tmp_name"], $newPath);
    file_put_contents("usersAvatar.json", '');
}

