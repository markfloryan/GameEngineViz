"use strict";

/**
 * A very basic display object for a javascript based gaming engine
 * 
 * */
class DisplayObject{
	
	constructor(id, filename){
		/*ID for this image and whether or not it has been loaded*/
		this.id = id; //string
		this.loaded = false; //bool
		this.loadImage(filename);

		/* Other fields determining how to draw this image */
		this.x = 0;
		this.y = 0;
		this.pivotX = 0.0;
		this.pivotY = 0.0;
		this.scaleX = 1.0;
		this.scaleY = 1.0;
		this.rotation = 0.0;
		this.alpha = 1.0;
	}

	/**
	 * Loads the image, sets a flag called 'loaded' when the image is ready to be drawn
	 */
	loadImage(filename){
		if(filename != null){
			var t = this;
			this.displayImage = new Image();
	  		this.displayImage.onload = function(){
	  			t.loaded = true;
	  		};
	  		this.displayImage.src = 'resources/' + filename;
  		}
  		return this.displayImage;
	}

	/**
	 * Invoked every frame, manually for now, but later automatically if this DO is in DisplayTree
	 */
	update(pressedKeys, gamepads){
		
	}

	/**
	 * Draws this image to the screen
	 */
	draw(g){
		if(this.displayImage){
			this.applyTransformations(g);
			g.translate(-this.pivotX, -this.pivotY);
			if(this.loaded) g.drawImage(this.displayImage,0,0);
			g.translate(this.pivotX, this.pivotY);
			g.fillRect(-5,-5,10,10);
			var hb = this.getLocalHitbox();
			g.strokeRect(hb.x, hb.y, hb.width, hb.height);
			this.reverseTransformations(g);
		}
	}

	/**
	 * gets the hitbox
	 */
	getLocalHitbox(){
		return {x:-this.pivotX, y:-this.pivotY, width: this.getUnscaledWidth(), height: this.getUnscaledHeight()}
	}
        
        getHitbox() {
		return {x:this.x-this.pivotX, y:this.y-this.pivotY, width: this.getUnscaledWidth(), height: this.getUnscaledHeight()}
        }

	/**
	 * Applies transformations for this display object to the given graphics
	 * object
	 * */
	applyTransformations(g) {
		/* Translate, rotate, and then scale the graphics object */
		g.translate(this.x, this.y);
		g.rotate(this.rotation*Math.PI/180);
		g.scale(this.scaleX, this.scaleY);

		/* Alpha */
		/* Make sure alpha is strictly between 0 and 1 */
		if(this.alpha < 0.0) this.alpha = 0.0;
		if(this.alpha > 1.0) this.alpha = 1.0;
		this.oldAlpha = g.globalAlpha;
		g.globalAlpha *= this.alpha;
	}

	/**
	 * Reverses transformations for this display object to the given graphics
	 * object
	 * */
	reverseTransformations(g) {
		/* Reverse alpha */
		g.globalAlpha = this.oldAlpha;

		/* Undo those transformations */
		g.scale(1/this.scaleX, 1/this.scaleY);
		g.rotate(-(this.rotation*Math.PI/180));
		g.translate(-this.x, -this.y);

	}

	/**
	 * THIS AREA CONTAINS MOSTLY GETTERS AND SETTERS!
	 *
	 */

	setId(id){this.id = id;}
	getId(){return this.id;}

	setImage(image){this.displayImage = image;} //image needs to already be loaded!
	getImage(){return this.displayImage;}

	getUnscaledHeight(){return this.displayImage.height;}
	getUnscaledWidth(){return this.displayImage.width;}
}
