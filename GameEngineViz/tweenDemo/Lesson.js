"use strict";

class TweenDemo extends Game {

	// initialization
	constructor(canvas) {
		super("Lab One Game", 800, 600, canvas);

		this.tweenJuggler = new TweenJuggler();
		// These are the objects within the game.
		this.pumpkin = new PumpkinHead("Pumpkin Head", 0, 0);
		this.pumpkin = new PumpkinHead("Pumpkin Head", 0, 0);


		this.xPos = 0;
		this.yPos = 0;
                //this.particles = [];
 
// Add one emitter located at `{ x : 100, y : 230}` from the origin (top left)
// that emits at a velocity of `2` shooting out from the right (angle `0`)
                this.emitters = [];

	}
	
        

	update(pressedKeys, gamepads) {
		super.update(pressedKeys);
		this.pumpkin.update(pressedKeys);
		this.tweenJuggler.update();
		// for each emitter
		for (var i = 0; i < this.emitters.length; i++) {
                    this.emitters[i].addNewParticles();
                    this.emitters[i].plotParticles(800, 600);
                } 





		if (pressedKeys.contains(32)) {
			var basicTween = new Tween(this.pumpkin);
			var basicTweenParams = new TweenParams(TweenableParams.ROTATION, 180, 0, 2000, TweenParams.linear);
			var basic2TweenParams = new TweenParams(TweenableParams.ALPHA, 1, 0.5, 1000, TweenParams.smoothStep);
			var basic3TweenParams = new TweenParams(TweenableParams.SCALE_X, 1, -3, 5000, TweenParams.linear);
			var basic4TweenParams = new TweenParams(TweenableParams.SCALE_Y, 1, 3, 7500, TweenParams.linear);
			var basic5TweenParams = new TweenParams(TweenableParams.X, 1, 500, 2500, TweenParams.linear);
			var basic6TweenParams = new TweenParams(TweenableParams.Y, 1, 200, 5000, TweenParams.smoothestStep);
			basicTween.animate(basicTweenParams);
			basicTween.animate(basic2TweenParams);
			basicTween.animate(basic3TweenParams);
			this.tweenJuggler.add(basicTween);
			basicTween.animate(basic4TweenParams);
			basicTween.animate(basic5TweenParams);
			basicTween.animate(basic6TweenParams);
                        basicTween.addEventListener('onTweenComplete', this);

		}


		if (pressedKeys.contains(66)) {
			var basicTween = new Tween(this.pumpkin);
			var basic6TweenParams = new TweenParams(TweenableParams.X, 500, 1, 3000, TweenParams.smoothStep);
			basicTween.animate(basic6TweenParams);
			this.tweenJuggler.add(basicTween);
		}

		if (pressedKeys.contains(65)) {
			var basicTween = new Tween(this.pumpkin);
			basicTween.addEventListener('onTweenComplete', this);
			var basicTweenParams = new TweenParams(TweenableParams.X, 1, 500, 3000, TweenParams.linear);
			basicTween.animate(basicTweenParams);
			this.tweenJuggler.add(basicTween);
		}

		if (pressedKeys.contains(68)) {
			var basicTween = new Tween(this.pumpkin);
			var basicTweenParams2 = new TweenParams(TweenableParams.X, 500, 1, 3000, TweenParams.smoothestStep);
			basicTween.animate(basicTweenParams2);
			this.tweenJuggler.add(basicTween);
		}


		if (pressedKeys.contains(67)) {
			var basicTween = new Tween(this.pumpkin);
			var basicTweenParams = new TweenParams(TweenableParams.X, 1, 500, 3000, TweenParams.smootherStep);
			basicTween.animate(basicTweenParams);
			this.tweenJuggler.add(basicTween);
		}

		if (pressedKeys.contains(69)) {
			var basicTween = new Tween(this.pumpkin);
			var basic6TweenParams = new TweenParams(TweenableParams.X, 500, 1, 3000, TweenParams.accelerateSquared);
			basicTween.animate(basic6TweenParams);
			this.tweenJuggler.add(basicTween);
		}
		if (pressedKeys.contains(70)) {
			var basicTween = new Tween(this.pumpkin);
			var basic6TweenParams = new TweenParams(TweenableParams.X, 500, 1, 3000, TweenParams.decellerateSquared);
			basicTween.animate(basic6TweenParams);
			this.tweenJuggler.add(basicTween);
		}

		if (pressedKeys.contains(71)) {
			var basicTween = new Tween(this.pumpkin);
			var basic6TweenParams = new TweenParams(TweenableParams.X, 1, 500, 3000, TweenParams.catmullromTen);
			basicTween.animate(basic6TweenParams);
			this.tweenJuggler.add(basicTween);
		}

		if (pressedKeys.contains(72)) {
			var basicTween = new Tween(this.pumpkin);
			var basic6TweenParams = new TweenParams(TweenableParams.X, 1, 500, 3000, TweenParams.catmullromNTen);
			basicTween.animate(basic6TweenParams);
			this.tweenJuggler.add(basicTween);
		}

		if (pressedKeys.contains(73)) {
			this.emitters.push(new Emitter(new Tuple(400, 300), Tuple.fromAngle(1.5*Math.PI, 0.5), Math.PI/8, 5000, 2))
		}



	}

	/*
	 * This is the draw loop.
	 * Here, visible elements will be updated on screen.
	 * Similarly to update(), draw() will run 60 times per second immediately following update.
	 */
	draw(g) {
		g.clearRect(0, 0, this.width, this.height);
               // drawParticles(this.particles, this.canvas);
		super.draw(g);
		g.translate(this.xPos, this.yPos);
		this.pumpkin.draw(g);
                for (var i = 0; i < this.emitters.length; i++) {
                    this.emitters[i].drawParticles(g);
                } 
		g.translate(-1 * this.xPos, -1 * this.yPos);
	}


        handleEvent(event) {
		if(event == "onTweenComplete"){
		       console.log("Removing tween");
                       var basicTween = new Tween(this.pumpkin);
		       var basic6TweenParams = new TweenParams(TweenableParams.ALPHA, 1, 0.5, 1000, TweenParams.smoothStep);
		       basicTween.animate(basic6TweenParams);
                       this.tweenJuggler.add(basicTween);

                }
		
	}
}


/**
 * THIS IS THE BEGINNING OF THE PROGRAM
 * YOU NEED TO COPY THIS VERBATIM ANYTIME YOU CREATE A GAME
 */
function tick() {
	game.nextFrame();
}

var drawingCanvas = document.getElementById('game');
if (drawingCanvas.getContext) {
	var game = new TweenDemo(drawingCanvas);
	game.start();
}
