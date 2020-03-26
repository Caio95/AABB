<?php
header("Access-Control-Allow-Origin: *");

require_once('../database/Usuario_partida.php');

if (!isset($_GET['id'])) {
    echo '';
    exit();
}

$id = $_GET['id'];

$jogadores = Usuario_partida::find($id);

echo json_encode($jogadores);

?>