"use strict";

class SpecialEffectsDemo extends Game {

	// initialization
	constructor(canvas, shadowCanvas) {
		super("Special Effects Demo", 800, 600, canvas);
		// each game will have ONE tweenJuggler
		this.tweenJuggler = new TweenJuggler();
		// These are the objects within the game.
		this.pumpkin = new PumpkinHead("Pumpkin Head", 0, 0);
                this.addChild(this.pumpkin);
		// instantiating body of water
                this.water = new WaterBody(canvas, window.innerWidth, window.innerHeight/2, 75, this);
                this.s = shadowCanvas.getContext('2d');
		// some random coordinates pretty stars in the background
		this.valsX = [];
                this.valsY = [];
		for(var i = 0; i < 20; i++){

		this.valsX.push(Math.random()*800);
		this.valsY.push(Math.random()*300);
		}
		this.xPos = 0;
		this.yPos = 0;
		// declare empty array of particle emitters. ONE array per game
                this.emitters = [];
	}
	
        

	update(pressedKeys, gamepads) {
		super.update(pressedKeys);
		this.pumpkin.update(pressedKeys);
		// need to update water!
		this.water.update(pressedKeys);
		// need to update tweenJuggler!
		this.tweenJuggler.update();
		// updating the array of emitters. Could probably make something 
		// like tweenJuggler in the future to help abstract this away from the lesson
                var tempEmitters = [];
		// for each emitter, only add the ones that aren't dead
		for (var i = 0; i < this.emitters.length; i++) {
                    this.emitters[i].addNewParticles();
		    if(!this.emitters[i].isDead){
                        tempEmitters.push(this.emitters[i]);
                    }

                } 
                this.emitters = tempEmitters;

                if (pressedKeys.size() == 0){
                	this.pumpkin.moveX(0);
                        this.pumpkin.moveY(0);
                }

		// arrow keys
		// move left slow (left arrow)
		if (pressedKeys.contains(37)) {
			this.pumpkin.moveX(-2);
		}
		// move right slow (right arrow)
                if (pressedKeys.contains(39)) {
			this.pumpkin.moveX(2);
		}
		// move up slow (up arrow)
 		if (pressedKeys.contains(38)) {
			this.pumpkin.moveY(-2);
		}
		// move down slow (down arrow)
                if (pressedKeys.contains(40)) {
			this.pumpkin.moveY(2);
		}
		// move left fast (k)
                if (pressedKeys.contains(75)) {
			this.pumpkin.moveX(-4);
		}
		// move right fast (;)
                if (pressedKeys.contains(186)) {
			this.pumpkin.moveX(4);
		}
		// move up fast (o)
 		if (pressedKeys.contains(79)) {
			this.pumpkin.moveY(-4);
		}
		// move down fast (l)
                if (pressedKeys.contains(76)) {
			this.pumpkin.moveY(4);
		}

		// linear X tween example with onTweenComplete event listener (a)
		if (pressedKeys.contains(65)) {
			var basicTween = new Tween(this.pumpkin);
			basicTween.addEventListener('onTweenComplete', this);
			var basicTweenParams = new TweenParams(TweenableParams.X, 1, 500, 3000, TweenParams.linear);
			basicTween.animate(basicTweenParams);
			this.tweenJuggler.add(basicTween);
		}

		// smoothStep X tween (b)
		if (pressedKeys.contains(66)) {
			var basicTween = new Tween(this.pumpkin);
			var basic6TweenParams = new TweenParams(TweenableParams.X, 500, 1, 3000, TweenParams.smoothStep);
			basicTween.animate(basic6TweenParams);
			this.tweenJuggler.add(basicTween);
		}

		// smootherStep X tween (c)
		if (pressedKeys.contains(67)) {
			var basicTween = new Tween(this.pumpkin);
			var basicTweenParams = new TweenParams(TweenableParams.X, 1, 500, 3000, TweenParams.smootherStep);
			basicTween.animate(basicTweenParams);
			this.tweenJuggler.add(basicTween);
		}


		// smoothestStep X tween (d)
		if (pressedKeys.contains(68)) {
			var basicTween = new Tween(this.pumpkin);
			var basicTweenParams2 = new TweenParams(TweenableParams.X, 500, 1, 3000, TweenParams.smoothestStep);
			basicTween.animate(basicTweenParams2);
			this.tweenJuggler.add(basicTween);
		}

		// accelerateSquared X tween (e)
		if (pressedKeys.contains(69)) {
			var basicTween = new Tween(this.pumpkin);
			var basic6TweenParams = new TweenParams(TweenableParams.X, 500, 1, 3000, TweenParams.accelerateSquared);
			basicTween.animate(basic6TweenParams);
			this.tweenJuggler.add(basicTween);
		}
		
		// decellerateSquared X tween (f)
		if (pressedKeys.contains(70)) {
			var basicTween = new Tween(this.pumpkin);
			var basic6TweenParams = new TweenParams(TweenableParams.X, 500, 1, 3000, TweenParams.decellerateSquared);
			basicTween.animate(basic6TweenParams);
			this.tweenJuggler.add(basicTween);
		}

		// catmullromTen X tween (g)
		if (pressedKeys.contains(71)) {
			var basicTween = new Tween(this.pumpkin);
			var basic6TweenParams = new TweenParams(TweenableParams.X, 1, 500, 3000, TweenParams.catmullromTen);
			basicTween.animate(basic6TweenParams);
			this.tweenJuggler.add(basicTween);
		}

		// catmullromNTen X tween (h)
		if (pressedKeys.contains(72)) {
			var basicTween = new Tween(this.pumpkin);
			var basic6TweenParams = new TweenParams(TweenableParams.X, 1, 500, 3000, TweenParams.catmullromNTen);
			basicTween.animate(basic6TweenParams);
			this.tweenJuggler.add(basicTween);
		}

		// NOTE: if using particle effects with key presses, I would make some form of check
                // to limit the number of emitters at one time (ex. don't add key 73 to the
                // pressedKeys again until this particle emitter is dead) otherwise, the game will
                // slow down unusably (as it does now unless you quickly tap the
		// key so it registers only one press)
		
		// These two examples contain a lot of particles; too many of them will slow down the
                // game, especially with water

		// smoke particle effect example (i)
		if (pressedKeys.contains(73)) {
                        var template = new ParticleTemplate("particle.png", 1.2, 200, Tuple.fromAngle(1.5*Math.PI, 0.5), new Tuple(Math.random() * -0.002 + 0.001, Math.random() * -0.002), false);
			this.emitters.push(new Emitter(template, new Tuple(400, 300), Math.PI/8, 1000, 2, 1000000000));
                } 
	
		// silly pulsing spray of pumpkin heads (j)
                if (pressedKeys.contains(74)) {
			var template = new ParticleTemplate("pumpkin_head.png", 0.1, 200, Tuple.fromAngle(0, 5), new Tuple(0,0), true);
			this.emitters.push(new Emitter(template, new Tuple(500, 300), Math.PI/4, 50, 8,1000000000));
		}

		// a bunch of tweens at once with event listener (spacebar)
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
	}

