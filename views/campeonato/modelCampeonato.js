'use strict';

angular.module('moduloCampeonato',[])
    
    .controller('campeonatosController', function($rootScope, $scope, $http, $location, $localStorage){
        $rootScope.pageTitle = 'AABB Esportivo | Campeonatos';
        
        if($localStorage.usuario){
            $rootScope.usuario = $localStorage.usuario;
            $rootScope.name = $localStorage.name;

            $http.get('http://localhost/aabb/api/campeonato/list.php')
            .then(function(result){
                $scope.campeonatos = result.data;
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

    .controller('campeonatoController', function($rootScope, $scope, $http, $location, $localStorage, $routeParams, Notification){

        if($localStorage.usuario){
            $rootScope.usuario = $localStorage.usuario;
            $http.get('http://localhost/aabb/api/campeonato/find.php?id='+ $routeParams.id)
            .then(function(response){
                $scope.campeonato = response.data;
                $rootScope.pageTitle = 'AABB Esportivo | Campeonato: '+ $scope.campeonato.nomeCampeonato;
                $scope.codigo_campeonato = $scope.campeonato.idCampeonato;
                $scope.nome_campeonato = $scope.campeonato.nomeCampeonato;
                $scope.dataInicio_campeonato = $scope.campeonato.dataInicio;
                $scope.dataFim_campeonato = $scope.campeonato.dataFim;
            })
            
            $http.get('http://localhost/aabb/api/usuario_campeonato/usuario_campeonato_list.php?id='+$routeParams.id)
            .then(function(response){
                $scope.jogadores = response.data;
                $scope.inscritos = $scope.jogadores.length;
            })

            $scope.participar = function(){
                $http.get('http://localhost/aabb/api/usuario_campeonato/usuario_campeonato_list.php?id='+$routeParams.id)
                .then(function(response){
                    $scope.jogadores = response.data;
                    console.log()
                    if(!verificar_user_camp($scope.jogadores, $rootScope.usuario)){
                        $http.post('http://localhost/aabb/api/usuario_campeonato/save.php',{
                            'idUser' : $rootScope.usuario,
                            'idCampeonato' : $routeParams.id
                        }).then(function(result){
                            Notification.success('Você foi inscrito no campeonato');
                        })
                    } else{
                        Notification.warning('Você já está cadastrado no campeonato');
                    }

                })
            }

            $scope.sair = function(){
                $rootScope.usuario =false;
                $location.path('/');
                delete $localStorage.usuario;
            }
        } else{
            $location.path('/');
        }

        function verificar_user_camp(jogadores, idUsuario){
            for(var i=0; i < jogadores.length; i++){
                if(jogadores[i].idUser== idUsuario){
                    return true;
                }
            }
            return false;
        }

    })