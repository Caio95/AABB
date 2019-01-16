<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, HEAD, OPTIONS, POST, PUT");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

require_once('../database/Usuario_time.php');

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $idUser = $request->idUser;
    $idTime = $request->idTime;

    $user_time = Usuario_time::add($idUser, $idTime);
    if($user_time) {
        echo json_encode($user_time);
    } else {
        echo json_encode(false);
    }

}
?>