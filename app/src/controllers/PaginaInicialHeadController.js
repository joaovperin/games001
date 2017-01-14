//Controller do header da página inicial
angular.module('Games').controller('PaginaInicialHeaderController', function ($scope) {
    //Cria objeto do projeto
	$scope.projeto = { };
    //Seta título da página principal
    $scope.projeto.title = 'Games - Início';
    
});