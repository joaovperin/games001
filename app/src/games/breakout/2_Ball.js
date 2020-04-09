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