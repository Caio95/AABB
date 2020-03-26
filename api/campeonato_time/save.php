<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, HEAD, OPTIONS, POST, PUT");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

require_once('../database/Campeonato_time.php');

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $idCampeonato = $request->idCampeonato;
    $idTime = $request->idTime;

    $camp_time = Campeonato_time::add($idCampeonato, $idTime);
    if($camp_time) {
        echo json_encode($camp_time);
    } else {
        echo json_encode(false);
    }

}
?>