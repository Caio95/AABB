'use strict';

angular.module('moduloHome',[])
    .controller('homeController', function($rootScope, $scope, $http, $location, $localStorage){
        $rootScope.pageTitle = 'AABB Esportivo | Inicio';
        if($localStorage.permissao){
            $rootScope.permissao = $localStorage.permissao;
            $('#barra_vertical_user').sidenav();
            $('#barra_vertical_user').sidenav('close');

            $http.get('http://localhost/aabb/api/aviso/list.php')
            .then(function(response){
                $scope.avisos = response.data;
            })

            $http.get('http://localhost/aabb/api/campeonato/list.php')
            .then(function(response){
                $scope.peladas = response.data;
            })

            $http.get('http://localhost/aabb/api/usuario/find.php?id='+$localStorage.usuario)
            .then(function(result){
                $rootScope.nome_user = result.data.nomeUser;
                $rootScope.email = result.data.emailUser;
                $scope.foto_user = result.data.foto_perfil;
            })

            $http.get('http://localhost/aabb/api/usuario_partida/resultado.php?id='+ $localStorage.usuario)
            .then(function(result){
                $scope.partidas_jogadas = result.data.qtpartida;
                $scope.gols_jogador = result.data.gol;
                $scope.contra_jogador = result.data.contra;
                $scope.cartao_amarelo = result.data.amarelo;
                $scope.cartao_vermelho = result.data.vermelho;             
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
        } else {
            $location.path('/');
        }
    })