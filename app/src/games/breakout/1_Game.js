angular.module('Games').factory('BreakoutGame', function (BreakoutParams, BreakoutBall, BreakoutBar, BreakoutBlock) {

	// Instances
	var Bar = BreakoutBar;
	var Ball = BreakoutBall;
	var Block = BreakoutBlock;

	var loop;

	// Declara Game como um objeto
	var Game = {};
	// Declara método setup do Game
	Game.setup = function () {
		BreakoutParams.isRunning = false;
		// Declara o parâmetro FPS do objeto Game
		BreakoutParams.fps = 60;
		BreakoutParams.points = 0;

		// Carrega parâmetros
		Bar.setup();
		Ball.setup();
		Block.setup();
	}
	// Declara método do loop principal do Game
	Game.loop = function () {
		Game.update();
		Game.render();
	}
	// Declara método de atualização do Game
	Game.update = function () {
		// Se deve encerrar o jogo
		if (!BreakoutParams.isRunning) {
			return;
		}
		// Se finalizou
		if (BreakoutParams.over) {
			clearInterval(loop);
			BreakoutParams.isRunning = false;
			// Exibe mensagem de GameOver e botão de reset
			setElementContent('message', 'Game Over! Click on Reload');
			setElementContent('playButton', 'RELOAD');
			return;
		}
		// Chama atualização dos frames do jogador
		Bar.update();
		Ball.update();
		Block.update();
	}
	// Declara método de renderização do Game
	Game.render = function () {
		// Limpa o canvas
		BreakoutParams.context.clearRect(0, 0, canvas.width, canvas.height);
		// Renderiza o jogador
		Bar.render();
		Ball.render();
		Block.render();
	}
	// Pausa/Despausa o jogo
	Game.togglePause = function () {
		if (BreakoutParams.isRunning === true) {
			BreakoutParams.isRunning = false;
			setElementContent('message', 'Paused! Press Spacebar');
			clearInterval(loop);
		} else {
			BreakoutParams.isRunning = true;
			setElementContent('message', 'Game is Running');
			loop = setInterval(Game.loop, 1000 / 60);
		}
	}

	return Game;

});