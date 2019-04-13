"use strict";


class TweenDemo extends Game {

	// initialization
	constructor(canvas) {
		super("Lab One Game", 800, 600, canvas);
		this.lights = new LightSystem();
		this.stars = new LightSystem();
		this.emitters = new ParticleEmitterSystem();
		this.tweenJuggler = new TweenJuggler();
		// These are the objects within the game.
		this.pumpkin = new PumpkinHead("Pumpkin Head", 0, 0);
		this.pumpkin = new PumpkinHead("Pumpkin Head", 0, 0);
        this.addChild(this.pumpkin);
        this.water = new WaterBody(canvas, window.innerWidth, window.innerHeight/2, 75, this);
		for(var i = 0; i < 20; i++){
			this.stars.addLight(i, new Tuple(Math.random()*800, Math.random()*300), 8)
		}
		this.lights.addLight("sun", new Tuple(10, 10), 500, true);
		this.xPos = 0;
		this.yPos = 0;
	}
	
        

	update(pressedKeys, gamepads) {
		super.update(pressedKeys);
		this.pumpkin.update(pressedKeys);
		this.water.update(pressedKeys);
		this.tweenJuggler.update();
        this.emitters.update();
        
        if (pressedKeys.size() == 0){
			this.pumpkin.moveX(0);
            this.pumpkin.moveY(0);
        }



		if (pressedKeys.contains(32)) {
			var basicTween = new Tween(this.pumpkin);
			var basicTweenParams = new TweenParams(TweenParams.ROTATION, 180, 0, 2000, TweenParams.linear);
			var basic2TweenParams = new TweenParams(TweenParams.ALPHA, 1, 0.5, 1000, TweenParams.smoothStep);
			var basic3TweenParams = new TweenParams(TweenParams.SCALE_X, 1, -3, 5000, TweenParams.linear);
			var basic4TweenParams = new TweenParams(TweenParams.SCALE_Y, 1, 3, 7500, TweenParams.linear);
			var basic5TweenParams = new TweenParams(TweenParams.X, 1, 500, 2500, TweenParams.linear);
			var basic6TweenParams = new TweenParams(TweenParams.Y, 1, 200, 5000, TweenParams.smoothestStep);
			basicTween.animate(basicTweenParams);
			basicTween.animate(basic2TweenParams);
			basicTween.animate(basic3TweenParams);
			this.tweenJuggler.add(basicTween);
			basicTween.animate(basic4TweenParams);
			basicTween.animate(basic5TweenParams);
			basicTween.animate(basic6TweenParams);
                        basicTween.addEventListener('onTweenComplete', this);

		}
		// arrow keys
		if (pressedKeys.contains(37)) {
			this.pumpkin.moveX(-2);
		}
                if (pressedKeys.contains(39)) {
			this.pumpkin.moveX(2);
		}

 		if (pressedKeys.contains(38)) {
			this.pumpkin.moveY(-2);
		}
                if (pressedKeys.contains(40)) {
			this.pumpkin.moveY(2);
		}

                if (pressedKeys.contains(75)) {
			this.pumpkin.moveX(-4);
		}
                if (pressedKeys.contains(186)) {
			this.pumpkin.moveX(4);
		}

 		if (pressedKeys.contains(79)) {
			this.pumpkin.moveY(-4);
		}
                if (pressedKeys.contains(76)) {
			this.pumpkin.moveY(4);
		}

		if (pressedKeys.contains(66)) {
			var basicTween = new Tween(this.pumpkin);
			var basic6TweenParams = new TweenParams(TweenParams.X, 500, 1, 3000, TweenParams.smoothStep);
			basicTween.animate(basic6TweenParams);
			this.tweenJuggler.add(basicTween);
		}

		if (pressedKeys.contains(65)) {
			var basicTween = new Tween(this.pumpkin);
			basicTween.addEventListener('onTweenComplete', this);
			var basicTweenParams = new TweenParams(TweenParams.X, 1, 500, 3000, TweenParams.linear);
			basicTween.animate(basicTweenParams);
			this.tweenJuggler.add(basicTween);
		}

		if (pressedKeys.contains(68)) {
			var basicTween = new Tween(this.pumpkin);
			var basicTweenParams2 = new TweenParams(TweenParams.X, 500, 1, 3000, TweenParams.smoothestStep);
			basicTween.animate(basicTweenParams2);
			this.tweenJuggler.add(basicTween);
		}


		if (pressedKeys.contains(67)) {
			var basicTween = new Tween(this.pumpkin);
			var basicTweenParams = new TweenParams(TweenParams.X, 1, 500, 3000, TweenParams.smootherStep);
			basicTween.animate(basicTweenParams);
			this.tweenJuggler.add(basicTween);
		}

		if (pressedKeys.contains(69)) {
			var basicTween = new Tween(this.pumpkin);
			var basic6TweenParams = new TweenParams(TweenParams.X, 500, 1, 3000, TweenParams.accelerateSquared);
			basicTween.animate(basic6TweenParams);
			this.tweenJuggler.add(basicTween);
		}
		if (pressedKeys.contains(70)) {
			var basicTween = new Tween(this.pumpkin);
			var basic6TweenParams = new TweenParams(TweenParams.X, 500, 1, 3000, TweenParams.decellerateSquared);
			basicTween.animate(basic6TweenParams);
			this.tweenJuggler.add(basicTween);
		}

		if (pressedKeys.contains(71)) {
			var basicTween = new Tween(this.pumpkin);
			var basic6TweenParams = new TweenParams(TweenParams.X, 1, 500, 3000, TweenParams.catmullromTen);
			basicTween.animate(basic6TweenParams);
			this.tweenJuggler.add(basicTween);
		}

		if (pressedKeys.contains(72)) {
			var basicTween = new Tween(this.pumpkin);
			var basic6TweenParams = new TweenParams(TweenParams.X, 1, 500, 3000, TweenParams.catmullromNTen);
			basicTween.animate(basic6TweenParams);
			this.tweenJuggler.add(basicTween);
		}


		//if (pressedKeys.contains(73)) {
              //          var template = new ParticleTemplate("particle.png", 1.2, 200, Tuple.fromAngle(1.5*Math.PI, 0.5), new Tuple(Math.random() * -0.002 + 0.001, Math.random() * -0.002), false);
		//	this.emitters.push(new Emitter(template, new Tuple(400, 300), Math.PI/8, 1000, 2, 1000000000));
               // }
		

        if (pressedKeys.contains(74)) {
			var template = new ParticleTemplate("pumpkin_head.png", 0.1, 200, Tuple.fromAngle(0, 5), new Tuple(0,0), true);
			this.emitters.addEmitter(new Emitter(template, new Tuple(500, 300), Math.PI/4, 50, 8,1000000000));
		}

 



	}

