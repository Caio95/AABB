<?php
header("Access-Control-Allow-Origin: *");

require_once('../database/Time.php');

if (!isset($_GET['id'])) {
    echo '';
    exit();
}

$id = $_GET['id'];

$jogadores = Time::jogadores_partida($id);

echo json_encode($jogadores);

?>