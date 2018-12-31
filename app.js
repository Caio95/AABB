'use strict';

angular.module('aabb', ['ngRoute','ngStorage', 'moduloLogin','moduloHome','moduloDados','moduloAdm','moduloPartida'])
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
    .when('/partida',{
        templateUrl: 'views/partidas/partida.html',
        controller: 'partidaController'
    })
    .when('/adm',{
        templateUrl: 'views/adm/adm.html',
        controller: 'admController'
    })
    .otherwise({
        redirectTo: '/'
    });
})