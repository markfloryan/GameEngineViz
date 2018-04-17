"use strict";

/**
 * Main class. Instantiate or extend Game to create a new game of your own
 */
class LabOneGame extends Game{
	
	constructor(canvas){
		super("Lab One Game", 800, 600, canvas);
		this.mario = new Sprite("Mario", "Mario.png");
                this.coin1 = new Coin("Coin1", 300, 200); // is the id really necessary?
                this.coin2 = new Coin("Coin2", 500, 300); 
                this.coin3 = new Coin("Coin3", 100, 300); 

		this.xPos = 0;
		this.yPos = 0;
                
	}

	update(pressedKeys, gamepads){
		super.update(pressedKeys);
		this.mario.update(pressedKeys);

            // maybe move this into a mario class and have them work there? make the game invisible
		if(pressedKeys.contains(32))
                	console.log("Hello, world!");

            // rudimentary collision stuff
                if(this.coin1.loaded && this.coin1.collidesWith(this.mario)) {
                        this.coin1.dispatchEvent(new CustomEvent("pickup", {detail: this.coin1}));
                }
                if(this.coin2.collidesWith(this.mario)) {
                        this.coin2.dispatchEvent(new CustomEvent("pickup", {detail: this.coin2}));
                }
                if(this.coin3.collidesWith(this.mario)) {
                        this.coin3.dispatchEvent(new CustomEvent("pickup", {detail: this.coin3}));
                }
	}

	draw(g){
		g.clearRect(0, 0, this.width, this.height);
		super.draw(g);
		g.translate(this.xPos, this.yPos);
		this.mario.draw(g);
                this.coin1.draw(g);
                this.coin2.draw(g);
                this.coin3.draw(g);
		g.translate(-1*this.xPos, -1*this.yPos);
	}
}


/**
 * THIS IS THE BEGINNING OF THE PROGRAM
 * YOU NEED TO COPY THIS VERBATIM ANYTIME YOU CREATE A GAME
 */
function tick(){
	game.nextFrame();
}

/* Get the drawing canvas off of the  */
var drawingCanvas = document.getElementById('game');
if(drawingCanvas.getContext) {
	var game = new LabOneGame(drawingCanvas);
	game.start();
}

