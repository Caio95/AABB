<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, HEAD, OPTIONS, POST, PUT");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

require_once('../database/Campeonato.php');

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $nome = $request->nome;
    $dataInicio = $request->dataInicio;
    $dataFim = $request->dataFim;
    $encerraInscricoes = $request->encerraInscricoes;
    $status = $request->status;
    $idCampeonato = $request->idCampeonato;

    $campeonato = Campeonato::update($nome, $dataInicio, $dataFim, $encerraInscricoes, $status, $idCampeonato);

    if($campeonato) {
        echo json_encode($campeonato);
    } else {
        echo json_encode(false);
    }
}
?>