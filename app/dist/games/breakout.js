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

// Declara o objeto barra
var Bar = {};
// Método responsável por inicializar os parâmetro da barra
	Bar.setup = function(){
		Bar.height = 12, Bar.width = 70, Bar.speed = 0;
		Bar.positionX = (canvas.width - Bar.width)/2;
		Bar.positionY = (canvas.height - Bar.height - 5);
		Bar.color = "rgb(30,0,0)";
	}
 // Declara o método atualizar a barra
	Bar.update = function(){
		// Verifica Colisão Esquerda e depois Incrementa a posição horizontal com a velocidade
		if (Bar.positionX >= 0){
			Bar.positionX += Bar.speed;
		} else { 
			Bar.positionX = 0.3
		}

// Verifica Colisão Direita e depois Incrementa a posição horizontal com a velocidade
		if (Bar.positionX <= canvas.width - Bar.width){
			Bar.positionX += Bar.speed;
		} else {Bar.positionX = (canvas.width - Bar.width) - 0.3}
	}
// Declara o método para renderizar a barra
	Bar.render = function(){
		// Desenha um retângulo com as posições da barra e suas dimensões
		context.beginPath();
		context.fillStyle = Bar.color;
		context.fill();
		context.fillRect(Bar.positionX, Bar.positionY, Bar.width, Bar.height);
	}
var Block = {};

	Block.setup = function(){
		Block.arr = [], Block.color = '#ff0000';
		Block.width = 28, Block.height = 12;
		Block.offsetX = 5, Block.offsetY = 8;

		//Cria Array 2D com 10 ocorrências
		var max = Math.floor(canvas.width / (Block.offsetX + Block.width));
		var posY = 30;
		for (var j = 0; j < 7; j++) {
			for (var i = 0; i < max; i++) {
				Block.arr.push(Block.create(i, posY));
			}
			posY += Block.height + Block.offsetY;
		}
	}

	Block.create = function(x, y){
		var B = {};
			B.x = x * (Block.width + Block.offsetX) + Block.offsetX; B.y = y;
			B.index = x;
		return B;
	}

	Block.render = function(){
		context.fillStyle = "#0095DD";
		// Desenha todos os blocos do array de blocos
		for (var i = 0; i < Block.arr.length; i++) {
			context.fillRect(Block.arr[i].x, Block.arr[i].y, Block.width, Block.height);
		}
	}

	Block.update = function(){
		// Percorre todos os blocos
		for (var i = 0; i < Block.arr.length; i++) {
			var block = Block.arr[i];
			// Se bater na bola, destrói o bloco
			if (Block.isCollidingWithBall(block)){
				Ball.collisionKick(block);
				Block.destroy(i);
				Game.increasePoints(100);
			}
		}
	}
// Verifica se o bloco está colidindo com a bola	
	Block.isCollidingWithBall = function(block){
		// Calcula a distância entre a bola e o bloco
		var dX = distance(Ball.positionX, block.x);
		var dY = distance(Ball.positionY, block.y);
		// Se a distância for menor que o tamanho dos dois em ambos os eixos, indica colisão
		if ((dX <= Block.width + Ball.radius) && dY <= Block.height + Ball.radius) {
			return true;
		}
		return false;  
	}
// Destrói um bloco
	Block.destroy = function(index){
		Block.arr.splice(index, 1);
	}
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
// Declara o objeto para lidar com as teclas
var Tecla = {};
	// Inicializa supondo que nenhuma tecla está pressionada
	Tecla.atual = null;
	//Verifica teclas pressionadas
	Tecla.keyDown = function(e){
		// Se for tecla para esquerda
		if (e.keyCode == 37) {
			Tecla.atual = e.keyCode;
			Bar.speed = -5; 
		}
		// Se for tecla para direita
		if (e.keyCode == 39) {
			Tecla.atual = e.keyCode;
			Bar.speed = 5;	
		}
		// Se for a barra de espaço
		if (e.key == ' ') {
			// Se não acabou o jogo
			if(!Game.over){
				Game.togglePause();
			}
		}
	}
	// Verifica teclas despressionadas(soltas)
	Tecla.keyUp = function(e){
		// Se a tecla despressionada for a mesma que já foi pressionada, para de mover a barra
		if(e.keyCode == Tecla.atual){
			Tecla.atual = null;
			Bar.speed = 0;	
		}
	}
