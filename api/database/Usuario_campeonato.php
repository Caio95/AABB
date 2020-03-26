<?php
require_once('Database.php');

Class Usuario_campeonato {
    public static function add($idUser, $idCampeonato){
        $pdo = Database::connection();
        $sql = 'INSERT INTO usuario_campeonato(idUser, idCampeonato) VALUES (?, ?)';
        $r = false;
        try{
            $query = $pdo->prepare($sql);
            $r = $query->execute(array($idUser, $idCampeonato));
            if($query->rowCount() > 0){
                return $pdo->lastInsertId();
            }
        }
        catch (Exception $ex){
            throw new Exception("Erro ao participar do Campeonato", 1);
        }
    }

    public static function jogadores_campeonato($idCampeonato){
        $pdo = Database::connection();
        $sql = 'SELECT u.idUser, u.nomeUser, u.foto_perfil FROM usuario u INNER JOIN usuario_campeonato t ON u.idUser = t.idUser INNER JOIN campeonato c ON t.idCampeonato = c.idCampeonato WHERE c.idCampeonato=? AND t.jogando=0';
        $query = $pdo->prepare($sql);
        $query->execute(array($idCampeonato));
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public static function allCampeonato($idCampeonato){
        $pdo = Database::connection();
        $sql = 'SELECT u.idUser, u.nomeUser, u.foto_perfil FROM usuario u INNER JOIN usuario_campeonato t ON u.idUser = t.idUser INNER JOIN campeonato c ON t.idCampeonato = c.idCampeonato WHERE c.idCampeonato=?';
        $query = $pdo->prepare($sql);
        $query->execute(array($idCampeonato));
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function updatePlay($idUser, $idCampeonato){
        $pdo = Database::connection();
        $sql = 'UPDATE usuario_campeonato SET jogando=1 WHERE iduser=? AND idCampeonato =?';
        $query = $pdo->prepare($sql);
        $query->execute(array($idUser, $idCampeonato));
        return $query->fetch(PDO::FETCH_ASSOC);
    }

    public static function updateStopPlay($idUser, $idCampeonato){
        $pdo = Database::connection();
        $sql = 'UPDATE usuario_campeonato SET jogando=0 WHERE iduser=? AND idCampeonato=?';
        $query = $pdo->prepare($sql);
        $query->execute(array($idUser, $idCampeonato));
        return $query->fetch(PDO::FETCH_ASSOC);
    }
}