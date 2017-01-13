//Controller do template de itens do pedido
app.controller ('ItensPedidoController', function($scope, $http){

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