	/*
	 * This is the draw loop.
	 * Here, visible elements will be updated on screen.
	 * Similarly to update(), draw() will run 60 times per second immediately following update.
	 */
	draw(g) {
		g.clearRect(0, 0, this.width, this.height);
		// dark blue background
  	 	g.fillStyle = '#003';
		g.fillRect(0, 0, this.width, this.height);

		super.draw(g);
		g.translate(this.xPos, this.yPos);

		// draw stars in background first, then draw the rest
		for (var i = 0; i < 20; i++){
		    ligthenGradient(g,this.valsX[i], this.valsY[i], 8)
		}

		this.pumpkin.draw(g);

		// for each emitter, draw the particles for that emitter
                for (var i = 0; i < this.emitters.length; i++) {
                    this.emitters[i].drawParticles(g);
                } 
		g.translate(-1 * this.xPos, -1 * this.yPos);

		// draw the water
                this.water.draw(g);
       
		// big light in left corner
		ligthenGradient(g,10, 10, 500);
	}


	// event handler
        handleEvent(event) {
		if(event == "onTweenComplete"){
		    // test handle
		    console.log("Removing tween");
                    var basicTween = new Tween(this.pumpkin);
	            var basic6TweenParams = new TweenParams(TweenableParams.ALPHA, 1, 0.5, 1000, TweenParams.smoothStep);
		    basicTween.animate(basic6TweenParams);
                    this.tweenJuggler.add(basicTween);
                }	
	}
}

