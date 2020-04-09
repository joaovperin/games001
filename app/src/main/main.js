//Inicializa angular
var app = angular.module('Games', ['ngRoute']);
angular.module('Games').config(function ($routeProvider, $locationProvider) {

    // Remove o # da url
    $locationProvider.html5Mode(true);
    //http://stackoverflow.com/questions/18619740/how-to-add-a-search-box-with-icon-to-the-navbar-in-bootstrap-3

    $routeProvider.when('/', {
        templateUrl: '/views/main/main.html',
        controller: 'GenericController'
    });

    $routeProvider.when('/games', {
        templateUrl: '/views/games/games.html',
        controller: 'GamesCtrl'
    });

    $routeProvider.when('/games/1', {
        templateUrl: '/views/games/snake.html',
        controller: 'SnakeGamesCtrl'
    });

    $routeProvider.when('/games/2', {
        templateUrl: '/views/games/breakout.html',
        controller: 'BreakoutGamesCtrl'
    });

    $routeProvider.when('/games/3', {
        templateUrl: '/views/games/spaceinvaders.html',
        controller: 'GenericController'
    });

    $routeProvider.when('/contato', {
        templateUrl: '/views/contato/contato.html',
        controller: 'GenericController'
    });

    $routeProvider.when('/cadastro', {
        templateUrl: '/views/cadastro/cadastro.html',
        controller: 'CadastroController'
    });

    $routeProvider.when('/login', {
        templateUrl: '/views/login/login.html',
        controller: 'LoginController'
    });

    // DELETAR ESSA BAGAÇA
    $routeProvider.when('/itensPedido', {
        templateUrl: '/views/itensPedido.html',
        controller: 'ItensPedidoController'
    });

    //Classe de testes, criada para os desenvolvedores
    $routeProvider.when('/testes', {
        templateUrl: '/views/testes/testes.html',
        controller: 'TestesController'
    });

    /**
     * Http Status
     */
    $routeProvider.when('/404', {
        templateUrl: '/views/http/404.html',
        controller: 'HTTPError404'
    });

    $routeProvider.otherwise({
        redirectTo: '/404'
    });

});