	/*
	 * This is the draw loop.
	 * Here, visible elements will be updated on screen.
	 * Similarly to update(), draw() will run 60 times per second immediately following update.
	 */
	draw(g) {
		g.clearRect(0, 0, this.width, this.height);
    g.fillStyle = '#003';

		g.fillRect(0, 0, this.width, this.height);
		super.draw(g);
		g.translate(this.xPos, this.yPos);
		this.stars.draw(g);
		this.pumpkin.draw(g);
        this.emitters.draw(g);
		g.translate(-1 * this.xPos, -1 * this.yPos);
                this.water.draw(g);
                // Make it black
		//this.s.clearRect(0, 0, this.width, this.height);
  // darken(g,0, 0, 800, 600, '#003', 0.5);

//darken(this.s,0, 0, 800, 600, '#000', 0.5);
//ligthenGradient(g,460, 200, 120);
//ligthenGradient(g,200, 50, 80);
//ligthenGradient(g,500, 240, 50);
//ligthenGradient(g,300, 300, 80);
//ligthenGradient(g,10, 300, 200);
this.lights.draw(g);




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

// Create shadow canvas
var shadowCanvas = document.getElementById('1')
var drawingCanvas = document.getElementById('game');

if (drawingCanvas.getContext) {
	var game = new TweenDemo(drawingCanvas);
	game.start();
}

var bleh = false;

if(bleh){

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
    console.log("hello")
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


