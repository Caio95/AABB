'use strict';

angular.module('moduloPartida',['ui-notification'])
    
    .controller('partidasController', function($rootScope, $scope, $http, $location, $localStorage){
        $rootScope.pageTitle = 'AABB Esportivo | Partidas';

        if($localStorage.permissao){
            $rootScope.permissao = $localStorage.permissao;
            $rootScope.name = $localStorage.name;
            $http.get('http://localhost/aabb/api/partida/list.php')
            .then(function(result){
                $scope.partidas = result.data;
            })
            
            $scope.sair = function(){
                $rootScope.permissao =false;
                $rootScope.nome_user =null;
                $rootScope.email = null; 
                $location.path('/');
                delete $localStorage.name;
                delete $localStorage.permissao;
                delete $localStorage.usuario;
                $('#barra_vertical_user').sidenav('destroy');
                location.reload();
            }

        } else{
            $location.path('/');
        }
    })

    .controller('partidaController', function($rootScope, $scope, $http, $location, $localStorage, $routeParams){

        if($localStorage.permissao){
                $http.get('http://localhost/aabb/api/partida/find.php?id='+ $routeParams.id)
                .then(function(response){
                    $scope.partida = response.data;
                    $rootScope.pageTitle = 'AABB Esportivo | Partida: '+$scope.partida.descricaoPart;
                    $scope.codigo_partida = $scope.partida.idPartida;
                    $scope.descricao_partida = $scope.partida.descricaoPart;
                    $scope.data_partida = $scope.partida.dataPartida;
                    $scope.hora_partida = $scope.partida.horaPartida;
                })

        } else{
                $location.path('/');
        }

    })