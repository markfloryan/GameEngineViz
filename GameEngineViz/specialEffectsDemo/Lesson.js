"use strict";

class SpecialEffectsDemo extends Game {

	// initialization
	constructor(canvas) {
		super("Special Effects Demo", 800, 600, canvas);
		this.lights = new LightSystem();
		this.stars = new LightSystem();
		this.emitters = new ParticleEmitterSystem();
		this.tweenJuggler = new TweenJuggler();
		// These are the objects within the game.
		
		// Coral Sprites
		this.coral = new Sprite('coral', "Coral.png");
		this.coral.scaleX = 0.4;
		this.coral.scaleY = 0.4;
		this.coral.setY(400);
		this.coral.setX(400);
		this.addChild(this.coral);
		this.coral2 = new Sprite('coral', "Coral2.png");
		this.coral2.scaleX = 0.75;
		this.coral2.scaleY = 0.75;
		this.coral2.setY(450);
		this.addChild(this.coral2);
		this.coral3 = new Sprite('coral', "Coral3.png");
		this.coral3.scaleX = 0.75;
		this.coral3.scaleY = 0.75;
		this.coral3.setX(200);
		this.coral3.setY(500);
		this.addChild(this.coral3);
		
		// Fish character
		this.fish = new Fish("Fish", 0, 400);
		this.fish.scaleY = 0.25;
		this.fish.scaleX = 0.25;
		this.addChild(this.fish);
		
		// Coins
		this.coins = new ArrayList();
		this.coins.push(new Coin("Coin1", 300, 500));
		this.coins.push(new Coin("Coin2", 500, 350));
		this.coins.push(new Coin("Coin3", 700, 425));
		this.coins.push(new Coin("Coin3", 450, 200));
		for (var i = 0; i < this.coins.size(); i++){
			this.coins.get(i).scaleX = 0.5;
			this.coins.get(i).scaleY = 0.5;
			this.addChild(this.coins.get(i));
		}
		
		// Ocean
        this.water = new WaterBody(canvas, window.innerWidth, window.innerHeight/2, 75, this);
        
        // Stars
		for(var i = 0; i < 20; i++){
			this.stars.addLight(i, new Tuple(Math.random()*800, Math.random()*300), 8)
		}
		
		// Winning lights
		this.lights.addLight("0", new Tuple(325, 525), 50, true);
		this.lights.addLight("1", new Tuple(525, 375), 50, true);
		this.lights.addLight("2", new Tuple(725, 450), 50, true);
		this.lights.addLight("3", new Tuple(475, 225), 50, true);
		this.xPos = 0;
		this.yPos = 0;
		
		// Are all the coins collected?
		this.isDone = false;
	}
	
        

