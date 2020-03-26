<?php
require_once('Database.php');

Class Aviso {
    public static function add($data, $hora, $titulo, $mensagem){
        $pdo = Database::connection();
        $sql = 'INSERT INTO aviso(dataAviso, horaAviso, tituloAviso, mensagem) VALUES (?, ?, ?, ?)';
        $r = false;
        try{
            $query = $pdo->prepare($sql);
            $r = $query->execute(array($data, $hora, $titulo, $mensagem));
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
        $sql = 'SELECT * FROM aviso WHERE status = 0';
        $query = $pdo->query($sql);
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function update($titulo, $mensagem, $status, $idAviso){
        $pdo = Database::connection();
        $sql = 'UPDATE aviso SET tituloAviso=?,mensagem=?, status=? WHERE idAviso= ?';
        $query = $pdo->prepare($sql);
        $query->execute(array($titulo, $mensagem, $status, $idAviso));
        return $query->fetch(PDO::FETCH_ASSOC);
    }

    public static function delete($id){
        $pdo = Database::connection();
        $sql = 'DELETE FROM aviso WHERE idAviso = ?';
        $query = $pdo->prepare($sql);
        $query->execute(array($id));
        return $query->fetch(PDO::FETCH_ASSOC);
    }
 }