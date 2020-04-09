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