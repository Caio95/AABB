'use strict';

angular.module('moduloAdm',['ui-notification','angular-loading-bar'])
    .controller('admController', function($rootScope, $scope, $http, $location, $localStorage, Notification){
        $rootScope.pageTitle = 'AABB Esportivo | Administrativo';
        var nivel =0;
        $('#barra_vertical_adm').sidenav();
        if($localStorage.permissao==1){
            $('#barra_vertical_adm').sidenav('close');
            $rootScope.permissao = $localStorage.permissao;
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
                if($scope.descricao_partida == null){
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
                } else {
                    Notification.error('Preencha todos os campos!');
                }

            }

            $scope.cadastrar_pelada = function(){
                if(!validarPelada()){
                    $http.post('http://localhost/aabb/api/campeonato/save.php',{
                        'nome': $scope.nome_pelada,
                        'descricao': $scope.descricao_pelada,
                        'dataInicio': $scope.data_inicio_pelada,
                        'dataFim' : $scope.data_fim_pelada
                    }).then(function(result){
                        Notification.success('Campeonato Cadastrado!');
                        $scope.nome_pelada = null;
                        $scope.descricao_pelada = null;
                        $scope.data_inicio_pelada = null;
                        $scope.data_fim_pelada = null;
                    })
                } else {
                    Notification.error('Preencha todos os campos!');
                }

            }

            function validarPelada(){
                if($scope.nome_pelada == null || $scope.descricao_pelada == null 
                    || $scope.data_inicio_pelada == null || $scope.data_fim_pelada == null){
                    return true;
                }
                return false;
            }

            $scope.cancelar_cad_pelada = function(){
                $scope.nome_pelada = null;
                $scope.descricao_pelada = null;
                $scope.data_inicio_pelada = null;
                $scope.data_fim_pelada = null;
                $location.path('/inicio_adm');
                location.reload();
            }
            
            $scope.sair = function(){
                $rootScope.permissao =false;
                $location.path('/');
                delete $localStorage.name;
                delete $localStorage.permissao;
                delete $localStorage.usuario;
                $('#barra_vertical_adm').sidenav('destroy');
                $('#barra_vertical_user').sidenav('destroy');
            }
        } else{
            $location.path('/');
        }
    })

    .controller('peladaAdmController', function($rootScope, $scope, $http, $location, $localStorage, $routeParams, Notification){
        $('.collapsible').collapsible();
        if($localStorage.permissao==1){
            $('select').formSelect();
            $('.modal').modal();
            $http.get('http://localhost/aabb/api/campeonato/find.php?id='+ $routeParams.id)
            .then(function(response){
                $scope.pelada = response.data;
                $rootScope.pageTitle = 'AABB Esportivo | '+ $scope.pelada.nomeCampeonato;
                $scope.nome_pelada = $scope.pelada.nomeCampeonato;
                $scope.descricao_pelada =  $scope.pelada.descricaoCampeonato;
                $scope.dataInicio_pelada = $scope.pelada.dataInicio;
                $scope.dataFim_pelada = $scope.pelada.dataFim;
                $scope.encerraInscricao = $scope.pelada.encerraInscricoes;
                $scope.status_pelada = $scope.pelada.status;
                $scope.idPelada = $routeParams.id;

                if($scope.pelada.status==-1){
                    $scope.desabilitar = true;
                } else{$scope.desabilitar = false;}
            })
            $http.get('http://localhost/aabb/api/usuario_campeonato/list.php?id='+$routeParams.id)
            .then(function(response){
                $scope.inscritos = response.data;
            })
            //jogadores da pelada
            $http.get('http://localhost/aabb/api/usuario_campeonato/usuario_campeonato_list.php?id='+$routeParams.id)
            .then(function(response){
                $scope.jogadores = response.data;
            })
            // times cadastrado na pelada 
            $http.get('http://localhost/aabb/api/campeonato_time/times_campeonato_list.php?id='+$routeParams.id)
            .then(function(response){
                $scope.times = response.data;
            })
            //partidas cadastradas na pelada
            $http.get('http://localhost/aabb/api/partida/list_partidas_campeonato.php?id='+$routeParams.id)
            .then(function(result){
                $scope.partidas = result.data;
            })
            
            $scope.alterar_pelada = function() {
                $http.post('http://localhost/aabb/api/campeonato/update.php',{
                    'nome' : $scope.nome_pelada,
                    'descricao': $scope.descricao_pelada,
                    'dataInicio' : $scope.dataInicio_pelada,
                    'dataFim' : $scope.dataFim_pelada,
                    'encerraInscricoes' : $scope.encerraInscricao,
                    'status' : $scope.status_pelada,
                    'idCampeonato' : $routeParams.id,       
                }).then(function(result){
                    Notification.primary('Dados alterados com sucesso!');
                    setTimeout(function(){ location.reload(); }, 2000); 
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

            $scope.cad_time = function(){
                if($scope.nome_time != null){
                    if($scope.selecionados.length ==10){
                        $http.post('http://localhost/aabb/api/time/save.php',{
                            'nome': $scope.nome_time,
                        }).then(function(result){
                            var tm= result.data;
                            for(var i=0; i< 10; i++){
                                $http.post('http://localhost/aabb/api/usuario_time/save.php',{
                                    'idUser' : $scope.selecionados[i],
                                    'idTime' : tm,
                                })
                            }
                            $http.post('http://localhost/aabb/api/campeonato_time/save.php',{
                                'idCampeonato' : $routeParams.id,
                                'idTime' : tm,
                            }).then(function(result){
                                Notification.success('Time cadastrado!');
                                $scope.selecionados = [];
                                $scope.nome_time = null;
                            })
                        })
                    } else {
                        Notification.error('Selecione 10 jogadores!');
                    }
                } else {
                    Notification.error('Informe o nome do time!');
                }
            }
            
            $scope.sortear_times = function(){
                var misturar = $scope.selecionados;
                if($scope.selecionados.length == 20){
                    embaralhar(misturar);
                        $http.post('http://localhost/aabb/api/time/save.php',{
                            'nome': 'Time 1',
                        }).then(function(result){
                            var tm1 = result.data;
                            for(var i=0; i< 10; i++){
                                $http.post('http://localhost/aabb/api/usuario_time/save.php',{
                                    'idUser' : misturar[i],
                                    'idTime' : tm1,
                                })
                            }
                            $http.post('http://localhost/aabb/api/campeonato_time/save.php',{
                                'idCampeonato' : $routeParams.id,
                                'idTime' : tm1,
                            })
                        });
                        $http.post('http://localhost/aabb/api/time/save.php',{
                            'nome': 'Time 2',
                        }).then(function(result){
                            var tm2 = result.data;
                            for(var i=10; i< 20; i++){
                                $http.post('http://localhost/aabb/api/usuario_time/save.php',{
                                    'idUser' : misturar[i],
                                    'idTime' : tm2,
                                })
                            }
                            $http.post('http://localhost/aabb/api/campeonato_time/save.php',{
                                'idCampeonato' : $routeParams.id,
                                'idTime' : tm2,
                            })
                        });
                    Notification.info('Times cadastrados');

                    for(var i=0; i< $scope.selecionados.length; i++){
                        $http.post('http://localhost/aabb/api/usuario_campeonato/jogando.php', {
                            'idUser' : $scope.selecionados[i],
                            'idCampeonato' : $routeParams.id
                        })
                    }
                    $scope.selecionados = [];
                    setTimeout(function(){ location.reload(); }, 3500);
               } else {
                   Notification.error('Não há 20 jogadores');
               }
            }

            $scope.cad_partida = function(){
                if(validar($scope.desc_partida,$scope.data_partida,$scope.hora_partida)){
                    var time = new Date($scope.hora_partida);
                    var hora = new Date();
                    hora.setHours(time.getHours()-3, time.getMinutes() - 0, time.getSeconds() -0);
                    if($scope.time1!="" || $scope.time2!=""){
                        if($scope.time1 != $scope.time2){
                            var time1=$scope.time1;
                            var time2=$scope.time2;
                            $http.post('http://localhost/aabb/api/partida/save.php',{
                                'id_Campeonato' : $routeParams.id,
                                'descricaoPart' : $scope.desc_partida,
                                'dataPartida' : $scope.data_partida,
                                'horaPartida' : hora,
                                'idTime1' : $scope.time1,
                                'idTime2' : $scope.time2
                            }).then(function(result){
                                $scope.cod_partida = result.data;
                                $http.get('http://localhost/aabb/api/usuario_time/list_time.php?id='+$scope.time1)
                                .then(function(result){
                                    $scope.t1 = result.data;
                                    for (var i=0; i<$scope.t1.length; i++){
                                        $http.post('http://localhost/aabb/api/usuario_partida/save.php',{
                                            'idUser' : $scope.t1[i].idUser,
                                            'idPartida': $scope.cod_partida,
                                            'idTime' : time1,
                                            'foto' : $scope.t1[i].foto_perfil,
                                            'nome' : $scope.t1[i].nomeUser,
                                        })
                                    }
                                })
                                $http.get('http://localhost/aabb/api/usuario_time/list_time.php?id='+$scope.time2)
                                .then(function(result){
                                    $scope.t2 = result.data;
                                    for (var i=0; i<$scope.t2.length; i++){
                                        $http.post('http://localhost/aabb/api/usuario_partida/save.php',{
                                            'idUser' : $scope.t2[i].idUser,
                                            'idPartida': $scope.cod_partida,
                                            'idTime' : time2,
                                            'foto' : $scope.t2[i].foto_perfil,
                                            'nome' : $scope.t2[i].nomeUser,
                                        })
                                    }
                                })
                                Notification.success('Partida cadastrada!');
                                $scope.desc_partida = null;
                                $scope.data_partida = null;
                                $scope.hora_partida = null;
                                $scope.time1 = "";
                                $scope.time2 = "";
                                setTimeout(function(){ location.reload(); }, 2000);
                            })
                        } else {
                            Notification.error('Times não podem ser iguais!');
                        }
                    } else {
                        Notification.error('Selecione o(s) time(s)');
                    }
                } else {
                    Notification.error('Preencha todos os campos!');
                }
            }

            function validar(descricao,data,hora){
                if(descricao == null && data ==null && hora==null){
                    return false
                }
                return true
            }


            $scope.sair = function(){
                $rootScope.permissao =false;
                $location.path('/');
                delete $localStorage.name;
                delete $localStorage.permissao;
                delete $localStorage.usuario;
                $('#barra_vertical_adm').sidenav('destroy');
                $('#barra_vertical_user').sidenav('destroy');
            }
        } else{
            $location.path('/');
        }

        function embaralhar(array){
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

    .controller('partidaAdmController', function($rootScope, $scope, $http, $location, $localStorage, $routeParams, Notification){
        $rootScope.pageTitle = 'AABB Esportivo | Partida';
        if($localStorage.permissao==1){
            $('.collapsible').collapsible();
            $http.get('http://localhost/aabb/api/partida/find.php?id='+ $routeParams.id)
            .then(function(result){
                $scope.cod_partida = result.data.idPartida;
                $scope.desc_partida = result.data.descricaoPart;
                $scope.data_partida = result.data.dataPartida;
                $scope.hora_partida = result.data.horaPartida;
                $scope.time1 = result.data.idTime1;
                $scope.time2 = result.data.idTime2;
                $scope.idCampeonato = result.data.id_Campeonato;

                $http.get('http://localhost/aabb/api/campeonato/find.php?id='+$scope.idCampeonato)
                .then(function(result){
                    var pelada =result.data;
                    if(pelada.status==-1){
                        $scope.desabilitar = true;
                    } else{$scope.desabilitar = false;}
                })

                $http.get('http://localhost/aabb/api/usuario_partida/find.php?id='+$scope.cod_partida)
                .then(function(result){
                    $scope.jogadores = result.data;
                    $scope.t1=[];
                    $scope.t2 =[];
                    for(var i=0; i< $scope.jogadores.length; i++){
                        if($scope.jogadores[i].idTime ==$scope.time1){
                            $scope.t1.push($scope.jogadores[i]);
                        } else if($scope.jogadores[i].idTime ==$scope.time2){
                            $scope.t2.push($scope.jogadores[i]);
                        }
                    }
                })
                $http.get('http://localhost/aabb/api/campeonato_time/times_campeonato_list.php?id='+result.data.id_Campeonato)
                .then(function(response){
                    $scope.times = response.data;
                    $http.get('http://localhost/aabb/api/time/find.php?id='+$scope.time1)
                    .then(function(result){
                        $scope.team1 = result.data;
                    })
                    $http.get('http://localhost/aabb/api/time/find.php?id='+$scope.time2)
                    .then(function(result){
                        $scope.team2 = result.data;
                    })
                })
            })
            
            $scope.addAmarelo = function(t,valor){
                if(t.cartaoVermelho<=0){
                    $http.post('http://localhost/aabb/api/usuario_partida/update.php',{
                        'cart_amarelo' : valor,
                        'cart_vermelho' : t.cartaoVermelho,
                        'gols' : t.gols,
                        'contra' : t.contra,
                        'idUser' : t.idUser,
                        'idPartida' : t.idPartida,
                    }).then(function(result){
                        Notification.warning('Cartão Amarelo: '+ t.nomeUser);
                    })
                } else{Notification.error('Jogador está expulso!');}
            }
            $scope.addVermelho = function(t,valor){
                if(t.cartaoVermelho<=0){
                    $http.post('http://localhost/aabb/api/usuario_partida/update.php',{
                        'cart_amarelo' : t.cartaoAmarelo,
                        'cart_vermelho' : valor,
                        'gols' : t.gols,
                        'contra' : t.contra,
                        'idUser' : t.idUser,
                        'idPartida' : t.idPartida,
                    }).then(function(result){
                        Notification.error('Cartão Vermelho: '+ t.nomeUser);
                    })
                } else{Notification.error('Jogador está expulso!');}
            }
            $scope.addGol = function(t,valor){
                if(t.cartaoVermelho<=0){
                    $http.post('http://localhost/aabb/api/usuario_partida/update.php',{
                        'cart_amarelo' : t.cartaoAmarelo,
                        'cart_vermelho' : t.cartaoVermelho,
                        'gols' : valor,
                        'contra' : t.contra,
                        'idUser' : t.idUser,
                        'idPartida' : t.idPartida,
                    }).then(function(result){
                        Notification.success('GOL: '+ t.nomeUser);
                    })
                } else{Notification.error('Jogador está expulso!');}
            }
            $scope.addContra = function(t,valor){
                if(t.cartaoVermelho<=0){
                    $http.post('http://localhost/aabb/api/usuario_partida/update.php',{
                        'cart_amarelo' : t.cartaoAmarelo,
                        'cart_vermelho' : t.cartaoVermelho,
                        'gols' : t.gols,
                        'contra' : valor,
                        'idUser' : t.idUser,
                        'idPartida' : t.idPartida,
                    }).then(function(result){
                        Notification.info('Gol Contra: '+ t.nomeUser);
                    })
                } else{Notification.error('Jogador está expulso!');
                }
            }
            
            $scope.getHora = function(hora){
                $scope.hora_partida = hora;
            }
            
            $scope.alterar_partida = function(hora_partida){
                if($scope.data_partida !=null){
                    if(hora_partida !=null){
                        var time = new Date(hora_partida);
                        var hora = new Date();
                        hora.setHours(time.getHours()-3, time.getMinutes() - 0, time.getSeconds() -0);
                        console.log(hora)
                        $http.post('http://localhost/aabb/api/partida/update.php',{
                            'descricaoPart' : $scope.desc_partida,
                            'dataPartida' : $scope.data_partida,
                            'horaPartida' : hora,
                            'idTime1' : $scope.time1,
                            'idTime2' : $scope.time2,
                            'idPartida' : $routeParams.id,
                        }).then(function(result){
                            Notification.info('Dados alterados!');
                            setTimeout(function(){ location.reload(); }, 2000);
                        })
                    } else{
                        Notification.error('Confirme a hora novamente!');
                    }
                } else{
                    Notification.error('Confirme a data novamente!');
                }
            }
        } else{
            $location.path('/');
        }
    })

    .controller('peladasAdmController', function($rootScope, $scope, $http, $location, $localStorage){
        $rootScope.pageTitle = 'AABB Esportivo | Peladas';   
        if($localStorage.permissao==1){
            $('#barra_vertical_adm').sidenav('close');
            $rootScope.permissao = $localStorage.permissao;
            $rootScope.name = $localStorage.name;
            $http.get('http://localhost/aabb/api/campeonato/list.php')
            .then(function(result){
                $scope.peladas = result.data;
            })
            $scope.sair = function(){
                $rootScope.permissao =false;
                $location.path('/');
                delete $localStorage.name;
                delete $localStorage.permissao;
                delete $localStorage.usuario;
                $('#barra_vertical_adm').sidenav('destroy');
                $('#barra_vertical_user').sidenav('destroy');
            }
        } else{
            $location.path('/');
        }
    })

    .controller('peladas_finalizadasController', function($rootScope, $scope, $http, $location, $localStorage){
        if($localStorage.permissao==1){
            $('#barra_vertical_adm').sidenav('close');
            $rootScope.pageTitle = 'AABB Esportivo | Peladas Finalizadas';
            $rootScope.permissao = $localStorage.permissao;
            $rootScope.name = $localStorage.name;
            $http.get('http://localhost/aabb/api/campeonato/list_finish.php')
            .then(function(result){
                $scope.peladas = result.data;
            })
            $scope.sair = function(){
                $rootScope.permissao =false;
                $location.path('/');
                delete $localStorage.name;
                delete $localStorage.permissao;
                delete $localStorage.usuario;
                $('#barra_vertical_adm').sidenav('destroy');
                $('#barra_vertical_user').sidenav('destroy');
            }
        } else{
            $location.path('/');
        }
    })

    .controller('adm_desativaController', function($rootScope, $scope, $http, $location, $localStorage, Notification){
        if($localStorage.permissao==1){
            $rootScope.pageTitle = 'AABB Esportivo | Desativar Usuário';
            $('#barra_vertical_adm').sidenav('close');
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

    .controller('homeAdmController', function($rootScope, $scope, $http, $location, $localStorage){
        if($localStorage.permissao==1){
            $rootScope.permissao = $localStorage.permissao;
            $('#barra_vertical_adm').sidenav();
            $('#barra_vertical_adm').sidenav('close');

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

            $scope.resultados=[];
            $scope.qt = 10;
            $rootScope.pageTitle = 'AABB Esportivo | Inicio';
            $('#barra_vertical_adm').sidenav('close');
            $('.collapsible').collapsible();
            $http.get('http://localhost/aabb/api/usuario/list.php')
            .then(function(result){
                $scope.usuarios = result.data;
                for(var i=0; i< $scope.usuarios.length; i++){
                    $http.get('http://localhost/aabb/api/usuario_partida/resultado.php?id='+ $scope.usuarios[i].idUser)
                    .then(function(response){
                        if(response.data.nomeUser != null){
                            $scope.resultados.push(response.data);
                        }
                    })
                }
            })
        } else {
            $location.path('/');
        }
    })

    .controller('timeAdmController', function($rootScope, $scope, $http, $location, $localStorage, $routeParams, Notification){
        if($localStorage.permissao==1){
            $('.collapsible').collapsible();
            $('.modal').modal();
            $rootScope.pageTitle = 'AABB Esportivo | Configurar time';
            $http.get('http://localhost/aabb/api/time/find.php?id='+ $routeParams.id)
            .then(function(result){
                $scope.time = result.data;
                $scope.nome_time = $scope.time.nomeTime;
            })
            $http.get('http://localhost/aabb/api/usuario_time/list_time.php?id='+$routeParams.id)
            .then(function(result){
                $scope.jogadores_time = result.data;
            })

            $http.get('http://localhost/aabb/api/campeonato_time/findTime.php?id='+$routeParams.id)
            .then(function(result){
                $scope.t = result.data;
                $http.get('http://localhost/aabb/api/usuario_campeonato/usuario_campeonato_list.php?id='+$scope.t.idCampeonato)
                .then(function(response){
                    $scope.jogadores_disponiveis = response.data;
                })
            })
            var jogadorSubstituido=null;
            var jogadorInserido=null;
            $scope.getIdSair = function(id){
                jogadorSubstituido = id;
            }
            $scope.getIdEntrar = function(id){
                jogadorInserido = id;
            }
            $scope.confirmarSubst= function(){
                if(jogadorInserido!=null){
                    $http.post('http://localhost/aabb/api/usuario_time/updatePlayer.php',{
                    'entra' : jogadorInserido,
                    'sai' : jogadorSubstituido,
                    'idTime' : $routeParams.id
                    })
                    $http.get('http://localhost/aabb/api/campeonato_time/findTime.php?id='+$routeParams.id)
                    .then(function(result){
                        var campeonato = result.data;
                        $http.post('http://localhost/aabb/api/usuario_campeonato/disponibilizar_jogador.php',{
                            'idUser' : jogadorSubstituido,
                            'idCampeonato' : campeonato.idCampeonato
                        })
                        $http.post('http://localhost/aabb/api/usuario_campeonato/jogando.php',{
                            'idUser' : jogadorInserido,
                            'idCampeonato' : campeonato.idCampeonato
                        })
                        $http.post('http://localhost/aabb/api/usuario_partida/findPlayer.php',{
                            'idUser' : jogadorSubstituido,
                            'idTime' : $routeParams.id
                        }).then(function(result){
                            var partida = result.data;
                            $http.get('http://localhost/aabb/api/usuario/find.php?id='+jogadorInserido)
                            .then(function(result){
                                var usuario = result.data;
                                $http.post('http://localhost/aabb/api/usuario_partida/save.php', {
                                    'idUser' : usuario.idUser,
                                    'idPartida' : partida.idPartida,
                                    'idTime' : $routeParams.id,
                                    'foto' : usuario.foto_perfil,
                                    'nome' : usuario.nomeUser
                                })
                            })
                            $http.post('http://localhost/aabb/api/usuario_partida/replaceUser.php',{
                                'idUser': jogadorSubstituido,
                                'idTime': $routeParams.id
                            })
                            Notification.success('Substituição concluída!');
                            setTimeout(function(){ location.reload(); }, 2500);
                        })
                    })
                } else {
                    Notification.error('Selecione o jogador');
                }
            }

            $scope.alterar = function(){
                $http.post('http://localhost/aabb/api/time/update.php',{
                    'nome' : $scope.nome_time,
                    'idTime': $routeParams.id
                }).then(function(result){
                    console.log(result);
                    Notification.success('Alterado com sucesso!');
                })
            }

        } else {
            $location.path('/');
        }
    })

    .controller('avisosAdm', function($rootScope, $scope, $http, $location, $localStorage, Notification){
        if($localStorage.permissao==1){
            $rootScope.pageTitle = 'AABB Esportivo | Avisos';
            $('#barra_vertical_adm').sidenav('close');
            $('.collapsible').collapsible();
            $('.modal').modal();
            $scope.publicar = function(){
                var data = new Date();
                $http.post('http://localhost/aabb/api/aviso/save.php', {
                    'data' : data.getFullYear()+"-"+(data.getMonth()+1)+"-"+data.getDate(),
                    'hora' : data.getHours()+":"+data.getMinutes()+":"+data.getSeconds(),
                    'titulo' : $scope.titulo,
                    'mensagem' : $scope.mensagem
                }).then(function(result){
                    Notification.success('Aviso publicado!');
                    $scope.titulo = null;
                    $scope.mensagem = null;
                    setTimeout(function(){ location.reload(); }, 2000);
                })
            }

            $scope.id;
            $scope.pegarId = function(id){
                $scope.id = id;
            }
            $scope.excluir = function(){
                $('.modal').modal('close');
                $http.delete('http://localhost/aabb/api/aviso/delete.php?id='+$scope.id)
                .then(function(result){
                    $scope.id = null;
                    Notification.success('Aviso excluído'); 
                    setTimeout(function(){ location.reload(); }, 2000);
                })
            }

            $http.get('http://localhost/aabb/api/aviso/list.php')
            .then(function(response){
                $scope.avisos = response.data;
            })

            $scope.cancelar = function(){
                $location.path('/inicio_adm');
                $scope.titulo = null;
                $scope.mensagem = null;
            }

        } else {
            $location.path('/');
        }
    })