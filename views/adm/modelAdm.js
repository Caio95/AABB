'use strict';

angular.module('moduloAdm',[])
    
    .controller('admController', function($rootScope, $scope, $http, $location, $localStorage){
        $rootScope.pageTitle = 'AABB Esportivo | Administrativo';
        var nivel =0;
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
                console.log($scope.nivel);
                $http.post('http://localhost/aabb/api/usuario/update_nivel.php',{
                    'nivel': nivel,
                    'idUser': usuario.idUser
                }).then(function(result){
                    alert('Nível alterado com sucesso!');
                    nivel =0;    
                })
                   

            }

            $scope.pesquisar = function(){
            
                
            }

        } else{
            $location.path('/');
        }
    })