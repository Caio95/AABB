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
        $sql = 'SELECT u.idUser, u.nomeUser FROM usuario u INNER JOIN usuario_campeonato t ON u.idUser = t.idUser INNER JOIN campeonato c ON t.idCampeonato = c.idCampeonato WHERE c.idCampeonato=?';
        $query = $pdo->prepare($sql);
        $query->execute(array($idCampeonato));
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }
    
}