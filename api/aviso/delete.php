<?php
header("Access-Control-Allow-Origin: *");

require_once('../database/Aviso.php');

if (!isset($_GET['id'])) {
    echo '';
    exit();
}

$id = $_GET['id'];

$aviso = Aviso::delete($id);

echo json_encode($aviso);

?>