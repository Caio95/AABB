'use strict';

angular.module('moduloLogin',['ui-notification','base64'])
    .controller('loginController', function($rootScope, $scope, $http, $location, $localStorage, Notification, $base64){
        $rootScope.pageTitle = 'AABB Esportivo | entre ou cadastre-se';
        $rootScope.permissao = false;
        if($localStorage.permissao){
            $location.path('/inicio');
            $rootScope.permissao = $localStorage.permissao;
        } else{
            $location.path('/');
        }

        $scope.login = function(){
            if($scope.email2 == null || $scope.senha3 == null){
                Notification.error('Preencha todos os campos!');
            }
            else{
                $http.post('http://localhost/aabb/api/usuario/validate.php',{
                    'email' : $scope.email2,
                    'senha' : $base64.encode($scope.senha3)
                }).then(function(result){
                    if(result.data != 'false'){
                        $scope.usuario = result.data;
                        $localStorage.usuario = result.data.idUser;
                        $localStorage.permissao = result.data.permissao;
                        if($localStorage.permissao ==1){  // altenticacao usuario administrador
                            $localStorage.name = result.data.nomeUser;
                            setTimeout(function(){ location.reload(); }, 1000);
                            $location.path('/inicio_adm');
                        }else if($localStorage.permissao ==0){
                            $localStorage.name = result.data.nomeUser;  // usuario comum
                            location.reload();
                            $location.path('/inicio');
                        }

                    } else{
                        Notification.error('Usuário ou senha incorretos!');
                    }
                });
            }
        }
})