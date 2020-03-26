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

    public static function substituir($entra, $sai, $idTime){
        $pdo = Database::connection();
        $sql = 'UPDATE usuario_time SET idUser=? WHERE idUser=? AND idTime=?';
        $query = $pdo->prepare($sql);
        $query->execute(array($entra, $sai, $idTime));
        return $query->fetch(PDO::FETCH_ASSOC);
    }

    public static function jogadores_time($idTime){
        $pdo = Database::connection();
        $sql = 'SELECT u.nomeUser, u.idUser, u.foto_perfil, p.idTime FROM usuario u INNER JOIN usuario_time p ON u.idUser=p.idUser INNER JOIN time t ON t.idTime=p.idTime WHERE t.idTime= ?';
        $query = $pdo->prepare($sql);
        $query->execute(array($idTime));
        $time = $query->fetchAll(PDO::FETCH_ASSOC);
        return $time;
    }
}