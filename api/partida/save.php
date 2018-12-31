<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, HEAD, OPTIONS, POST, PUT");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

require_once('../database/Partida.php');

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $descricao = $request->descricao;
    $data = $request->data;
    $hora = $request->hora;

    $partida = Partida::add($descricao, $data, $hora);
    if($partida) {
        echo json_encode($partida);
    } else {
        echo json_encode(false);
    }

}
?>