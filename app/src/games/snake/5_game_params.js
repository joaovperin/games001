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