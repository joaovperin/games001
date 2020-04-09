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