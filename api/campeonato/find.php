<?php
header("Access-Control-Allow-Origin: *");

require_once('../database/Campeonato.php');

if (!isset($_GET['id'])) {
    echo '';
    exit();
}

$id = $_GET['id'];

$pelada = Campeonato::find($id);

echo json_encode($pelada);

?>