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

    .controller('campeonatoController', function($rootScope, $scope, $http, $location, $localStorage, $routeParams){

        if($localStorage.usuario){
            $http.get('http://localhost/aabb/api/campeonato/find.php?id='+ $routeParams.id)
            .then(function(response){
                $scope.campeonato = response.data;
                $rootScope.pageTitle = 'AABB Esportivo | Campeonato: '+ $scope.campeonato.nomeCampeonato;
                $scope.codigo_campeonato = $scope.campeonato.idCampeonato;
                $scope.nome_campeonato = $scope.campeonato.nomeCampeonato;
                $scope.dataInicio_campeonato = $scope.campeonato.dataInicio;
                $scope.dataFim_campeonato = $scope.campeonato.dataFim;
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