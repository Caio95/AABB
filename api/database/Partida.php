<?php       //tabela partida
require_once('Database.php');

Class Partida {
    public static function add($id_Campeonato, $descricaoPart, $dataPartida, $horaPartida, $idTime1, $idTime2){
        $pdo = Database::connection();
        $sql = 'INSERT INTO partida(id_Campeonato, descricaoPart, dataPartida, horaPartida, idTime1, idTime2) VALUES (?, ?, ?, ?, ?, ?)';
        $r = false;
        try{
            $query = $pdo->prepare($sql);
            $r = $query->execute(array($id_Campeonato, $descricaoPart, $dataPartida, $horaPartida, $idTime1, $idTime2));
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
        $sql = 'SELECT * FROM partida';
        $query = $pdo->query($sql);
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function all_campeonato($id_Campeonato){
        $pdo = Database::connection();
        $sql = 'SELECT * FROM partida WHERE id_campeonato=?';
        $query = $pdo->prepare($sql);
        $query->execute(array($id_Campeonato));
        $partidas = $query->fetchAll(PDO::FETCH_ASSOC);
        return $partidas;
    }

    public static function find($id) {
        $pdo = Database::connection();
        $sql = 'SELECT * FROM partida WHERE idPartida = ?';
        $query = $pdo->prepare($sql);
        $query->execute(array($id));
        $partida = $query->fetch(PDO::FETCH_ASSOC);
        return $partida;
    }

    public static function update($descricaoPart, $dataPartida, $horaPartida, $idTime1, $idTime2, $idPartida){
        $pdo = Database::connection();
        $sql = 'UPDATE partida SET descricaoPart=?, dataPartida=?, horaPartida=?, idTime1=?, idTime2=? WHERE idPartida=?';
        $query = $pdo->prepare($sql);
        $query->execute(array($descricaoPart, $dataPartida, $horaPartida, $idTime1, $idTime2, $idPartida));
        $partida = $query->fetch(PDO::FETCH_ASSOC);
        return $partida;
    }

    public static function update_placar($gol1, $gol2, $idPartida){ 
        $pdo = Database::connection();
        $sql = 'UPDATE partida SET gol1=?, gol2=? WHERE idPartida=?';
        $query = $pdo->prepare($sql);
        $query->execute(array($placar_time1, $placar_time2, $idPartida));
        $partida = $query->fetch(PDO::FETCH_ASSOC);
        return $partida;
    }
}