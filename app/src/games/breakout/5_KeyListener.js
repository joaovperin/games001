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