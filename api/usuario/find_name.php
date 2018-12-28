<?php
header("Access-Control-Allow-Origin: *");

require_once('../database/Usuario.php');

if (!isset($_GET['id'])) {
    echo '';
    exit();
}

$nome = $_GET['id'];

$usuario = Usuario::find_name($nome);

echo json_encode($usuario);

?>