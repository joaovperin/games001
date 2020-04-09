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