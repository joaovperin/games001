
// Instances
var Game;
var InputListener;
var Player;
var Food;

/**
 * Loads and starts the game
 */
function startGame(){
	Game.load();
	Game.start();
}

/**
 * Main Game Object
 */
Game = {

	// Params
	p: {
		width: 320, height: 240, size:20, fps: 5, points: 0, maxLen: 0, state: 0
	},

	/**
	 * Loads all the game resources
	 */
	load: function () {
		console.log('loading...');
		this.canvas = $('#canvas').attr('width', this.p.width + 'px').attr('height', this.p.height + 'px');
		this.ctx = this.canvas[0].getContext("2d");
		this.p.maxLen = this.getMaxLength();
		Player.load();
		Food.create();
		console.log('done!');
	},

	/**
	 * Start the game
	 */
	start: function () {
		InputListener.start();
		this.p.MainLoop = setInterval(this.update, parseInt(1000/this.p.fps));
	},

	/**
	 * Updates the screen
	 */
	update: function () {
		Player.update();
		Food.update();
		Game.render();
	},

	/**
	 * Renders everything
	 */
	render: function () {
		this.ctx.clearRect(0, 0, this.p.width, this.p.height);
		Player.render();
		Food.render();
		// If changed the state
		if(this.p.state !== 0){
			$('#restart').show();
			var text = '';
			if(this.p.state === 1){
				this.doGameOver();
				text = 'Game Over :/';
			}
			if(this.p.state === 2){
				this.doWin();
				text = 'YOU WIN! hehe :/';
			}
			$('#result').show().text(text);
		}
	},

	doGameOver: function(){
		this.ctx.clearRect(0, 0, this.p.width, this.p.height);
		this.ctx.fillStyle = '#000000';
		this.ctx.font = "30px Arial";
		var xx = Math.floor(this.p.width / 2 - 58);
		var yy = Math.floor(this.p.height / 2 + 7);
		this.ctx.fillText("You Die! ", xx, yy);
	},

	doWin: function(){
		this.ctx.clearRect(0, 0, this.p.width, this.p.height);
		this.ctx.fillStyle = '#000000';
		this.ctx.font = "30px Arial";
		var xx = Math.floor(this.p.width / 2 - 58);
		var yy = Math.floor(this.p.height / 2 + 7);
		this.ctx.fillText("You Win! ", xx, yy);
	},

	getMaxLength: function(){
		return Math.floor((this.p.width * this.p.height) / (this.p.size * this.p.size));
	}

}