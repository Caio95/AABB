<?php
require_once('Database.php');

Class Time {
    public static function add($nome){
        $pdo = Database::connection();
        $sql = 'INSERT INTO time(nomeTime) VALUES (?)';
        $r = false;
        try{
            $query = $pdo->prepare($sql);
            $r = $query->execute(array($nome));
            if($query->rowCount() > 0){
                return $pdo->lastInsertId();
            }
        }
        catch (Exception $ex){
            throw new Exception("Erro ao cadastrar partida", 1);
        }
    }

    public static function all(){
        $pdo = Database::connection();
        $sql = 'SELECT * FROM time WHERE status = 0';
        $query = $pdo->query($sql);
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function find($id) {
        $pdo = Database::connection();
        $sql = 'SELECT * FROM time WHERE idTime = ?';
        $query = $pdo->prepare($sql);
        $query->execute(array($id));
        $time = $query->fetch(PDO::FETCH_ASSOC);
        return $time;
    }

    public static function update($nome, $idTime){
        $pdo = Database::connection();
        $sql = 'UPDATE time SET nomeTime=? WHERE idTime=?';
        $query = $pdo->prepare($sql);
        $query->execute(array($nome, $idTime));
        $time = $query->fetch(PDO::FETCH_ASSOC);
        return $time;
    }
}