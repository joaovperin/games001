
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