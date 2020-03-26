'use strict';

angular.module('moduloDados',['ui-notification','flow'])
    .controller('dadosController', function($rootScope, $scope, $http, $location, $localStorage, Notification){
        $rootScope.pageTitle = 'AABB Esportivo | Meus Dados';
        if($localStorage.permissao){
            if($localStorage.permissao==1){
                $('#barra_vertical_adm').sidenav('close');
            } else{
                $('#barra_vertical_user').sidenav('close');
            }
            $('.modal').modal();
            $rootScope.permissao = $localStorage.permissao;
            $rootScope.name = $localStorage.name;
            $http.get('http://localhost/aabb/api/usuario/find.php?id='+ $localStorage.usuario)
            .then(function(result){                
                $scope.nome_usuario = result.data.nomeUser;
                $scope.endereco_usuario = result.data.enderecoUser;
                $scope.telefone_usuario = result.data.telefoneUser;
                $scope.email_usuario = result.data.emailUser;
                $scope.senha_usuario = result.data.senhaUser;
                $scope.foto_user = result.data.foto_perfil;
            })
            $scope.imageStrings;
            $scope.processFiles = function(files){
                angular.forEach(files, function(flowFile, i){
                var fileReader = new FileReader();
                    fileReader.onload = function (event) {
                        var uri = event.target.result;
                        $scope.imageStrings = uri;
                    };
                    fileReader.readAsDataURL(flowFile.file);
                });
            };

            $scope.salvar_foto = function(){
                if($scope.imageStrings!=null){
                    $http.post('http://localhost/aabb/api/usuario/save_pic.php',{
                        'foto' : $scope.imageStrings,
                        'idUser' : $localStorage.usuario
                    }).then(function(result){
                        Notification.success('Foto alterada com sucesso!');
                        setTimeout(function(){ location.reload(); }, 2000);
                    })
                } else {
                    Notification.error('Selecione a foto!');
                }
            }
            $scope.alterar = function(){
                $http.post('http://localhost/aabb/api/usuario/update.php',{
                    'nome' : $scope.nome_usuario,
                    'endereco' : $scope.endereco_usuario,
                    'senha' : $scope.senha_usuario,
                    'telefone' : $scope.telefone_usuario,
                    'idUser' : $localStorage.usuario         
                }).then(function(result){
                    Notification.primary('alterado com sucesso!');
                    setTimeout(function(){ location.reload(); }, 2000);
                })
            }

            $scope.cancelar = function() {
                if($scope.permissao ==1){
                    $location.path('/inicio_adm');
                } else{
                    $location.path('/inicio');
                }
            }

            $scope.sair = function(){
                if(permissao==1){
                    $rootScope.permissao =false;
                    $rootScope.nome_user =null;
                    $rootScope.email = null; 
                    $location.path('/');
                    delete $localStorage.name;
                    delete $localStorage.permissao;
                    delete $localStorage.usuario;
                    $('#barra_vertical_adm').sidenav('destroy');
                    location.reload();
                } else{
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

            }

        } else{
            $location.path('/');
        }
    })