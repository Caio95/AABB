'use strict';

angular.module('moduloCadastro',['base64'])
    .controller('cadastroController', function($rootScope, $scope, $http, Notification, $base64){   
        $rootScope.pageTitle = 'AABB Esportivo | Cadastro';

        $scope.cadastrar = function(){
            $http.get('http://localhost/aabb/api/usuario/validEmail.php')
            .then(function(result){
                 $scope.emails = result.data;
                 if(validEmail($scope.email)){
                    if(!$scope.emailExiste($scope.emails,$scope.email)){
                        if(validar($scope.senha, $scope.senha2)){
                            $http.post('http://localhost/aabb/api/usuario/save.php',{
                                'nome' : $scope.nome,
                                'email' : $scope.email,
                                'senha' : $base64.encode($scope.senha),
                                'telefone' : $scope.telefone,
                                'permissao' : 0,
                            }).then(function(result){
                                Notification.success('Cadastrado com sucesso!')
                                $scope.nome = null;
                                $scope.email = null;
                                $scope.senha = null;
                                $scope.senha2 = null;
                                $scope.telefone = null;
                            });
                        } else{ Notification.error('Senhas não coincidem');}
                    } else { Notification.error('E-mail já cadastrado')}
                } else{ Notification.error('E-mail incorreto!');}  
            })
        }

        $scope.emailExiste = function(lista, email){
            for(var i=0; i< lista.length; i++){
                if(email == lista[i].emailUser){
                    return true;
                }
            }
            return false;
        }

        function validar(senha1,senha2){
            if(senha1 !=null && senha2 != null){
                if(senha1 == senha2){
                    return true;
                }
            }
            return false;
        }

        function validEmail(email){
            var er = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2,3}/; 
            if(!er.exec(email) )
            {
                return false;
            }
            return true;
        }

})