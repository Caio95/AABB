<?php  
header("Access-Control-Allow-Origin: *");

require_once('../database/Usuario_time.php');

if (!isset($_GET['id'])) {
    echo '';
    exit();
}

$id = $_GET['id'];

$time = Usuario_time::jogadores_time($id);

echo json_encode($time);

?>