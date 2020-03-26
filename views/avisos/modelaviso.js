'use strict';

angular.module('moduloAviso',[])
    
    .controller('avisoController', function($rootScope, $scope, $http, $location, $localStorage){
        $rootScope.pageTitle = 'AABB Esportivo | Avisos';

        if($localStorage.permissao){
            $('.collapsible').collapsible();
            $('#barra_vertical_user').sidenav('close');
            $rootScope.permissao = $localStorage.permissao;
            $rootScope.name = $localStorage.name;
            
            $http.get('http://localhost/aabb/api/aviso/list.php')
            .then(function(response){
                $scope.avisos = response.data;
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