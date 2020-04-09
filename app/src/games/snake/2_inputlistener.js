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