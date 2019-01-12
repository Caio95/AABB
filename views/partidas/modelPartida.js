'use strict';

angular.module('moduloPartida',['ui-notification'])
    
    .controller('partidasController', function($rootScope, $scope, $http, $location, $localStorage){
        $rootScope.pageTitle = 'AABB Esportivo | Partidas';
        var time;
        if($localStorage.usuario){
            $rootScope.usuario = $localStorage.usuario;
            $rootScope.name = $localStorage.name;

            $http.get('http://localhost/aabb/api/partida/list.php')
            .then(function(result){
                $scope.partidas = result.data;
            })
            
            $scope.sair = function(){
                $rootScope.usuario =false;
                $location.path('/');
                delete $localStorage.usuario;
            }

        } else{
            $location.path('/');
        }
        
    })

    .controller('partidaController', function($rootScope, $scope, $http, $location, $localStorage, $routeParams, Notification){

        if($localStorage.usuario){
                $http.get('http://localhost/aabb/api/partida/find.php?id='+ $routeParams.id)
                .then(function(response){
                    $scope.partida = response.data;
                    $rootScope.pageTitle = 'AABB Esportivo | Partida: '+$scope.partida.descricaoPart;
                    $scope.codigo_partida = $scope.partida.idPartida;
                    $scope.descricao_partida = $scope.partida.descricaoPart;
                    $scope.data_partida = $scope.partida.dataPartida;
                    $scope.hora_partida = $scope.partida.horaPartida;
    
                })
    
                $http.get('http://localhost/aabb/api/usuario_partida/jogador_partida_list.php?id='+$routeParams.id)
                .then(function(response){
                    $scope.jogadores = response.data;
                    
                })
    
                $scope.participar = function(partida){
    
                    if(!verificaTime($rootScope.usuario, partida.idPartida)){
                        $http.post('http://localhost/aabb/api/usuario_partida/save.php',{
                            'idUser' : $rootScope.usuario,
                            'idPartida' : partida.idPartida
                        }).then(function(result){
                            Notification.success('Usuário cadastrado na partida: '+ partida.descricaoPart);
                        })
                    } else{
                            Notification.warning('Usuário já está inscrito na partida!');
                    }
    
                }
        } else{
                $location.path('/');
        }

        function verificaTime(){
            var i;

            $http.get('http://localhost/aabb/api/usuario_partida/list.php')
            .then(function(result){
                time = result.data;
                console.log(time);
                for(i in $scope.time){
                        if($scope.time[i].idUser == idUser && $scope.time[i].idPartida == idPartida){
                            return true;
                        }
                }
                return false;
            })
        }

    })