<?php 
require_once('Database.php');

Class Campeonato_time {
    public static function add($idCampeonato, $idTime){
        $pdo = Database::connection();
        $sql = 'INSERT INTO campeonato_time(idCampeonato, idTime) VALUES (?, ?)';
        $r = false;
        try{
            $query = $pdo->prepare($sql);
            $r = $query->execute(array($idCampeonato, $idTime));
            if($query->rowCount() > 0){
                return $pdo->lastInsertId();
            }
        }
        catch (Exception $ex){
            throw new Exception("Erro ao participar do Time", 1);
        }
    }

    public static function acharTime($idTime){
        $pdo = Database::connection();
        $sql = 'SELECT * FROM campeonato_time WHERE idTime=?';
        $query = $pdo->prepare($sql);
        $query->execute(array($idTime));
        return $query->fetch(PDO::FETCH_ASSOC);
    }

    public static function times_campeonato($idCampeonato){
        $pdo = Database::connection();
        $sql = 'SELECT t.idTime, t.nomeTime FROM time t INNER JOIN campeonato_time p ON t.idTime = p.idTime INNER JOIN campeonato c ON c.idCampeonato = p.idCampeonato WHERE c.idCampeonato =?';
        $query = $pdo->prepare($sql);
        $query->execute(array($idCampeonato));
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function find($idCampeonato, $idTime) {
        $pdo = Database::connection();
        $sql = 'SELECT * FROM campeonato_time WHERE idCampeonato =? AND idTime = ?';
        $query = $pdo->prepare($sql);
        $query->execute(array($idCampeonato, $idTime));
        $camp_time = $query->fetch(PDO::FETCH_ASSOC);
        return $camp_time;
    }
}