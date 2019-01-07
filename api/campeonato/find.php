<?php
header("Access-Control-Allow-Origin: *");

require_once('../database/Campeonato.php');

if (!isset($_GET['id'])) {
    echo '';
    exit();
}

$id = $_GET['id'];

$campeonato = Campeonato::find($id);

echo json_encode($campeonato);

?>