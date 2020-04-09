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