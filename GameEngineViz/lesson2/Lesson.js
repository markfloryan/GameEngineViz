"use strict";

/**
 * Main class. Instantiate or extend Game to create a new game of your own
 */
class LabOneGame extends Game{
	
	constructor(canvas){
		super("Lab One Game", 800, 600, canvas);
		this.mario = new Sprite("Mario", "Mario.png");
                this.coin1 = new Coin("Coin1"); // is the id really necessary?
                this.coin2 = new Coin("Coin2"); // is the id really necessary?
                this.coin3 = new Coin("Coin3"); // is the id really necessary?

		this.xPos = 0;
		this.yPos = 0;
                
                this.coin1.x = 1300;
                this.coin1.y = 200;
                this.coin2.x = 1500;
                this.coin2.y = 300;
                this.coin3.x = 1100;
                this.coin3.y = 500;
	}

	update(pressedKeys, gamepads){
		super.update(pressedKeys);
		this.mario.update(pressedKeys);

            // maybe move this into a mario class and have them work there? make the game invisible
            if(pressedKeys.contains(38))
                this.mario.y-=5;
            if(pressedKeys.contains(37))
                this.mario.x-=5;
            if(pressedKeys.contains(40))
                this.mario.y+=5;
            if(pressedKeys.contains(39))
                this.mario.x+=5;
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

            // camera
                this.xPos = this.mario.x - 800 / 2;
                this.yPos = this.mario.y - 600 / 2;

            if (this.xPos < 0) this.xPos = 0;
            if (this.yPos < 0) this.yPos = 0;
	}

	draw(g){
		g.clearRect(0, 0, this.width, this.height);
		super.draw(g);
		g.translate(-1*this.xPos, -1*this.yPos);
		this.mario.draw(g);
                this.coin1.draw(g);
                this.coin2.draw(g);
                this.coin3.draw(g);
		g.translate(this.xPos, this.yPos);
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

