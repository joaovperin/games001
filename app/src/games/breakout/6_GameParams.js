angular.module('Games').factory('BreakoutParams', function () {

	// Instances
	var GameParams = {
		context: null,
		canvas: null,
		// Block
		blockHeight: 12,
		blockWidth: 28,
		blockOffsetX: 5,
		blockOffsetY: 8,
		// Ball
		ballRadius: 10,
		ballSpeedX: 3.3,
		ballSpeedY: 3.3,
		// Bar
		barSpeed: 0
	};

	return GameParams;

});