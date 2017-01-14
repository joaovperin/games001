//Controller da página de Cadastro
angular.module('Games').controller('CadastroController', function ($scope) {

	

});
//Controller do footer da página
angular.module('Games').controller ('FooterController', function($scope){
    $scope.foot = "Novo Hamburgo, " + Date();
});
//Controller da página de Games
angular.module('Games').controller('GamesCtrl', function(){

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
//Controller do footer da página
app.controller ('HTTPError404', function($scope, $location){
    $scope.msg = "Ocorreu um erro ao abrir a página! Desculpe :/ " + $location.path();
});