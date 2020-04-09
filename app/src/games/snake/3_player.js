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