// lighting effect functions
function darken(ctx,x, y, w, h, darkenColor, amount) {
    ctx.fillStyle = darkenColor;
    ctx.globalAlpha = amount;
    ctx.fillRect(x, y, w, h);
    ctx.globalAlpha = 1;
}
function ligthenGradient(ctx,x, y, radius) {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    var rnd = 0.05 * Math.sin(1.1 * Date.now() / 1000);
    radius = radius * (1 + rnd);
    var radialGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    radialGradient.addColorStop(0.0, '#BB9');
    radialGradient.addColorStop(0.2 + rnd, '#AA8');
    radialGradient.addColorStop(0.7 + rnd, '#330');
    radialGradient.addColorStop(0.90, '#110');
    radialGradient.addColorStop(1, '#000');
    ctx.fillStyle = radialGradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
}

var flashlight = false;

if(flashlight){

// init canvas
var     canvas = $( 'canvas' )               
  ,        ctx = canvas[1].getContext( '2d' ) // world
  ,       ctx2 = canvas[2].getContext( '2d' ) // fog

  ,      mDown = false
  ,         r1 = 100
  ,         r2 = 300
  ,    density = .4
  , hideOnMove = true
  ,   hideFill = 'rgba( 0, 0, 0, .7 )'
  ,    overlay = 'rgba( 0, 0, 0, 1 )'
  ;

// black out the canvas
ctx.fillStyle = overlay;
ctx.fillRect( 0, 0, 1280, 800 );

// set up our "eraser"
ctx.globalCompositeOperation = 'destination-out';

canvas.last()
  .on( 'mousemove', function( ev, ev2 ){
    ev2 && ( ev = ev2 );
    var pX = ev.pageX
      , pY = ev.pageY
      ;

    // reveal wherever we drag
    var radGrd = ctx.createRadialGradient( pX, pY, r1, pX, pY, r2 );
    radGrd.addColorStop(       0, 'rgba( 0, 100, 0,  1 )' );
    radGrd.addColorStop( density, 'rgba( 0, 100, 0, .1 )' );
    radGrd.addColorStop(       1, 'rgba( 0, 1000, 0,  0 )' );
    
    ctx.fillStyle = radGrd;
    ctx.fillRect( pX - r2, pY - r2, r2*2, r2*2 );

    // partially hide the entire map and re-reval where we are now
    ctx2.globalCompositeOperation = 'source-over';
    ctx2.clearRect( 0, 0, 1280, 800 );
    ctx2.fillStyle = hideFill;
    ctx2.fillRect ( 0, 0, 1280, 800 );

    var radGrd = ctx.createRadialGradient( pX, pY, r1, pX, pY, r2 );
    radGrd.addColorStop(  0, 'rgba( 0, 100, 0,  1 )' );
    radGrd.addColorStop( .8, 'rgba( 0, 100, 0, .1 )' );
    radGrd.addColorStop(  1, 'rgba( 0, 1000, 0,  0 )' );

    ctx2.globalCompositeOperation = 'destination-out';
    ctx2.fillStyle = radGrd;
       
    ctx2.fillRect( pX - r2, pY - r2, r2*2, r2*2 );
 
  })
  .trigger( 'mousemove', {pageX: 150, pageY:150 });
}

/**
 * THIS IS THE BEGINNING OF THE PROGRAM
 * YOU NEED TO COPY THIS VERBATIM ANYTIME YOU CREATE A GAME
 */
function tick() {
	game.nextFrame();
}

// Create shadow canvas
var shadowCanvas = document.getElementById('1')
var drawingCanvas = document.getElementById('game');

if (drawingCanvas.getContext) {
	var game = new SpecialEffectsDemo(drawingCanvas, shadowCanvas);
	game.start();
}




