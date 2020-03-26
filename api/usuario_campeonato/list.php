<?php
header("Access-Control-Allow-Origin: *");

require_once('../database/Usuario_campeonato.php');

if (!isset($_GET['id'])) {
    echo '';
    exit();
}

$id = $_GET['id'];

$jogadores = Usuario_campeonato::allCampeonato($id);

echo json_encode($jogadores);

?>