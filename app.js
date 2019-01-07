'use strict';

angular.module('aabb', ['ngRoute','ngStorage', 'moduloLogin','moduloHome','moduloDados','moduloAdm','moduloCampeonato','moduloPartida','moduloNotify'])
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
    .when('/adm',{
        templateUrl: 'views/adm/adm.html',
        controller: 'admController'
    })
    .otherwise({
        redirectTo: '/'
    });
})