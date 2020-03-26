'use strict';

angular.module('aabb', ['angular-loading-bar','ngRoute','ngStorage','moduloLogin', 'moduloCadastro','moduloHome','moduloDados','moduloAdm',
'moduloPelada','moduloPartida','moduloAviso'])
.config(function($routeProvider, $locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider
    .when('/',{
        templateUrl: 'views/login/login.html',
        controller: 'loginController'
    })
    .when('/cadastro', {
        templateUrl: 'views/cadastro/cadastro.html',
        controller: 'cadastroController'
    })
    .when('/inicio',{
        templateUrl: 'views/home/home.html',
        controller: 'homeController'
    })
    .when('/dados',{
        templateUrl: 'views/dados/dados.html',
        controller: 'dadosController'
    })
    .when('/peladas',{
        templateUrl: 'views/pelada/peladas.html',
        controller: 'peladasController'
    })
    .when('/pelada/:id', {
        templateUrl: 'views/pelada/pelada.html',
        controller: 'peladaController'
    })
    .when('/partidas',{
        templateUrl: 'views/partida/partidas.html',
        controller: 'partidasController'
    })
    .when('/partida/:id', {
		templateUrl: 'views/partida/partida.html',
		controller: 'partidaController'
    })
    .when('/avisos',{
        templateUrl: 'views/avisos/avisos.html',
		controller: 'avisoController'
    })  
    //administrador 
    .when('/inicio_adm', {
        templateUrl: 'views/adm/home_adm.html',
        controller: 'homeAdmController'
    })
    .when('/pelada_adm/:id/partida_adm/:id', {
        templateUrl: 'views/adm/partida_adm.html',
        controller: 'partidaAdmController'
    })
    .when('/nivel_jogador',{
        templateUrl: 'views/adm/nivel_jogador.html',
        controller: 'admController'
    })
    .when('/desativa_user', {
        templateUrl: 'views/adm/desativa_user.html',
        controller: 'adm_desativaController'
    })
    .when('/cadastro_pelada', {
        templateUrl: 'views/adm/cadastro_pelada.html',
        controller: 'admController'
    })
    .when('/peladas_andamento', {
        templateUrl: 'views/adm/peladas_adm.html',
        controller: 'peladasAdmController'
    })
    .when('/pelada_adm/:id', {
        templateUrl: 'views/adm/pelada_adm.html',
        controller: 'peladaAdmController'
    })
    .when('/time/:id', {
        templateUrl : 'views/adm/time_adm.html',
        controller : 'timeAdmController'
    })
    .when('/avisos_adm',{
        templateUrl : 'views/adm/avisos_adm.html',
        controller : 'avisosAdm'
    })
    .when('/peladas_finalizadas',{
        templateUrl: 'views/adm/peladas_adm_finalizadas.html',
        controller: 'peladas_finalizadasController'
    })
    .otherwise({
        redirectTo: '/'
    });
})