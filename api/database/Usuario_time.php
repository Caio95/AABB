<?php   //tabela usuario_time
require_once('Database.php');

Class Usuario_time {
    public static function add($idUser, $idTime){
        $pdo = Database::connection();
        $sql = 'INSERT INTO usuario_time(idUser, idTime) VALUES (?, ?)';
        $r = false;
        try{
            $query = $pdo->prepare($sql);
            $r = $query->execute(array($idUser, $idTime));
            if($query->rowCount() > 0){
                return $pdo->lastInsertId();
            }
        }
        catch (Exception $ex){
            throw new Exception("Erro ao participar do Time", 1);
        }
    }

    public static function find_time($idTime) {
        $pdo = Database::connection();
        $sql = 'SELECT * FROM usuario_time WHERE idTime = ?';
        $query = $pdo->prepare($sql);
        $query->execute(array($idTime));
        $time = $query->fetch(PDO::FETCH_ASSOC);
        return $time;
    }
}