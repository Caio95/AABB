<?php
require_once('Database.php');

Class Campeonato {
    public static function add($nome, $descricao, $dataInicio, $dataFim){
        $pdo = Database::connection();
        $sql = 'INSERT INTO campeonato(nomeCampeonato, descricaoCampeonato, dataInicio, dataFim) VALUES (?, ?, ?, ?)';
        $r = false;
        try{
            $query = $pdo->prepare($sql);
            $r = $query->execute(array($nome, $descricao, $dataInicio, $dataFim));
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
        $sql = 'SELECT * FROM campeonato WHERE status = 0';
        $query = $pdo->query($sql);
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function all_finalizado(){
        $pdo = Database::connection();
        $sql = 'SELECT * FROM campeonato WHERE status = -1';
        $query = $pdo->query($sql);
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function find($id) {
        $pdo = Database::connection();
        $sql = 'SELECT * FROM campeonato WHERE idCampeonato = ?';
        $query = $pdo->prepare($sql);
        $query->execute(array($id));
        $campeonato = $query->fetch(PDO::FETCH_ASSOC);
        return $campeonato;
    }

    public static function update($nome, $descricao, $dataInicio, $dataFim, $encerraInscricoes, $status, $idCampeonato){
        $pdo = Database::connection();
        $sql = 'UPDATE campeonato SET nomeCampeonato=?, descricaoCampeonato=?, dataInicio=?, dataFim=?, encerraInscricoes=?, status=? WHERE idCampeonato=?';
        $query = $pdo->prepare($sql);
        $query->execute(array($nome, $descricao, $dataInicio, $dataFim, $encerraInscricoes, $status, $idCampeonato));
        $campeonato = $query->fetch(PDO::FETCH_ASSOC);
        return $campeonato;
    }

}