//Controller da página de Cadastro
angular.module('Games').controller('CadastroController', function ($scope) {

	

});
//Controller do footer da página
angular.module('Games').controller ('FooterController', function($scope){
    $scope.foot = "Novo Hamburgo, " + Date();
});
//Controller com funções genéricas, usado em jogos
angular.module('Games').controller ('GenericController', function($scope, $location){

    //Localização atual (URL)
    $scope.tab = $location.path();

    $scope.loadGame = function(){
    	// Se houver a função loadGame definida
    	if ('function' === typeof loadGame) {
    		loadGame();
    	} else {
    		console.log('função local loadGame não definida :/');
    	}
    };

});


//Controller do template de itens do pedido
angular.module('Games').controller ('ItensPedidoController', function($scope, $http){

    //Lista de Produtos
    $scope.produtos = [
        {descricao: 'Arroz', quantidade: 0},
        {descricao: 'Batata', quantidade: 0},
        {descricao: 'Outro', quantidade: 0}
    ];

    //Inicializa contador
    $scope.num = 0;
    //Função para incrementar contagem
    $scope.inc = function(){
        $scope.num++;
    }
    //Função para decrementar contagem
    $scope.dim = function(){
        $scope.num > 0 ? $scope.num-- : $scope.num = 0;
    }
});
//Controller da página de Login
angular.module('Games').controller('LoginController', function ($scope) {


});
//Controller da barra de navegação
angular.module('Games').controller('NavbarController', function ($scope, $location) {

    //Retorna verdadeiro se a aba corrente está ativa
    $scope.isActive = function (viewLocation) {
        var id = $location.path().indexOf(viewLocation);
        return id === 0;
    };

    //Se está na página Index
    $scope.isIndexActive = function () {
        return $location.path() === "/";
    }

});
//Controller do header da página inicial
angular.module('Games').controller('PaginaInicialHeaderController', function ($scope) {
    //Cria objeto do projeto
	$scope.projeto = { };
    //Seta título da página principal
    $scope.projeto.title = 'Games - Início';
    
});
//Controller da página de testes
angular.module('Games').controller('TestesController', function ($scope) {

    $scope.colorList = [
        {
            name: "Red",
            hex: "#F21B1B"
        },
        {
            name: "Blue",
            hex: "#1B66F2"
        },
        {
            name: "Green",
            hex: "#07BA16"
        },
        {
            name:"Purple",
            hex:"#b300b3"
        }

        ];
    $scope.myColor = "";
});
//Controller da página de Games - Breakout
angular.module('Games').controller('BreakoutGamesCtrl', function ($scope, BreakoutParams, BreakoutTecla, BreakoutGame) {

    /**
     * Função chamada ao carregar a página, para carregar o jogo
     */
    $scope.$on('$viewContentLoaded', function () {
        // Pega o elemento canvas da página html e guarda seu contexto numa variável
        BreakoutParams.canvas = document.getElementById('canvas');
        BreakoutParams.context = canvas.getContext("2d");
        console.log(BreakoutParams.canvas)
        console.log(BreakoutParams.context)
        // Atribui os eventos de pressionamento de tecla
        document.addEventListener("keydown", BreakoutTecla.keyDown);
        document.addEventListener("keyup", BreakoutTecla.keyUp);
        // Carrega parâmetros do Game
        BreakoutGame.setup();
        BreakoutGame.render();
    });


    /**
     * Faz o jogo iniciar
     */
    $scope.playGame = function () {
        console.log('clico');
        // Se não acabou o jogo
        if (!BreakoutParams.over) {
            BreakoutGame.togglePause();
        } else {
            reloadPage();
        }
    };

});
//Controller da página de Games - Snake
angular.module('Games').controller('SnakeGamesCtrl', function ($scope, SnakeGame) {

    $scope.$on('$viewContentLoaded', function () {
        angular.element('#result').hide();
        SnakeGame.initGameParams();
    });

    $scope.startGame = function () {
        SnakeGame.startGame();
    };

    $scope.stopGame = function () {
        SnakeGame.stopGame();
    };

});
//Controller do footer da página
app.controller ('HTTPError404', function($scope, $location){
    $scope.msg = "Ocorreu um erro ao abrir a página! Desculpe :/ " + $location.path();
});