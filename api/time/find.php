<?php
header("Access-Control-Allow-Origin: *");

require_once('../database/Time.php');

if (!isset($_GET['id'])) {
    echo '';
    exit();
}

$id = $_GET['id'];

$time = Time::find($id);

echo json_encode($time);

?>