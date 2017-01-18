// Referência do loop principal do jogo
var loop;

/**
 * Faz o jogo iniciar
 */
function playGame(){
	// Se não acabou o jogo
	if(!Game.over){
		Game.togglePause();
	} else {	
		reloadPage();
	}
}

/**
 * Função chamada ao carregar a página, para carregar o jogo
 */
function loadGame(){
	// Pega o elemento canvas da página html e guarda seu contexto numa variável
	canvas = document.getElementById('canvas');
	context = canvas.getContext("2d");
	// Atribui os eventos de pressionamento de tecla
	document.addEventListener("keydown", Tecla.keyDown);
	document.addEventListener("keyup", Tecla.keyUp);
	// Carrega parâmetros do Game
	Game.setup();
	Game.render();
}

/** 
 *  Retorna a distância entre dois pontos
 */
function distance(pointA, pointB){
	return Math.abs(pointA - pointB);
}

// Busca um elemento HTML pelo ID e o retorna
function gebi(elementId){
	return document.getElementById(elementId);
}

// Seta conteúdo em um elemento HTML
function setElementContent(elementId, content){
	gebi(elementId).innerHTML = content;
}

// Torna um elemento HTML visível
function showElement(elementId){
	gebi(elementId).style.display = 'block';;
}
// Torna um elemento HTML invisível
function hideElement(elementId){
	gebi(elementId).style.display = 'none';;
}

// Recarrega a página
function reloadPage(delay){
	var ms = delay || 300;
	setTimeout(function(){
		window.location.reload();
	}, ms);
}


//Redireciona para a página nos parâmetros
function goTo(pag) {
    var url = "#/" + pag;
    // Chamar o ajax para a http de redirecionamento
    $.ajax({
        url: url,
        type: "GET",
        success: function (result) {
            alert("Tudo certo");
        },
        error: function () {
            alert("Falhou");
        }
    }); 
}

//Redireciona para a página inicial
function goToInicio() {
    goTo("/");
}
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
        controller: 'GenericController'
    });

    $routeProvider.when('/games/2', {
        templateUrl: '/views/games/breakout.html',
        controller: 'GenericController'
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