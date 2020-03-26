<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, HEAD, OPTIONS, POST, PUT");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

require_once('../database/Usuario.php');

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $nome = $request->nome;
    $email = $request->email;
    $senha = $request->senha;
    $telefone = $request->telefone;
    $permissao = $request->permissao;

    $usuario = Usuario::add($nome, $email, $senha, $telefone, $permissao);
    if($usuario) {
        echo json_encode($usuario);
    } else {
        echo json_encode(false);
    }

}
?>