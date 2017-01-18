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