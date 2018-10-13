"use strict";

/**
 * Main class. Instantiate or extend Game to create a new game of your own
 */
class Game extends DisplayObjectContainer{
	
	constructor(gameId, width, height, canvas){
		super(gameId, null);
		Game.instance = this;

		this.gameId = gameId;
		this.width = width;
		this.height = height;
		this.canvas = canvas;
		this.g = canvas.getContext('2d'); //the graphics object
		this.playing = false;

		this.pressedKeys = new ArrayList();

		/* Setup a key listener */
		window.addEventListener("keydown", onKeyDown, true);
		window.addEventListener("keyup", onKeyUp, true);
	}

	static getInstance(){ return Game.instance; }

	update(pressedKeys, gamepads){super.update(pressedKeys, gamepads);}
	draw(g){super.draw(g);}

	nextFrame(){
		game.update(this.pressedKeys, game.pollGamepads());
		game.draw(this.g);
		if(this.playing) window.requestAnimationFrame(tick);
	}

	start(){
		this.playing = true;
		window.requestAnimationFrame(tick); //Notice that tick() MUST be defined somewhere! See LabOneGame.js for an example
	}

	pause(){
		this.playing = false;
	}

	/**
	 * For dealing with gamepads
	 */
	pollGamepads(){
		var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
		var toReturn = [];
  		for (var i = 0; i < gamepads.length; i++) {
    		var gp = gamepads[i];
    		toReturn.push(new Gamepad(gp));
  		}
  		return toReturn;
	}

	/**
	 * For dealing with keyCodes
	 */
	addKey(keyCode){
		console.log("Key Code: " + keyCode); //for your convenience, you can see what the keyCode you care about is
		if(this.pressedKeys.indexOf(keyCode) == -1) this.pressedKeys.push(keyCode);
	}

	removeKey(keyCode){ this.pressedKeys.remove(keyCode); }
}

function onKeyDown(e){ Game.getInstance().addKey(e.keyCode); }
function onKeyUp(e){ Game.getInstance().removeKey(e.keyCode); }

/**
 * Listens for gamepads to be connected. 
 */
window.addEventListener("gamepadconnected", function(e) {
  console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
    e.gamepad.index, e.gamepad.id,
    e.gamepad.buttons.length, e.gamepad.axes.length);
});

window.addEventListener("gamepaddisconnected", function(e) {
  console.log("Gamepad disconnected from index %d: %s",
    e.gamepad.index, e.gamepad.id);
});
