/**
 * Food controller
 */
Food = {

	create: function(){
		this.size = 20, this.color = '#a0b2cc';
		var obj = this.createPos();
		this.x = obj.x, this.y = obj.y;
	},

	update: function(){
		// If collides with player
		if (Player.x == this.x && Player.y == this.y) {
			Player.grow();
			this.create();
		}

	},

	render: function(){
		Game.ctx.fillStyle = this.color;
        Game.ctx.fillRect(this.x, this.y, this.size, this.size);
	},

	createPos: function(){
		var px = this.rand(Game.p.width);
		var py = this.rand(Game.p.height);

		if (Player.x == px && Player.y == py) return this.createPos();

		// Check if not colliding on tail
		for (var i = 0; i < Player.tail.length; i++) {
			if (Player.tail[i].x == px && Player.tail[i].y == py) {
				return this.createPos();
			}
		}
		return {x: px, y: py};

	},

	rand: function(limit) {
		return Math.floor(Math.random() * limit/this.size ) * this.size;
	}

}

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

/**
 * The input controller
 */
InputListener = {

	key: false, press: false,

	start: function(){

		window.addEventListener('keydown', function (e) {
            InputListener.key = e.keyCode;
            InputListener.press = true;
        })

        window.addEventListener('keyup', function (e) {
          	InputListener.press = false;
        })
	},

	isDown: function(){return InputListener.key === 40},
	isUp: function(){return InputListener.key === 38},
	isLeft: function(){return InputListener.key === 37},
	isRight: function(){return InputListener.key === 39},
	isPress: function(){return InputListener.press}

}
/**
 * The player controller
 */
Player = {

	load: function(){
		this.size = Game.p.size, this.color = '#dfa002', this.headColor = '#ff0000';
		this.x = 0, this.y = 0;
		this.vx = 0, this.vy = 0;
		this.snakeLen = 0, this.tail = [];
	},

	update: function () {

		// Makes it move
		var key = InputListener;
		if (key){
			if (!this.vy && key.isDown()) 	{this.vy = this.size, this.vx = 0;}
			if (!this.vy && key.isUp()) 	{this.vy = -this.size, this.vx = 0;}
			if (!this.vx && key.isLeft()) 	{this.vy = 0, this.vx = -this.size;}
			if (!this.vx && key.isRight()) 	{this.vy = 0, this.vx = this.size;}
		}

		// Check for collisions on the border
		this.checkBorder();

		// Moves the tail
		if (this.snakeLen === this.tail.length){
			for(var i=0; i < this.tail.length - 1; i++){
				this.tail[i].x = this.tail[i + 1].x;
				this.tail[i].y = this.tail[i + 1].y;
			}
		}
		this.tail[this.snakeLen - 1] = {x: this.x, y: this.y};

		// Moves the head
		this.x += this.vx;
		this.y += this.vy;

		if(this.checkCollision()){
			Game.p.state = 1; // Game Over State
			clearInterval(Game.p.MainLoop);
		}

	},

	render: function(){
		// Choose color
		Game.ctx.fillStyle = this.color;
		// Draws the tail
		for(var i=0; i < this.tail.length; i++){
			Game.ctx.fillRect(this.tail[i].x, this.tail[i].y, this.size, this.size);
		}
		// Draws the head
		Game.ctx.fillStyle = this.headColor;
        Game.ctx.fillRect(this.x, this.y, this.size, this.size);
	},

	checkCollision: function(){
		// Check for collisions in tail
		for (var i=0; i < this.tail.length; i++) {
			if(this.x == this.tail[i].x && this.y == this.tail[i].y){
				return true;
			}
		}
		return false;
	},

	checkBorder: function(){

		// X axis
		if (this.vx < 0 && this.x <= 0){ this.x = Game.p.width; }
		if (this.vx > 0 && this.x == Game.p.width - this.size){ this.x = -this.size; }

		// Y axis
		if (this.vy < 0 && this.y <= 0){ this.y = Game.p.height; }
		if (this.vy > 0 && this.y == Game.p.height - this.size){ this.y = -this.size; }
	},

	grow: function(){
		Game.p.points += 100;
		$('#points').text(Game.p.points);
		// Check if not win
		if (++this.snakeLen >= Game.p.maxLen){
			Game.p.state = 2;
			clearInterval(Game.p.MainLoop);
		}

	}

}