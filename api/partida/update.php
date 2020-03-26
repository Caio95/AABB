<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, HEAD, OPTIONS, POST, PUT");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

require_once('../database/Partida.php');

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $descricaoPart = $request->descricaoPart;
    $dataPartida = $request->dataPartida;
    $horaPartida = $request->horaPartida;
    $idTime1 = $request->idTime1;
    $idTime2 = $request->idTime2;
    $idPartida = $request->idPartida;

    $partida = Partida::update($descricaoPart, $dataPartida, $horaPartida, $idTime1, $idTime2, $idPartida);

    if($partida) {
        echo json_encode($partida);
    } else {
        echo json_encode(false);
    }
}
?>