<?php   //tabela usuario_partida
require_once('Database.php');

Class Usuario_partida {
    public static function add($idUser, $idPartida, $idTime, $foto, $nome){
        $pdo = Database::connection();
        $sql = 'INSERT INTO usuario_partida(idUser, idPartida, idTime, foto, nomeUser) VALUES (?, ?, ?, ?, ?)';
        $r = false;
        try{
            $query = $pdo->prepare($sql);
            $r = $query->execute(array($idUser, $idPartida, $idTime, $foto, $nome));
            if($query->rowCount() > 0){
                return $pdo->lastInsertId();
            }
        }
        catch (Exception $ex){
            throw new Exception("Erro ao participar da partida", 1);
        }
    }

    public static function all(){
        $pdo = Database::connection();
        $sql = 'SELECT * FROM usuario_partida';
        $query = $pdo->query($sql);
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }


    public static function find($idPartida) {
        $pdo = Database::connection();
        $sql = 'SELECT * FROM usuario_partida WHERE idPartida = ?';
        $query = $pdo->prepare($sql);
        $query->execute(array($idPartida));
        $partida = $query->fetchAll(PDO::FETCH_ASSOC);
        return $partida;
    }

    public static function findUserTime($idUser, $idTime){
        $pdo = Database::connection();
        $sql = 'SELECT * FROM usuario_partida WHERE idUser=? AND idTime=?';
        $query = $pdo->prepare($sql);
        $query->execute(array($idUser, $idTime));
        return $query->fetch(PDO::FETCH_ASSOC);
    }

    public static function replaceUser($idUser, $idTime){
        $pdo = Database::connection();
        $sql = 'UPDATE usuario_partida SET idPartida=-1 WHERE idUser=? AND idTime=?';
        $query = $pdo->prepare($sql);
        $query->execute(array($idUser, $idTime));
        return $query->fetch(PDO::FETCH_ASSOC);
    }

    public static function resultados($idUser){
        $pdo = Database::connection();
        $sql = 'SELECT nomeUser, foto, COUNT(idUser) AS qtpartida, SUM(cartaoAmarelo) AS amarelo, SUM(cartaoVermelho) AS vermelho, SUM(gols) AS gol, SUM(contra) AS contra FROM usuario_partida WHERE idUser= ?';
        $query = $pdo->prepare($sql);
        $query->execute(array($idUser));
        $result = $query->fetch(PDO::FETCH_ASSOC);
        return $result;
    }

    public static function alter_userPartida($cart_amarelo, $cart_vermelho, $gols, $contra, $idUser, $idPartida){
        $pdo = Database::connection();
        $sql = 'UPDATE usuario_partida SET cartaoAmarelo=?,cartaoVermelho=?,gols=?,contra=? WHERE idUser=? AND idPartida=?';
        $query = $pdo->prepare($sql);
        $query->execute(array($cart_amarelo, $cart_vermelho, $gols, $contra, $idUser, $idPartida));
        $userPart = $query->fetch(PDO::FETCH_ASSOC);
        return $userPart;
    }
}
