<?php
header("Access-Control-Allow-Origin: *");

require_once('../database/Partida.php');

if (!isset($_GET['id'])) {
    echo '';
    exit();
}

$id = $_GET['id'];

$partidas = Partida::all_campeonato($id);

echo json_encode($partidas);

?>