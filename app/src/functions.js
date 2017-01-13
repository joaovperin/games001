// Referência do loop principal do jogo
var loop;

/**
 * Faz o jogo iniciar
 */
function playGame(){
	// Se não acabou o jogo
	if(!Game.over){
		Game.togglePause();
	} else {	
		reloadPage();
	}
}

/**
 * Função chamada ao carregar a página, para carregar o jogo
 */
function loadGame(){
	// Pega o elemento canvas da página html e guarda seu contexto numa variável
	canvas = document.getElementById('canvas');
	context = canvas.getContext("2d");
	// Atribui os eventos de pressionamento de tecla
	document.addEventListener("keydown", Tecla.keyDown);
	document.addEventListener("keyup", Tecla.keyUp);
	// Carrega parâmetros do Game
	Game.setup();
	Game.render();
}

/** 
 *  Retorna a distância entre dois pontos
 */
function distance(pointA, pointB){
	return Math.abs(pointA - pointB);
}

// Busca um elemento HTML pelo ID e o retorna
function gebi(elementId){
	return document.getElementById(elementId);
}

// Seta conteúdo em um elemento HTML
function setElementContent(elementId, content){
	gebi(elementId).innerHTML = content;
}

// Torna um elemento HTML visível
function showElement(elementId){
	gebi(elementId).style.display = 'block';;
}
// Torna um elemento HTML invisível
function hideElement(elementId){
	gebi(elementId).style.display = 'none';;
}

// Recarrega a página
function reloadPage(delay){
	var ms = delay || 300;
	setTimeout(function(){
		window.location.reload();
	}, ms);
}


//Redireciona para a página nos parâmetros
function goTo(pag) {
    var url = "#/" + pag;
    // Chamar o ajax para a http de redirecionamento
    $.ajax({
        url: url,
        type: "GET",
        success: function (result) {
            alert("Tudo certo");
        },
        error: function () {
            alert("Falhou");
        }
    }); 
}

//Redireciona para a página inicial
function goToInicio() {
    goTo("/");
}