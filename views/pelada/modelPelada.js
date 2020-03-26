'use strict';

angular.module('moduloPelada',[])
    
    .controller('peladasController', function($rootScope, $scope, $http, $location, $localStorage){
        $rootScope.pageTitle = 'AABB Esportivo | Peladas';
        if($localStorage.permissao){
            $rootScope.permissao = $localStorage.permissao;
            $rootScope.name = $localStorage.name;
            $('#barra_vertical_user').sidenav('close');    

            $http.get('http://localhost/aabb/api/usuario/find.php?id='+$localStorage.usuario)
            .then(function(result){
                $scope.usuario = result.data;
                if($scope.usuario.desativaUser==0){
                    $http.get('http://localhost/aabb/api/campeonato/list.php')
                    .then(function(result){
                        $scope.peladas = result.data;
                    })
                } else{
                    $scope.peladas = null;
                }
            })

            $scope.sair = function(){
                $rootScope.permissao =false;
                $location.path('/');
                delete $localStorage.name;
                delete $localStorage.permissao;
                delete $localStorage.usuario;
                $('#barra_vertical_user').sidenav('destroy');
            }
        } else{
            $location.path('/');
        }
    })

    .controller('peladaController', function($rootScope, $scope, $http, $location, $localStorage, $routeParams, Notification){

        if($localStorage.permissao){
            $scope.desabilitar = false;
            $rootScope.permissao = $localStorage.permissao;
            $rootScope.usuario = $localStorage.usuario;
            $http.get('http://localhost/aabb/api/campeonato/find.php?id='+ $routeParams.id)
            .then(function(response){
                $scope.campeonato = response.data;
                $rootScope.pageTitle = 'AABB Esportivo | Pelada: '+ $scope.campeonato.nomeCampeonato;
                $scope.nome_campeonato = $scope.campeonato.nomeCampeonato;
                $scope.descricao_campeonato = $scope.campeonato.descricaoCampeonato;
                $scope.dataInicio_campeonato = $scope.campeonato.dataInicio;
                $scope.dataFim_campeonato = $scope.campeonato.dataFim;
            })
            $http.get('http://localhost/aabb/api/usuario_campeonato/list.php?id='+$routeParams.id)
            .then(function(response){
                $scope.jogadores = response.data;
                $scope.inscritos = $scope.jogadores.length;

                if(verificar_user_camp($scope.jogadores, $rootScope.usuario)){
                    $scope.desabilitar = true;
                }
            })
            $http.get('http://localhost/aabb/api/partida/list_partidas_campeonato.php?id='+$routeParams.id)
            .then(function(response){
                $scope.partidas = response.data;
            })

            $scope.participar = function(){
                $http.get('http://localhost/aabb/api/usuario_campeonato/list.php?id='+$routeParams.id)
                .then(function(response){
                    $scope.jogadores = response.data;

                    $http.get('http://localhost/aabb/api/campeonato/find.php?id='+ $routeParams.id)
                    .then(function(response){
                        $scope.camp = response.data
                        if($scope.camp.encerraInscricoes == 0){
                            if(!verificar_user_camp($scope.jogadores, $rootScope.usuario)){
                                $http.post('http://localhost/aabb/api/usuario_campeonato/save.php',{
                                    'idUser' : $rootScope.usuario,
                                    'idCampeonato' : $routeParams.id
                                }).then(function(result){
                                    console.log(result);
                                    $scope.desabilitar = true;
                                    Notification.success('Você foi inscrito no campeonato');
                                })
                            } else{
                                Notification.warning('Você já está cadastrado no campeonato');
                                $scope.desabilitar = true;
                            }
                        } else {
                            Notification.error('Inscrições encerradas!');
                        }
                    })
                })
            }

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

        function verificar_user_camp(jogadores, idUsuario){
            for(var i=0; i < jogadores.length; i++){
                if(jogadores[i].idUser== idUsuario){
                    return true;
                }
            }
            return false;
        }
    })