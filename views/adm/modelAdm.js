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
                $scope.encerraInscricao = $scope.campeonato.encerraInscricoes;
                $scope.dataFim_campeonato = $scope.campeonato.dataFim;
                $scope.status_campeonato = $scope.campeonato.status;
            })

            $http.get('http://localhost/aabb/api/usuario_campeonato/usuario_campeonato_list.php?id='+$routeParams.id)
            .then(function(response){
                $scope.jogadores = response.data;
                $scope.inscritos = $scope.jogadores.length;
            })

            $scope.alterar_campeonato = function() {
                $http.post('http://localhost/aabb/api/campeonato/update.php',{
                    'nome' : $scope.nome_campeonato,
                    'dataInicio' : $scope.dataInicio_campeonato,
                    'dataFim' : $scope.dataFim_campeonato,
                    'encerraInscricoes' : $scope.encerraInscricao,
                    'status' : $scope.status_campeonato,
                    'idCampeonato' : $scope.codigo_campeonato        
                }).then(function(result){
                    Notification.primary('Dados alterados com sucesso!');
                })
            }

            $scope.selecionados =[];
            $scope.time;
            $scope.isChecked = function(id){
                var match = false;
                for(var i=0 ; i < $scope.selecionados.length; i++) {
                  if($scope.selecionados[i] == id){
                    match = true;
                  }
                }
                return match;
            };

            $scope.sync = function(bool, item){
                if(bool){
                  // add item
                  $scope.selecionados.push(item);
                } else {
                  // remove item
                  for(var i=0 ; i < $scope.selecionados.length; i++) {
                    if($scope.selecionados[i] == item){
                        $scope.selecionados.splice(i,1);
                    }
                  }      
                }
              };

            $scope.selec_20 = function (){
                $scope.selecionados =[];
                for(var i=0; i< 20; i++){
                    $scope.selecionados[i] = ($scope.jogadores[i].idUser);
                }
            }

            $scope.sortear_times = function(){
                var misturar = $scope.selecionados;
                // $scope.atletas = [];
                if($scope.selecionados.length == 20){
                    embaralhar(misturar);
                        $http.post('http://localhost/aabb/api/time/save.php',{
                            'nome': 'Time 1',
                        }).then(function(result){
                            var tm= result.data;
                            for(var i=0; i< 10; i++){
                                // console.log("posicao:"+misturar[j]+ " time:"+tm);
                                // $scope.atletas.push({user: misturar[j], time:tm});
                                $http.post('http://localhost/aabb/api/usuario_time/save.php',{
                                    'idUser' : misturar[i],
                                    'idTime' : tm,
                                })
                                // .then(function(result){
                                //     console.log(result);
                                // })
                            }
                        })

                        $http.post('http://localhost/aabb/api/time/save.php',{
                            'nome': 'Time 2',
                        }).then(function(result){
                            var tm= result.data;
                            for(var i=10; i< 20; i++){
                                // console.log("posicao:"+misturar[i]+ " time:"+tm);
                                // $scope.atletas.push({user: misturar[i], time:tm});
                                $http.post('http://localhost/aabb/api/usuario_time/save.php',{
                                    'idUser' : misturar[i],
                                    'idTime' : tm,
                                })
                                // .then(function(result){
                                //     console.log(result);
                                // })
                            }
                        })

                    Notification.info('Times cadastrados');
                    $scope.selecionados = [];   
                    $('#frequencia').modal("hide");
               } else {
                   Notification.error('Não há 20 jogadores');
               }
            }

            $scope.sair = function(){
                $rootScope.usuario =false;
                $location.path('/');
                delete $localStorage.usuario;
            }
        } else{
            $location.path('/');
        }

        function embaralhar(array) {
            var indice_atual = array.length, valor_temporario, indice_aleatorio;
            while (0 !== indice_atual) {
                indice_aleatorio = Math.floor(Math.random() * indice_atual);
                indice_atual -= 1;
                valor_temporario = array[indice_atual];
                array[indice_atual] = array[indice_aleatorio];
                array[indice_aleatorio] = valor_temporario;
            }
            return array;
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