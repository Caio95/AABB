'use strict';

angular.module('moduloPartida',[])
    
    .controller('partidaController', function($rootScope, $scope, $http, $location, $localStorage){
        $rootScope.pageTitle = 'AABB Esportivo | Partidas';
        var nivel =0;
        if($localStorage.usuario){
            $rootScope.usuario = $localStorage.usuario;
            $rootScope.name = $localStorage.name;

            $http.get('http://localhost/aabb/api/partida/list.php')
            .then(function(result){
                $scope.partidas = result.data;
               
            })

            $scope.participar = function(partida){
                
            }
            
            $scope.sair = function(){
                $rootScope.usuario =false;
                $location.path('/');
                delete $localStorage.usuario;
            }

        } else{
            $location.path('/');
        }
    })