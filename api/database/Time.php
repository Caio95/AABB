<?php
require_once('Database.php');

Class Time {
    public static function add($idUser, $idPartida){
        $pdo = Database::connection();
        $sql = 'INSERT INTO usuario_partida(idUser, idPartida) VALUES (?, ?)';
        $r = false;
        try{
            $query = $pdo->prepare($sql);
            $r = $query->execute(array($idUser, $idPartida));
            if($query->rowCount() > 0){
                return $pdo->lastInsertId();
            }
        }
        catch (Exception $ex){
            throw new Exception("Erro ao participar da partida", 1);
        }
    }

    
}
