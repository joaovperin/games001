//declara objeto Ball
var Ball = {};
//define parametros da bola
	Ball.setup = function(){
		Ball.speedX = 3.3;
		Ball.speedY = 3.3;
		Ball.radius = 10;
		Ball.positionX = canvas.width/2;
		Ball.positionY = canvas.height - (canvas.height/3);
		Ball.color = "rgb(255,0,0)";
	}
//renderiza bola
	Ball.render = function(){
		context.fillStyle = Ball.color;
		context.beginPath();
		context.arc(Ball.positionX, Ball.positionY, Ball.radius, 0, 2*Math.PI);
		context.fill();
		context.stroke();
	}

// Declara o método atualizar a barra
	Ball.update = function(){
		//Verifica Colisao Horizontal
		if (Ball.positionX <= Ball.radius || Ball.positionX >= canvas.width - Ball.radius) {
			// Invete a velocidade em X
			Ball.speedX *= (-1);
		}

		// Se a bola bater em uma das 3 paredes verticais exceto chão
		if (Ball.positionY <= Ball.radius) {
			// Invete a velocidade em X
			Ball.speedY *= (-1);
		}
		// Move a bolinha nos 2 eixos
		
		Ball.positionY += Ball.speedY;
		Ball.positionX += Ball.speedX;

		//verifica se bola caiu
		if (Ball.positionY >= canvas.height - Ball.radius) {
			Game.gameover();
		}

		//Verifica Colisão com a Barra
		if ((Ball.positionX > Bar.positionX && Ball.positionX < Bar.positionX + Bar.width)
			&& Ball.positionY > canvas.height - 25){
				Ball.speedY *= (-1);
			}

	}
// Realiza a kikada ao colidir com determinado bloco
	Ball.collisionKick = function (block){
		//Hit was from below the brick
		if(Ball.positionY <= block.y - (Block.height/2)) Ball.speedY *= (-1);
		//Hit was from above the brick
		else if(Ball.positionY >= block.y + (Block.height/2)) Ball.speedY *= (-1);
		//Hit was on left
		else if(Ball.positionX < block.x) Ball.speedX *= (-1);
  		//Hit was on right
		else if(Ball.positionX > block.x) Ball.speedX *= (-1);
	}
