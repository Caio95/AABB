<?php       //tabela partida
require_once('Database.php');

Class Partida {
    public static function add($descricao, $data, $hora){
        $pdo = Database::connection();
        $sql = 'INSERT INTO partida(descricaoPart, dataPartida, horaPartida) VALUES (?, ?, ?)';
        $r = false;
        try{
            $query = $pdo->prepare($sql);
            $r = $query->execute(array($descricao, $data, $hora));
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

    public static function find($id) {
        $pdo = Database::connection();
        $sql = 'SELECT * FROM partida WHERE idPartida = ?';
        $query = $pdo->prepare($sql);
        $query->execute(array($id));
        $partida = $query->fetch(PDO::FETCH_ASSOC);
        return $partida;
    }

    public static function update($descricao, $data, $hora, $idPartida){
        $pdo = Database::connection();
        $sql = 'UPDATE partida SET descricaoPart=?, dataPartida=?, horaPartida=? WHERE idPartida=?';
        $query = $pdo->prepare($sql);
        $query->execute(array($descricao, $data, $hora, $idPartida));
        $usuario = $query->fetch(PDO::FETCH_ASSOC);
        return $partida;
    }

    public static function update_placar($gol1, $gol2, $idPartida){ 
        $pdo = Database::connection();
        $sql = 'UPDATE partida SET gol1=?, gol2=? WHERE idPartida=?';
        $query = $pdo->prepare($sql);
        $query->execute(array($placar_time1, $placar_time2, $idPartida));
        $usuario = $query->fetch(PDO::FETCH_ASSOC);
        return $partida;
    }
}