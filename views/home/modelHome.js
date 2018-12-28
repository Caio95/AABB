'use strict';

angular.module('moduloHome',[])
    
    .controller('homeController', function($rootScope, $scope, $http, $location, $localStorage){
        $rootScope.pageTitle = 'AABB Esportivo | Inicio';
        
        if($localStorage.usuario){
            $rootScope.usuario = $localStorage.usuario;
            $rootScope.name = $localStorage.name;

            
            $scope.sair = function(){
                $rootScope.usuario =false;
                $location.path('/');
                delete $localStorage.usuario;
            }
        }
    })