<?php   //tabela usuario_partida
require_once('Database.php');

Class Usuario_partida {
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

    public static function all(){
        $pdo = Database::connection();
        $sql = 'SELECT * FROM usuario_partida';
        $query = $pdo->query($sql);
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function find_time($idPartida) {
        $pdo = Database::connection();
        $sql = 'SELECT * FROM usuario_partida WHERE idPartida = ?';
        $query = $pdo->prepare($sql);
        $query->execute(array($id));
        $user = $query->fetch(PDO::FETCH_ASSOC);
        return $partida;
    }

    public static function jogadores_partida($idPartida){
        $pdo = Database::connection();
        $sql = 'SELECT u.nomeUser, u.nivelUser FROM usuario u INNER JOIN usuario_partida t ON u.idUser = t.idUser INNER JOIN partida p ON t.idPartida = p.idPartida WHERE p.idPartida=?';
        $query = $pdo->prepare($sql);
        $query->execute(array($idPartida));
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }
}
