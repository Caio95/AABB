'use strict';

angular.module('moduloAdm',[])
    
    .controller('admController', function($rootScope, $scope, $http, $location, $localStorage){
        $rootScope.pageTitle = 'AABB Esportivo | Administrativo';
        var nivel =0;
        $rootScope.adm = true;
        if($localStorage.usuario){
            $rootScope.usuario = $localStorage.usuario;
            $rootScope.name = $localStorage.name;

            $http.get('http://localhost/aabb/api/usuario/list.php')
            .then(function(result){
                $scope.usuarios = result.data;
               
            })

            $scope.getValor = function(nv){
                nivel = nv;
            }

            $scope.editar = function(usuario){    
                $http.post('http://localhost/aabb/api/usuario/update_nivel.php',{
                    'nivel': nivel,
                    'idUser': usuario.idUser
                }).then(function(result){
                    alert('Nível alterado com sucesso!');
                    nivel =0;    
                })
                
            }

            $scope.cadastrar_partida = function(){
                $http.post('http://localhost/aabb/api/partida/save.php',{
                     'descricao' : $scope.descricao_partida,
                     'data': $scope.data_partida,
                     'hora': $scope.hora_partida
                }).then(function(result){
                    alert('Partida Cadastrada!');
                    $scope.descricao_partida = null,
                    $scope.data_partida = null,
                    $scope.hora_partida = null
                })
            }

            $scope.cadastrar_campeonato = function(){
                $http.post('http://localhost/aabb/api/campeonato/save.php',{
                    'nome': $scope.nome_campeonato,
                    'dataInicio': $scope.data_inicio_campeonato,
                    'dataFim' : $scope.data_fim_campeonato
                }).then(function(result){
                    alert('Campeonato Cadastrado!');
                    $('#cadastro_campeonato').modal('hide')
                    $scope.nome_campeonato = null,
                    $scope.data_inicio_campeonato = null,
                    $scope.data_fim_campeonato = null
                })
            }
            
            $scope.sair = function(){
                $rootScope.usuario =false;
                $location.path('/');
                delete $localStorage.usuario;
            }

            $scope.pesquisar = function(){
            
                
            }

        } else{
            $location.path('/');
        }
    })