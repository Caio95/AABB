<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, HEAD, OPTIONS, POST, PUT");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

require_once('../database/Usuario_time.php');

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $entra = $request->entra;
    $sai = $request->sai;
    $idTime = $request->idTime;

    $subst = Usuario_time::substituir($entra, $sai, $idTime);
    
    if($subst) {
        echo json_encode($subst);
    } else {
        echo json_encode(false);
    }
}
?>