	update(pressedKeys, gamepads) {
		super.update(pressedKeys);
		this.fish.update(pressedKeys);
		this.water.update(pressedKeys);
		this.tweenJuggler.update();
        this.emitters.update();
        
        // Check coin collision and win condition
        if(!this.isDone){
			var done = true
			for (var i = 0; i < this.coins.size(); i++){
				// If coin colliding with fish, remove coin and release bubbles
				if(this.coins.get(i).collidesWith(this.fish)) {
					if(this.coins.get(i).alpha != 0.0) {
						var template = new ParticleTemplate("Bubble.png", 1.2, 100, Tuple.fromAngle(1.5*Math.PI, 1), new Tuple(Math.random() * -0.01 + 0.005, Math.random() * 0.02), false, 10);
						this.emitters.addEmitter(new Emitter(template, new Tuple(this.coins.get(i).getX(), this.coins.get(i).getY()), Math.PI/8, 10, 1, 100, 0, 800, 300, 600));
						this.lights.remove(this.lights.remove(this.lights.getLight(i)));
						this.coins.get(i).dispatchEvent(new CustomEvent("pickup", {detail: this.coins.get(i)}));
					}
				}
				// Are they are clear?
				done = done && (this.coins.get(i).alpha == 0.0);	
			}
			
			// Win condition
			if(done){
				this.isDone = true;
				this.lights.addLight("win1", new Tuple(800, 600), 300, true);
				this.lights.addLight("win2", new Tuple(400, 600), 300, true);
				this.lights.addLight("win3", new Tuple(0, 600), 300, true);
				var template = new ParticleTemplate("Bubble.png", 1.2, 300, Tuple.fromAngle(1.5* Math.PI, 2), new Tuple(Math.random() * -0.1 + 0.05, Math.random() * 0.01), false, 10);
				this.emitters.addEmitter(new Emitter(template, new Tuple(600, 600), Math.PI/2, 30, 1, 10000, 0, 800, 300, 600));
				this.emitters.addEmitter(new Emitter(template, new Tuple(200, 600), Math.PI/2, 30, 1, 10000, 0, 800, 300, 600));
			}
		}
		
        
        if (pressedKeys.size() == 0){
			this.fish.moveX(0);
            this.fish.moveY(0);
        }


		// a bunch of tweens at once with event listener (spacebar)
		if (pressedKeys.contains(32)) {
			var basicTween = new Tween(this.fish);
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
		// move left slow (left arrow)
		if (pressedKeys.contains(37)) {
			this.fish.moveX(-2);
		}
		// move right slow (right arrow)
                if (pressedKeys.contains(39)) {
			this.fish.moveX(2);
		}
		// move up slow (up arrow)
 		if (pressedKeys.contains(38)) {
			this.fish.moveY(-2);
		}
		// move down slow (down arrow)
                if (pressedKeys.contains(40)) {
			this.fish.moveY(2);
		}
		// move left fast (k)
                if (pressedKeys.contains(75)) {
			this.fish.moveX(-4);
		}
		// move right fast (;)
                if (pressedKeys.contains(186)) {
			this.fish.moveX(4);
		}
		// move up fast (o)
 		if (pressedKeys.contains(79)) {
			this.fish.moveY(-4);
		}
		// move down fast (l)
                if (pressedKeys.contains(76)) {
			this.fish.moveY(4);
		}

		// linear X tween example with onTweenComplete event listener (a)
		if (pressedKeys.contains(65)) {
			var basicTween = new Tween(this.fish);
			basicTween.addEventListener('onTweenComplete', this);
			var basicTweenParams = new TweenParams(TweenParams.X, 1, 500, 3000, TweenParams.linear);
			basicTween.animate(basicTweenParams);
			this.tweenJuggler.add(basicTween);
		}

		// smoothStep X tween (b)
		if (pressedKeys.contains(66)) {
			var basicTween = new Tween(this.fish);
			var basic6TweenParams = new TweenParams(TweenParams.X, 500, 1, 3000, TweenParams.smoothStep);
			basicTween.animate(basic6TweenParams);
			this.tweenJuggler.add(basicTween);
		}

		// smootherStep X tween (c)
		if (pressedKeys.contains(67)) {
			var basicTween = new Tween(this.fish);
			var basicTweenParams = new TweenParams(TweenParams.X, 1, 500, 3000, TweenParams.smootherStep);
			basicTween.animate(basicTweenParams);
			this.tweenJuggler.add(basicTween);
		}


		// smoothestStep X tween (d)
		if (pressedKeys.contains(68)) {
			var basicTween = new Tween(this.fish);
			var basicTweenParams2 = new TweenParams(TweenParams.X, 500, 1, 3000, TweenParams.smoothestStep);
			basicTween.animate(basicTweenParams2);
			this.tweenJuggler.add(basicTween);
		}

		// accelerateSquared X tween (e)
		if (pressedKeys.contains(69)) {
			var basicTween = new Tween(this.fish);
			var basic6TweenParams = new TweenParams(TweenParams.X, 500, 1, 3000, TweenParams.accelerateSquared);
			basicTween.animate(basic6TweenParams);
			this.tweenJuggler.add(basicTween);
		}
		
		// decellerateSquared X tween (f)
		if (pressedKeys.contains(70)) {
			var basicTween = new Tween(this.fish);
			var basic6TweenParams = new TweenParams(TweenParams.X, 500, 1, 3000, TweenParams.decellerateSquared);
			basicTween.animate(basic6TweenParams);
			this.tweenJuggler.add(basicTween);
		}

		// catmullromTen X tween (g)
		if (pressedKeys.contains(71)) {
			var basicTween = new Tween(this.fish);
			var basic6TweenParams = new TweenParams(TweenParams.X, 1, 500, 3000, TweenParams.catmullromTen);
			basicTween.animate(basic6TweenParams);
			this.tweenJuggler.add(basicTween);
		}

		// catmullromNTen X tween (h)
		if (pressedKeys.contains(72)) {
			var basicTween = new Tween(this.fish);
			var basic6TweenParams = new TweenParams(TweenParams.X, 1, 500, 3000, TweenParams.catmullromNTen);
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
			this.emitters.addEmitter(new Emitter(template, new Tuple(400, 300), Math.PI/8, 1000, 2, 1000000000));
         } 
	
		// silly pulsing spray of fish heads (j)
        if (pressedKeys.contains(74)) {
			var template = new ParticleTemplate("fish.png", 0.1, 200, Tuple.fromAngle(0, 5), new Tuple(0,0), true);
			this.emitters.addEmitter(new Emitter(template, new Tuple(500, 300), Math.PI/4, 50, 8,1000000000));
		}

	}

	/*
	 * This is the draw loop.
	 * Here, visible elements will be updated on screen.
	 * Similarly to update(), draw() will run 60 times per second immediately following update.
	 */
	draw(g) {
		// Draw night sky color
		g.clearRect(0, 0, this.width, this.height);
		g.fillStyle = '#003';
		g.fillRect(0, 0, this.width, this.height);
		
		super.draw(g);
		g.translate(this.xPos, this.yPos);
		
		// Draw things in order from background to foreground
		this.stars.draw(g);
		var lessonSprites = this.children;
		// Make sure you add to lessonSprites in the order you want them to be drawn
		for (var i = 0; i < lessonSprites.size(); i++){
			lessonSprites.get(i).draw(g);
		}
        this.emitters.draw(g);
		g.translate(-1 * this.xPos, -1 * this.yPos);
        this.water.draw(g);
		this.lights.draw(g);
	}


	// event handler
    handleEvent(event) {
		if(event == "onTweenComplete"){
		    // test handle
		    console.log("Removing tween");
            var basicTween = new Tween(this.fish);
	        var basic6TweenParams = new TweenParams(TweenParams.ALPHA, 1, 0.5, 1000, TweenParams.smoothStep);
		    basicTween.animate(basic6TweenParams);
            this.tweenJuggler.add(basicTween);
        }	
	}
}

// Creates a cool flashlight effect with mouseover

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

var drawingCanvas = document.getElementById('game');

if (drawingCanvas.getContext) {
	var game = new SpecialEffectsDemo(drawingCanvas);
	game.start();
}




