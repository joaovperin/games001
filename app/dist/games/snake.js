angular.module('Games').factory('SnakeGame', function (SnakeGameParams, SnakeInputListener, SnakePlayer, SnakeFood) {

	// Instances
	var InputListener = SnakeInputListener;
	var Player = SnakePlayer;
	var Food = SnakeFood;

	/**
	 * Clear game canvas
	 */
	function clearCanvas() {
		SnakeGameParams.ctx.clearRect(0, 0, SnakeGameParams.width, SnakeGameParams.height);
	}

	/**
	 * Main Game Object
	 */
	var Game = {

		/**
		 * Loads all the game resources
		 */
		load: function () {
			console.log('Loading SnakeGame...');
			this.canvas = $('#canvas').attr('width', SnakeGameParams.width + 'px').attr('height', SnakeGameParams.height + 'px');
			SnakeGameParams.ctx = this.canvas[0].getContext("2d");
			SnakeGameParams.maxLen = this.getMaxLength();
			Player.load();
			Food.create();
			console.log('done!');
		},

		/**
		 * Start the game
		 */
		start: function () {
			InputListener.start();
			SnakeGameParams.MainLoop = setInterval(this.update, parseInt(1000 / SnakeGameParams.fps));
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
			clearCanvas();
			Player.render();
			Food.render();
			// If changed the state
			if (SnakeGameParams.state !== 0) {
				$('#restart').show();
				var text = '';
				if (SnakeGameParams.state === 1) {
					this.doGameOver();
					text = 'Game Over :/';
				}
				if (SnakeGameParams.state === 2) {
					this.doWin();
					text = 'YOU WIN! hehe :/';
				}
				$('#result').show().text(text);
			}
		},

		doGameOver: function () {
			clearCanvas();
			SnakeGameParams.ctx.fillStyle = '#000000';
			SnakeGameParams.ctx.font = "30px Arial";
			var xx = Math.floor(SnakeGameParams.width / 2 - 58);
			var yy = Math.floor(SnakeGameParams.height / 2 + 7);
			SnakeGameParams.ctx.fillText("You Die! ", xx, yy);
		},

		doWin: function () {
			clearCanvas();
			SnakeGameParams.ctx.fillStyle = '#000000';
			SnakeGameParams.ctx.font = "30px Arial";
			var xx = Math.floor(SnakeGameParams.width / 2 - 58);
			var yy = Math.floor(SnakeGameParams.height / 2 + 7);
			SnakeGameParams.ctx.fillText("You Win! ", xx, yy);
		},

		getMaxLength: function () {
			return Math.floor((SnakeGameParams.width * SnakeGameParams.height) / (SnakeGameParams.size * SnakeGameParams.size));
		},

		/**
		 * Loads and starts the game
		 */
		startGame: function () {
			this.initGameParams();
			this.load();
			this.start();
		},

		/**
		 * Stop the game
		 */
		stopGame: function () {
			clearCanvas();
			InputListener.stop();
			clearInterval(SnakeGameParams.MainLoop);
		},

		/**
		 * Initialize game parameters
		 */
		initGameParams: function () {
			SnakeGameParams.width = 320;
			SnakeGameParams.height = 240;
			SnakeGameParams.size = 20;
			SnakeGameParams.fps = 5;
			SnakeGameParams.points = 0;
			SnakeGameParams.maxLen = 0;
			SnakeGameParams.start = 0;
			SnakeGameParams.ctx = null;
		}

	};

	return Game;

});
angular.module('Games').factory('SnakeInputListener', function () {

	var keyDownFn = function (e) {
		InputListener.key = e.keyCode;
		InputListener.press = true;
	};

	var keyUpFn = function (e) {
		InputListener.press = false;
	};

	/**
	 * The input controller
	 */
	var InputListener = {

		key: false,
		press: false,

		start: function () {
			window.addEventListener('keydown', keyDownFn);
			window.addEventListener('keyup', keyUpFn);
		},
		stop: function () {
			window.removeEventListener('keydown', keyDownFn);
			window.removeEventListener('keyup', keyUpFn);
		},

		isDown: function () {
			return InputListener.key === 40
		},
		isUp: function () {
			return InputListener.key === 38
		},
		isLeft: function () {
			return InputListener.key === 37
		},
		isRight: function () {
			return InputListener.key === 39
		},
		isPress: function () {
			return InputListener.press
		}

	}

	return InputListener;

});
angular.module('Games').factory('SnakePlayer', function (SnakeGameParams, SnakeInputListener) {

	// Instances
	var InputListener = SnakeInputListener;

	/**
	 * The player controller
	 */
	var Player = {

		load: function () {
			this.size = SnakeGameParams.size, this.color = '#dfa002', this.headColor = '#ff0000';
			this.x = 0, this.y = 0;
			this.vx = 0, this.vy = 0;
			this.snakeLen = 0, this.tail = [];
		},

		update: function () {

			// Makes it move
			var key = InputListener;
			if (key) {
				if (!this.vy && key.isDown()) {
					this.vy = this.size, this.vx = 0;
				}
				if (!this.vy && key.isUp()) {
					this.vy = -this.size, this.vx = 0;
				}
				if (!this.vx && key.isLeft()) {
					this.vy = 0, this.vx = -this.size;
				}
				if (!this.vx && key.isRight()) {
					this.vy = 0, this.vx = this.size;
				}
			}

			// Check for collisions on the border
			this.checkBorder();

			// Moves the tail
			if (this.snakeLen === this.tail.length) {
				for (var i = 0; i < this.tail.length - 1; i++) {
					this.tail[i].x = this.tail[i + 1].x;
					this.tail[i].y = this.tail[i + 1].y;
				}
			}
			this.tail[this.snakeLen - 1] = {
				x: this.x,
				y: this.y
			};

			// Moves the head
			this.x += this.vx;
			this.y += this.vy;

			if (this.checkCollision()) {
				SnakeGameParams.state = 1; // Game Over State
				clearInterval(SnakeGameParams.MainLoop);
			}

		},

		render: function () {
			// Choose color
			SnakeGameParams.ctx.fillStyle = this.color;
			// Draws the tail
			for (var i = 0; i < this.tail.length; i++) {
				SnakeGameParams.ctx.fillRect(this.tail[i].x, this.tail[i].y, this.size, this.size);
			}
			// Draws the head
			SnakeGameParams.ctx.fillStyle = this.headColor;
			SnakeGameParams.ctx.fillRect(this.x, this.y, this.size, this.size);
		},

		checkCollision: function () {
			// Check for collisions in tail
			for (var i = 0; i < this.tail.length; i++) {
				if (this.x == this.tail[i].x && this.y == this.tail[i].y) {
					return true;
				}
			}
			return false;
		},

		checkBorder: function () {

			// X axis
			if (this.vx < 0 && this.x <= 0) {
				this.x = SnakeGameParams.width;
			}
			if (this.vx > 0 && this.x == SnakeGameParams.width - this.size) {
				this.x = -this.size;
			}

			// Y axis
			if (this.vy < 0 && this.y <= 0) {
				this.y = SnakeGameParams.height;
			}
			if (this.vy > 0 && this.y == SnakeGameParams.height - this.size) {
				this.y = -this.size;
			}
		},

		grow: function () {
			SnakeGameParams.points += 100;
			$('#points').text(SnakeGameParams.points);
			// Check if not win
			if (++this.snakeLen >= SnakeGameParams.maxLen) {
				SnakeGameParams.state = 2;
				clearInterval(SnakeGameParams.MainLoop);
			}

		}

	}

	return Player;

});
angular.module('Games').factory('SnakeFood', function (SnakeGameParams, SnakePlayer) {

	// Instances
	var Player = SnakePlayer;

	/**
	 * Food controller
	 */
	var Food = {

		create: function () {
			this.size = 20, this.color = '#a0b2cc';
			var obj = this.createPos();
			this.x = obj.x, this.y = obj.y;
		},

		update: function () {
			// If collides with player
			if (Player.x == this.x && Player.y == this.y) {
				Player.grow();
				this.create();
			}

		},

		render: function () {
			SnakeGameParams.ctx.fillStyle = this.color;
			SnakeGameParams.ctx.fillRect(this.x, this.y, this.size, this.size);
		},

		createPos: function () {
			var px = this.rand(SnakeGameParams.width);
			var py = this.rand(SnakeGameParams.height);

			if (Player.x == px && Player.y == py) return this.createPos();

			// Check if not colliding on tail
			for (var i = 0; i < Player.tail.length; i++) {
				if (Player.tail[i].x == px && Player.tail[i].y == py) {
					return this.createPos();
				}
			}
			return {
				x: px,
				y: py
			};

		},

		rand: function (limit) {
			return Math.floor(Math.random() * limit / this.size) * this.size;
		}

	}

	return Food;

});
angular.module('Games').factory('SnakeGameParams', function () {

	// Instances
	var GameParams = {
		width: 320,
		height: 240,
		size: 20,
		fps: 5,
		points: 0,
		maxLen: 0,
		state: 0,
		ctx: null
	};

	return GameParams;

});