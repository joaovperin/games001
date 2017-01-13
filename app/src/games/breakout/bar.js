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