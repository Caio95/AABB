<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, HEAD, OPTIONS, POST, PUT");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

require_once('../database/Usuario_partida.php');

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $cart_amarelo = $request->cart_amarelo;
    $cart_vermelho = $request->cart_vermelho;
    $gols = $request->gols;
    $contra = $request->contra;
    $idUser = $request->idUser;
    $idPartida = $request->idPartida;

    $userPart = Usuario_partida::alter_userPartida($cart_amarelo, $cart_vermelho, $gols, $contra, $idUser, $idPartida);
    
    if($userPart) {
        echo json_encode($userPart);
    } else {
        echo json_encode(false);
    }
}
?>