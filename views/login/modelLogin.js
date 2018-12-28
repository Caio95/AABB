'use strict';

angular.module('moduloLogin',[])
    .controller('loginController', function($rootScope, $scope, $http, $location, $localStorage){
        $rootScope.pageTitle = 'AABB Esportivo | entre ou cadastre-se';
        $rootScope.usuario = false;

        if($localStorage.usuario){
            $location.path('/inicio');
            $rootScope.usuario = $localStorage.usuario;
        } else{
            $location.path('/');
        }

        $scope.login = function(){
            if($scope.email2 == null || $scope.senha3 == null){
                $('#log').show('in');
            }
            else{
                $http.post('http://localhost/aabb/api/usuario/validate.php',{
                    'email' : $scope.email2,
                    'senha' : $scope.senha3
                }).then(function(result){
                    if(result.data != 'false'){
                        $rootScope.usuario = result.data;
                        $localStorage.usuario = result.data.idUser;
                        $localStorage.name = result.data.nomeUser;
                        $location.path('/inicio');
                    } else{
                        $('#senhaErr').show('in');
                    }
                });
            }

            $('#closeLog').click(function(){
                $('#log').hide('fade'); //alerta preenchimento de campos
            })
            $('#closeSenhaErr').click(function(){
                $('#senhaErr').hide('fade');  //alerta login ou senha incorreto
            });
        }

        $scope.cadastrar = function(){
            if(validEmail($scope.email)){
                if(validar($scope.senha, $scope.senha2)){
                        $http.post('http://localhost/aabb/api/usuario/save.php',{
                            'nome' : $scope.nome,
                            'endereco' : $scope.endereco,
                            'email' : $scope.email,
                            'senha' : $scope.senha,
                            'telefone' : $scope.telefone
                        }).then(function(result){
                            $scope.nome = null;
                            $scope.email = null;
                            $scope.endereco = null;
                            $scope.senha = null;
                            $scope.senha2 = null;
                            $scope.telefone = null;
                        });
                        $('#cadastrado').show('in');
                } else{
                    $('#senha').show('in');
                }
            } else{
                $('#emailErr').show('in');
            }
              alert('Cadastrado Com sucesso!');          
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