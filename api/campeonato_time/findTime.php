<?php
header("Access-Control-Allow-Origin: *");

require_once('../database/Campeonato_time.php');

if (!isset($_GET['id'])) {
    echo '';
    exit();
}

$id = $_GET['id'];

$time = Campeonato_time::acharTime($id);

echo json_encode($time);

?>