<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, HEAD, OPTIONS, POST, PUT");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

require_once('../database/Aviso.php');

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $titulo = $request->titulo;
    $mensagem = $request->mensagem;
    $status = $request->status;
    $idAviso = $request->idAviso;

    $aviso = Aviso::update($titulo, $mensagem, $status, $idAviso);

    if($aviso) {
        echo json_encode($aviso);
    } else {
        echo json_encode(false);
    }
}
?>