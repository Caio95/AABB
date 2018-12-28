<?php
header("Access-Control-Allow-Origin: *");

require_once('../database/Usuario.php');

if (!isset($_GET['id'])) {
    echo '';
    exit();
}

$id = $_GET['id'];

$usuario = Usuario::find($id);

echo json_encode($usuario);

?>