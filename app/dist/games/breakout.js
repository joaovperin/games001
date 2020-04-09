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
angular.module('Games').factory('BreakoutBall', function (BreakoutParams, BreakoutBar) {

	//declara objeto Ball
	var Ball = {};
	//define parametros da bola
	Ball.setup = function () {
		Ball.positionX = BreakoutParams.canvas.width / 2;
		Ball.positionY = BreakoutParams.canvas.height - (BreakoutParams.canvas.height / 3);
		Ball.color = "rgb(255,0,0)";
	}
	//renderiza bola
	Ball.render = function () {
		BreakoutParams.context.fillStyle = Ball.color;
		BreakoutParams.context.beginPath();
		BreakoutParams.context.arc(Ball.positionX, Ball.positionY, BreakoutParams.ballRadius, 0, 2 * Math.PI);
		BreakoutParams.context.fill();
		BreakoutParams.context.stroke();
	}

	// Declara o método atualizar a barra
	Ball.update = function () {
		//Verifica Colisao Horizontal
		if (Ball.positionX <= BreakoutParams.ballRadius || Ball.positionX >= BreakoutParams.canvas.width - BreakoutParams.ballRadius) {
			// Invete a velocidade em X
			BreakoutParams.ballSpeedX *= (-1);
		}

		// Se a bola bater em uma das 3 paredes verticais exceto chão
		if (Ball.positionY <= BreakoutParams.ballRadius) {
			// Invete a velocidade em X
			BreakoutParams.ballSpeedY *= (-1);
		}
		// Move a bolinha nos 2 eixos

		Ball.positionY += BreakoutParams.ballSpeedY;
		Ball.positionX += BreakoutParams.ballSpeedX;

		// Verifica se bola caiu
		if (Ball.positionY >= BreakoutParams.canvas.height - BreakoutParams.ballRadius) {
			BreakoutParams.over = true;
			return;
		}

		//Verifica Colisão com a Barra
		if ((Ball.positionX > BreakoutBar.positionX && Ball.positionX < BreakoutBar.positionX + BreakoutBar.width) &&
			Ball.positionY > BreakoutParams.canvas.height - 25) {
			BreakoutParams.ballSpeedY *= (-1);
		}

	}
	// Realiza a kikada ao colidir com determinado bloco
	Ball.collisionKick = function (block) {
		//Hit was from below the brick
		if (Ball.positionY <= block.y - (BreakoutParams.blockHeight / 2)) BreakoutParams.ballSpeedY *= (-1);
		//Hit was from above the brick
		else if (Ball.positionY >= block.y + (BreakoutParams.blockHeight / 2)) BreakoutParams.ballSpeedY *= (-1);
		//Hit was on left
		else if (Ball.positionX < block.x) BreakoutParams.ballSpeedX *= (-1);
		//Hit was on right
		else if (Ball.positionX > block.x) BreakoutParams.ballSpeedX *= (-1);
	}

	return Ball;

});
angular.module('Games').factory('BreakoutBar', function (BreakoutParams) {

	// Declara o objeto barra
	var Bar = {};
	// Método responsável por inicializar os parâmetro da barra
	Bar.setup = function () {
		Bar.height = 12, Bar.width = 70,
		Bar.positionX = (BreakoutParams.canvas.width - Bar.width) / 2;
		Bar.positionY = (BreakoutParams.canvas.height - Bar.height - 5);
		Bar.color = "rgb(30,86,120)";
	}
	// Declara o método atualizar a barra
	Bar.update = function () {
		// Verifica Colisão Esquerda e depois Incrementa a posição horizontal com a velocidade
		if (Bar.positionX >= 0) {
			Bar.positionX += BreakoutParams.barSpeed;
		} else {
			Bar.positionX = 0.3
		}

		// Verifica Colisão Direita e depois Incrementa a posição horizontal com a velocidade
		if (Bar.positionX <= BreakoutParams.canvas.width - Bar.width) {
			Bar.positionX += BreakoutParams.barSpeed;
		} else {
			Bar.positionX = (BreakoutParams.canvas.width - Bar.width) - 0.3
		}
	}
	// Declara o método para renderizar a barra
	Bar.render = function () {
		// Desenha um retângulo com as posições da barra e suas dimensões
		BreakoutParams.context.beginPath();
		BreakoutParams.context.fillStyle = Bar.color;
		BreakoutParams.context.fill();
		BreakoutParams.context.fillRect(Bar.positionX, Bar.positionY, Bar.width, Bar.height);
	}

	return Bar;

});
angular.module('Games').factory('BreakoutBlock', function (BreakoutParams, BreakoutBall) {

	var Block = {};

	Block.setup = function () {
		BreakoutParams.blockHeight = 12;
		BreakoutParams.blockWidth = 28;
		BreakoutParams.blockOffsetX = 5;
		BreakoutParams.blockOffsetY = 8;
		Block.arr = [];
		//Cria Array 2D com 10 ocorrências
		var max = Math.floor(BreakoutParams.canvas.width / (BreakoutParams.blockOffsetX + BreakoutParams.blockWidth));
		var posY = 30;
		for (var j = 0; j < 7; j++) {
			for (var i = 0; i < max; i++) {
				Block.arr.push(Block.create(i, posY));
			}
			posY += BreakoutParams.blockHeight + BreakoutParams.blockOffsetY;
		}
	}

	Block.create = function (x, y) {
		var B = {};
		B.x = x * (BreakoutParams.blockWidth + BreakoutParams.blockHeight) + BreakoutParams.blockHeight;
		B.y = y;
		B.index = x;
		return B;
	}

	Block.render = function () {
		BreakoutParams.context.fillStyle = "#0095DD";
		// Desenha todos os blocos do array de blocos
		for (var i = 0; i < Block.arr.length; i++) {
			BreakoutParams.context.fillRect(Block.arr[i].x, Block.arr[i].y, BreakoutParams.blockWidth, BreakoutParams.blockHeight);
		}
	}

	Block.update = function () {
		// Percorre todos os blocos
		for (var i = 0; i < Block.arr.length; i++) {
			var block = Block.arr[i];
			// Se bater na bola, destrói o bloco
			if (Block.isCollidingWithBall(block)) {
				BreakoutBall.collisionKick(block);
				Block.destroy(i);
				// Increase points
				BreakoutParams.points += 100;
				setElementContent('points', BreakoutParams.points);
			}
		}
	}
	// Verifica se o bloco está colidindo com a bola
	Block.isCollidingWithBall = function (block) {
		// Calcula a distância entre a bola e o bloco
		var dX = distance(BreakoutBall.positionX, block.x);
		var dY = distance(BreakoutBall.positionY, block.y);
		// Se a distância for menor que o tamanho dos dois em ambos os eixos, indica colisão
		if ((dX <= BreakoutParams.blockWidth + BreakoutParams.ballRadius) && dY <= BreakoutParams.blockHeight + BreakoutParams.ballRadius) {
			return true;
		}
		return false;
	}
	// Destrói um bloco
	Block.destroy = function (index) {
		Block.arr.splice(index, 1);
	}

	return Block;

});
angular.module('Games').factory('BreakoutTecla', function (BreakoutParams) {

	// Declara o objeto para lidar com as teclas
	var Tecla = {};
	// Inicializa supondo que nenhuma tecla está pressionada
	Tecla.atual = null;
	//Verifica teclas pressionadas
	Tecla.keyDown = function (e) {
		// Se for tecla para esquerda
		if (e.keyCode == 37) {
			Tecla.atual = e.keyCode;
			BreakoutParams.barSpeed = -5;
		}
		// Se for tecla para direita
		if (e.keyCode == 39) {
			Tecla.atual = e.keyCode;
			BreakoutParams.barSpeed = 5;
		}
		// Se for a barra de espaço
		if (e.key == ' ') {
			// Se não acabou o jogo
			if (!Game.over) {
				Game.togglePause();
			}
		}
	}
	// Verifica teclas despressionadas(soltas)
	Tecla.keyUp = function (e) {
		// Se a tecla despressionada for a mesma que já foi pressionada, para de mover a barra
		if (e.keyCode == Tecla.atual) {
			Tecla.atual = null;
			BreakoutParams.barSpeed = 0;
		}
	}

	return Tecla;
});
angular.module('Games').factory('BreakoutParams', function () {

	// Instances
	var GameParams = {
		context: null,
		canvas: null,
		// Block
		blockHeight: 12,
		blockWidth: 28,
		blockOffsetX: 5,
		blockOffsetY: 8,
		// Ball
		ballRadius: 10,
		ballSpeedX: 3.3,
		ballSpeedY: 3.3,
		// Bar
		barSpeed: 0
	};

	return GameParams;

});