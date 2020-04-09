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