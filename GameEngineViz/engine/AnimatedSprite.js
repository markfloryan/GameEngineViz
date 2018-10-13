"use strict";

/**
 * A very basic Sprite. For now, does not do anything.
 * 
 * */
class AnimatedSprite extends Sprite{
	
	constructor(id, baseFilename, numImages){
		super(id, null);

		/* The different animations, stores object of the form {name, startIndex, endIndex, looping} */
		this.animations = [];
		this.images = []; //list of images that can be used
		this.curAnimation; //name of currently playing animation
		this.playing = false;
		this.animationSpeed = 80; //speed in milliseconds per animation frame
		this.clock = new GameClock();

		/* load up all the images */
		for(var i=0; i< numImages; i++){
			this.images.push(super.loadImage(baseFilename + "_" + i + ".png"));
		}
		
		/* Always make a default, first frame, animation */
		this.addAnimation("DEFAULT", 0, 0);
		this.playAnimation("DEFAULT"); 
	}

	/**
     * Adds an animation.
	 */
	addAnimation(name, startIndex, endIndex, looping){
		this.animations.push({name: name, start: startIndex, end: endIndex, looping: looping});
	}
	getAnimation(name){
		for(var i = 0; i<this.animations.length; i++){
			if(this.animations[i].name == name) return this.animations[i];
		}
		return null;
	}

	playAnimation(name){
		if(this.curAnimation && this.curAnimation.name == name) return;
		
		this.curAnimation = this.getAnimation(name);
		if(this.curAnimation){
			this.playing = true;
			this.clock.resetGameClock();
			super.setImage(this.images[this.curAnimation.start]);
			this.curFrame = this.curAnimation.start;
		}
	}
	
	goToFrame(frameNumber){
		super.setImage(this.images[frameNumber]);
	}

	/**
	 * Invoked every frame, manually for now, but later automatically if this DO is in DisplayTree
	 */
	update(pressedKeys, gamePads){
		super.update(pressedKeys, gamePads);

		if(this.playing){
			if(this.clock.getElapsedTime() > this.animationSpeed){
				this.curFrame = this.curFrame + 1;
				if(this.curFrame > this.curAnimation.end){
					if(this.curAnimation.looping) this.curFrame = this.curAnimation.start;
					else this.curFrame = this.curAnimation.end;
				}

				this.goToFrame(this.curFrame);
				this.clock.resetGameClock();
			}
		}
	}

	/**
	 * Draws this image to the screen
	 */
	draw(g){
		super.draw(g);
	}
}

