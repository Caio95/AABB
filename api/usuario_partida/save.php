<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, HEAD, OPTIONS, POST, PUT");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

require_once('../database/Usuario_partida.php');

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $idUser = $request->idUser;
    $idPartida = $request->idPartida;
    $idTime = $request->idTime;
    $foto = $request->foto;
    $nome = $request->nome;

    $userPart = Usuario_partida::add($idUser, $idPartida, $idTime, $foto, $nome);
    if($userPart) {
        echo json_encode($userPart);
    } else {
        echo json_encode(false);
    }

}
?>