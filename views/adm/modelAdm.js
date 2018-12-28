'use strict';

angular.module('moduloAdm',[])
    
    .controller('admController', function($rootScope, $scope, $http, $location, $localStorage){
        $rootScope.pageTitle = 'AABB Esportivo | Administrativo';
        
        if($localStorage.usuario){
            $rootScope.usuario = $localStorage.usuario;
            $rootScope.name = $localStorage.name;

            $http.get('http://localhost/aabb/api/usuario/list.php')
            .then(function(result){
                $scope.usuarios = result.data;
            })

            $scope.editar = function(usuario){
                    $http.post('http://localhost/aabb/api/usuario/update_nivel.php',{
                        'nivel': usuario.nivelUser,
                        'idUser': usuario.idUser
                    }).then(function(result){
                        console.log(result);    
                    })
            }
        }
    })