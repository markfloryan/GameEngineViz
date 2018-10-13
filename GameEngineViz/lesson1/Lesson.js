"use strict";

/**
 * Main class. Instantiate or extend Game to create a new game of your own
 */
class LabOneGame extends Game{

    // initialization
    constructor(canvas){
        super("Lab One Game", 800, 600, canvas);


	this.tweenJuggler = new TweenJuggler();
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
        this.tweenJuggler.update();

if(pressedKeys.contains(39)){
            var basicTween = new Tween(this.mario);
            var basicTweenParams = new TweenParams(TweenableParams.ROTATION,180,0, 2000, linear);
            var basic2TweenParams = new TweenParams(TweenableParams.ALPHA,1,0.5, 1000, smoothStep);
            var basic3TweenParams = new TweenParams(TweenableParams.SCALE_X,1,-3, 5000, linear);
            var basic4TweenParams = new TweenParams(TweenableParams.SCALE_Y,1,3, 7500, linear);
            var basic5TweenParams = new TweenParams(TweenableParams.X,1,500, 2500, linear);
            var basic6TweenParams = new TweenParams(TweenableParams.Y,1,200, 5000, smoothestStep);
            basicTween.animate(basicTweenParams);
            basicTween.animate(basic2TweenParams);
            basicTween.animate(basic3TweenParams);
            this.tweenJuggler.add(basicTween);
            basicTween.animate(basic4TweenParams);
            basicTween.animate(basic5TweenParams);
            basicTween.animate(basic6TweenParams);

        }


        if(pressedKeys.contains(38)){
            var basicTween = new Tween(this.mario);
            var basic6TweenParams = new TweenParams(TweenableParams.X,500,1, 3000, smoothStep);
            basicTween.animate(basic6TweenParams);
            this.tweenJuggler.add(basicTween);
        }
 
        if(pressedKeys.contains(37)){
            var basicTween = new Tween(this.mario);
            var basicTweenParams = new TweenParams(TweenableParams.X,1,500, 3000, linear);
            basicTween.animate(basicTweenParams);
            this.tweenJuggler.add(basicTween);
        }
        
        if(pressedKeys.contains(40)){
            var basicTween = new Tween(this.mario);
            var basicTweenParams2 = new TweenParams(TweenableParams.X,500,1, 3000, smoothestStep);
            basicTween.animate(basicTweenParams2);
            this.tweenJuggler.add(basicTween);
        }


        // Insert code here!
        if(pressedKeys.contains(32)){
            var basicTween = new Tween(this.mario);
            var basicTweenParams = new TweenParams(TweenableParams.X,1,500, 3000, smootherStep);
            basicTween.animate(basicTweenParams);
            this.tweenJuggler.add(basicTween);
        }

        if(pressedKeys.contains(65)){
            var basicTween = new Tween(this.mario);
            var basic6TweenParams = new TweenParams(TweenableParams.X,500,1, 3000, accelerateSquared);
            basicTween.animate(basic6TweenParams);
            this.tweenJuggler.add(basicTween);
        }
        if(pressedKeys.contains(66)){
            var basicTween = new Tween(this.mario);
            var basic6TweenParams = new TweenParams(TweenableParams.X,500,1, 3000, decellerateSquared);
            basicTween.animate(basic6TweenParams);
            this.tweenJuggler.add(basicTween);
        }

        if(pressedKeys.contains(67)){
            var basicTween = new Tween(this.mario);
            var basic6TweenParams = new TweenParams(TweenableParams.X,1,500, 3000, catmullromTen);
            basicTween.animate(basic6TweenParams);
            this.tweenJuggler.add(basicTween);
        }

       if(pressedKeys.contains(68)){
            var basicTween = new Tween(this.mario);
            var basic6TweenParams = new TweenParams(TweenableParams.X,1,500, 3000, catmullromNTen);
            basicTween.animate(basic6TweenParams);
            this.tweenJuggler.add(basicTween);
        }

        
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

