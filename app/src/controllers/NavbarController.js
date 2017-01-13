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