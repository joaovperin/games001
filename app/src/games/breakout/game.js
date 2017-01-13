// Declara Game como um objeto
var Game = {};
// Declara método setup do Game
	Game.setup = function(){
		Game.isRunning = false;
		// Declara o parâmetro FPS do objeto Game
		Game.fps = 60;
		Game.points = 0;
		// Carrega parâmetros
		Bar.setup();
		Ball.setup();
		Block.setup();
	}
// Declara método do loop principal do Game
	Game.loop = function(){
		Game.update();
		Game.render();
	}
// Declara método de atualização do Game
	Game.update = function (){
		// Se deve encerrar o jogo
		if (!Game.isRunning){return;}
		// Chama atualização dos frames do jogador
		Bar.update();
		Ball.update();
		Block.update();
	}
// Declara método de renderização do Game
	Game.render = function (){
		// Limpa o canvas
		context.clearRect(0,0, canvas.width, canvas.height);
		// Renderiza o jogador
		Bar.render();
		Ball.render();
		Block.render();
	}
// Pausa/Despausa o jogo
	Game.togglePause = function(){
		if (Game.isRunning === true) {
			Game.isRunning = false;
			setElementContent('message', 'Paused! Press Spacebar');
			clearInterval(loop);
		} else {
			Game.isRunning = true;
			setElementContent('message', 'Game is Running');
			loop = setInterval(Game.loop, 1000/60);
		}
	}
// Para o jogo
	Game.gameover = function(){
		clearInterval(loop);
		Game.isRunning = false;
		Game.over = true;
		// Exibe mensagem de GameOver e botão de reset
		setElementContent('message', 'Game Over! Click on Reload');
		setElementContent('playButton', 'RELOAD');
	}
// Aumenta os pontos do jogo
	Game.increasePoints = function(points){
		Game.points += points;
		setElementContent('points', Game.points);
	}