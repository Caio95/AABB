'use strict';

angular.module('moduloAdm',['ui-notification'])
    
    .controller('admController', function($rootScope, $scope, $http, $location, $localStorage, Notification){
        $rootScope.pageTitle = 'AABB Esportivo | Administrativo';
        var nivel =0;
        $rootScope.adm = true;
        if($localStorage.usuario==1){
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
                $http.post('http://localhost/aabb/api/usuario/update_nivel.php',{
                    'nivel': nivel,
                    'idUser': usuario.idUser
                }).then(function(result){
                    Notification.info('Nível alterado com sucesso!');
                    nivel =0;    
                })
            }

            $scope.cadastrar_partida = function(){
                $http.post('http://localhost/aabb/api/partida/save.php',{
                     'descricao' : $scope.descricao_partida,
                     'data': $scope.data_partida,
                     'hora': $scope.hora_partida
                }).then(function(result){
                    Notification.success('Partida Cadastrada!');
                    $scope.descricao_partida = null,
                    $scope.data_partida = null,
                    $scope.hora_partida = null
                })
            }

            $scope.cadastrar_campeonato = function(){
                $http.post('http://localhost/aabb/api/campeonato/save.php',{
                    'nome': $scope.nome_campeonato,
                    'dataInicio': $scope.data_inicio_campeonato,
                    'dataFim' : $scope.data_fim_campeonato
                }).then(function(result){
                    Notification.success('Campeonato Cadastrado!');
                    $scope.nome_campeonato = null,
                    $scope.data_inicio_campeonato = null,
                    $scope.data_fim_campeonato = null
                })
            }

            $scope.cancelar_cad_campeonato = function(){
                $scope.nome_campeonato = null;
                $scope.data_inicio_campeonato = null;
                $scope.data_fim_campeonato = null;

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

    .controller('campeonatoAdmController', function($rootScope, $scope, $http, $location, $localStorage, $routeParams, Notification){

        if($localStorage.usuario=1){
            $http.get('http://localhost/aabb/api/campeonato/find.php?id='+ $routeParams.id)
            .then(function(response){
                $scope.campeonato = response.data;
                $rootScope.pageTitle = 'AABB Esportivo | Campeonato: '+ $scope.campeonato.nomeCampeonato;
                $scope.codigo_campeonato = $scope.campeonato.idCampeonato;
                $scope.nome_campeonato = $scope.campeonato.nomeCampeonato;
                $scope.dataInicio_campeonato = $scope.campeonato.dataInicio;
                $scope.dataFim_campeonato = $scope.campeonato.dataFim;
                $scope.status_campeonato = $scope.campeonato.status;
            })

            $scope.alterar_campeonato = function() {
                $http.post('http://localhost/aabb/api/campeonato/update.php',{
                    'nome' : $scope.nome_campeonato,
                    'dataInicio' : $scope.dataInicio_campeonato,
                    'dataFim' : $scope.dataFim_campeonato,
                    'status' : $scope.status_campeonato,
                    'idCampeonato' : $scope.codigo_campeonato        
                }).then(function(result){
                    Notification.primary('Dados alterados com sucesso!');
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
    })
    .controller('campeonatosAdmController', function($rootScope, $scope, $http, $location, $localStorage){
        $rootScope.pageTitle = 'AABB Esportivo | Campeonatos';
        
        if($localStorage.usuario=1){
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

    .controller('campeonatos_finalizadoController', function($rootScope, $scope, $http, $location, $localStorage){
        if($localStorage.usuario=1){
            $rootScope.pageTitle = 'AABB Esportivo | Campeonatos Finalizados';
            $rootScope.usuario = $localStorage.usuario;
            $rootScope.name = $localStorage.name;

            $http.get('http://localhost/aabb/api/campeonato/list_finish.php')
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

    .controller('adm_desativaController', function($rootScope, $scope, $http, $location, $localStorage, Notification){
        if($localStorage.usuario==1){
            $http.get('http://localhost/aabb/api/usuario/list.php')
            .then(function(result){
                $scope.usuarios = result.data;
            })
    
            $scope.desativar_user = function (usuario){
                $http.post('http://localhost/aabb/api/usuario/desativa_user.php',{
                    'desativa': usuario.desativaUser,
                    'idUser': usuario.idUser
                }).then(function(result){
                    Notification.warning('Alterado com sucesso'); 
                })
            }
        } else {
            $location.path('/');
        }

    })