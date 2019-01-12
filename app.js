'use strict';

angular.module('aabb', ['ngRoute','ngStorage', 'moduloLogin','moduloHome','moduloDados','moduloAdm',
'moduloCampeonato','moduloPartida','moduloNotify'])
.config(function($routeProvider, $locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider
    .when('/',{
        templateUrl: 'views/login/login.html',
        controller: 'loginController'
    })
    .when('/inicio',{
        templateUrl: 'views/home/home.html',
        controller: 'homeController'
    })
    .when('/dados',{
        templateUrl: 'views/dados/dados.html',
        controller: 'dadosController'
    })
    .when('/campeonatos',{
        templateUrl: 'views/campeonato/campeonatos.html',
        controller: 'campeonatosController'
    })
    .when('/campeonato/:id', {
        templateUrl: 'views/campeonato/campeonato.html',
        controller: 'campeonatoController'
    })
    .when('/partidas',{
        templateUrl: 'views/partidas/partidas.html',
        controller: 'partidasController'
    })
    .when('/partida/:id', {
		templateUrl: 'views/partidas/partida.html',
		controller: 'partidaController'
    })
    .when('/notificacoes',{
        templateUrl: 'views/notificacoes/notificacoes.html',
		controller: 'notificacaoController'
    })  
    //administrador 
    .when('/inicio_adm', {
        templateUrl: 'views/adm/inicio_adm.html',
        controller: 'admController'
    })
    .when('/nivel_jogador',{
        templateUrl: 'views/adm/nivel_jogador.html',
        controller: 'admController'
    })
    .when('/desativa_user', {
        templateUrl: 'views/adm/desativa_user.html',
        controller: 'adm_desativaController'
    })
    .when('/cadastro_campeonato', {
        templateUrl: 'views/adm/cadastro_campeonato.html',
        controller: 'admController'
    })
    .when('/campeonatos_andamento', {
        templateUrl: 'views/adm/campeonatos_adm.html',
        controller: 'campeonatosAdmController'
    })
    .when('/campeonato_adm/:id', {
        templateUrl: 'views/adm/campeonato_adm.html',
        controller: 'campeonatoAdmController'
    })
    .when('/campeonatos_finalizados',{
        templateUrl: 'views/adm/campeonatos_adm_finalizados.html',
        controller: 'campeonatos_finalizadoController'
    })
    .otherwise({
        redirectTo: '/'
    });
})