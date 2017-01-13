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