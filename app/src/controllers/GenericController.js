//Controller com funções genéricas, usado em jogos
app.controller ('GenericController', function($scope, $location){

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

