"use strict";

/**
 * Main class. Instantiate or extend Game to create a new game of your own
 */
class LabOneGame extends Game{

    // initialization
    constructor(canvas){
        super("Lab One Game", 800, 600, canvas);

        // These are the objects within the game.
        this.mario = new Mario("Mario", 0, 0);
        this.coin1 = new Coin("Coin1", 300, 200); 
        this.coin2 = new Coin("Coin2", 500, 300); 
        this.coin3 = new Coin("Coin3", 100, 300); 

        this.xPos = 0;
        this.yPos = 0;

    }

    /*
     * This is the update loop. 
     * Here, game state will be updated according to user input and game mechanics.
     * The code within this function will run 60 times per second.
     */
    update(pressedKeys, gamepads){
        super.update(pressedKeys);
        this.mario.update(pressedKeys);

        // Insert code here!
        if(pressedKeys.contains(32))
            console.log("Hello, world!");

        
        // collision detection
        if(this.coin1.loaded && this.coin1.collidesWith(this.mario)) {
            this.coin1.dispatchEvent(new CustomEvent("pickup", {detail: this.coin1}));
        }
        if(this.coin2.collidesWith(this.mario)) {
            this.coin2.dispatchEvent(new CustomEvent("pickup", {detail: this.coin2}));
        }
        if(this.coin3.collidesWith(this.mario)) {
            this.coin3.dispatchEvent(new CustomEvent("pickup", {detail: this.coin3}));
        }

        // Win condition - fulfill these requirements to complete the challenge!
        // this should be hidden... 
        if (
            (this.coin1.alpha == 0.0) && 
            (this.coin2.alpha == 0.0) && 
            (this.coin3.alpha == 0.0)
        ) {
            // TODO: obfuscate this such that students can't run this
            var complete = new Event("complete");
            window.parent.document.dispatchEvent(complete);
        }
    }

    /*
     * This is the draw loop.
     * Here, visible elements will be updated on screen.
     * Similarly to update(), draw() will run 60 times per second immediately following update.
     */
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

var drawingCanvas = document.getElementById('game');
if(drawingCanvas.getContext) {
    var game = new LabOneGame(drawingCanvas);
    game.start();
}

