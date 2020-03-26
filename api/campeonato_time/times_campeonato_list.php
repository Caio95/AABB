<?php  
header("Access-Control-Allow-Origin: *");

require_once('../database/Campeonato_time.php');

if (!isset($_GET['id'])) {
    echo '';
    exit();
}

$id = $_GET['id'];

$times = Campeonato_time::times_campeonato($id);

echo json_encode($times);

?>