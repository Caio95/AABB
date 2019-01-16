'use strict';

angular.module('moduloHome',[])
    
    .controller('homeController', function($rootScope, $scope, $http, $location, $localStorage){
        $rootScope.pageTitle = 'AABB Esportivo | Inicio';
        
        if($localStorage.usuario){
            $rootScope.usuario = $localStorage.usuario;
            $rootScope.name = $localStorage.name;
            
            $http.get('http://localhost/aabb/api/usuario/find.php?id='+ $localStorage.usuario)
            .then(function(result){                
                $scope.nome_user = result.data.nomeUser;
                $scope.nivel_user = result.data.nivelUser;
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