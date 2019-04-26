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

		this.parent = null;
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
			
			this.reverseTransformations(g);
		}
	}

	/**
	 * gets the hitbox
	 */
	getLocalHitbox(){
		return {x:-this.pivotX, y:-this.pivotY, width: this.getUnscaledWidth(), height: this.getUnscaledHeight()}
	}

	/*
	 * Gets the local transformation of this DO
	 * */
	getLocalTransform(){
		var at = new AffineTransform();
		at.translate(this.x, this.y);
		at.rotate(this.rotation*Math.PI/180);
		at.scale(this.scaleX, this.scaleY);
		at.translate(-1*this.pivotX, -1*this.pivotY);
		return at;
	}

	getGlobalTransform(){
		var at = new AffineTransform();
		if(this.parent != null){
			at = this.parent.getGlobalTransform();
			at.translate(this.parent.pivotX, this.parent.pivotY);
		}

		at.concatenate(this.getLocalTransform());
		return at;
	}

	/* Right now, this returns  */
	getGlobalHitbox(){
		var t = this.getGlobalTransform();

		var p_1 = t.transformPoint(0,0);
		var p_2 = t.transformPoint(this.getUnscaledWidth(), 0);
		var p_3 = t.transformPoint(this.getUnscaledWidth(), this.getUnscaledHeight());
		var p_4 = t.transformPoint(0, this.getUnscaledHeight());
		
		return {p1:p_1, p2:p_2, p3:p_3, p4:p_4};
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
	Our overall strategy for hit detection is to take two hitboxes and see if any of the four corners of one hitbox is inside the other hitbox.
	To figure this out, given one point and one hitbox, we cast a line segment from the point to the right well beyond the bounds of the box (100 px)
	We then figure out how many of the hitboxes sides that new line segment intersects. If that number is odd, then the point is inside. If 0 or 2, then it is outside
	Because this line segment we create from this point is horizontal, the calculations are MUCH easier.
	*/

	/* Helper func: Returns true iff horizontal line segment at y height with xMin, xMax as bounds intersects the line segment between points p1 and p2 */
	horLineIntersects(y, xMin, xMax, p1, p2){
		/*.if y range doesn't match, just say no */
		if(!(y>=Math.min(p1.y,p2.y) && y<=Math.max(p1.y,p2.y))) return false; 

		//Check special case where p1 and p2 make vertical line
		if(p1.x == p2.x) return p1.x >= xMin && p1.x <= xMax;

		//find formula of the line
		var m = (p2.y - p1.y) / (p2.x - p1.x);
		var b = p1.y - (m * p1.x);

		//find where this line segment has a y-value of exactly y (param)
		var lineX = (y - b) / m;

		return lineX >= xMin && lineX <= xMax;
	}

	/*.Given one other point, return true iff that point (in global space) is inside this object's global hitbox*/
	isInsideHitbox(p){
		var hb = this.getGlobalHitbox();

		//Get an x-coordinate well past the right edge of the hitbox
		var xMax = 100+Math.max(hb.p1.x, hb.p2.x, hb.p3.x, hb.p4.x);

		/* Our line segment is horizontal from p. So p and xMax,p.y */
		/*.For each edge of hb, see if this hor line intersects it */
		var count = 0;
		if(this.horLineIntersects(p.y, p.x, xMax, hb.p1, hb.p2)) count++;
		if(this.horLineIntersects(p.y, p.x, xMax, hb.p2, hb.p3)) count++;
		if(this.horLineIntersects(p.y, p.x, xMax, hb.p3, hb.p4)) count++;
		if(this.horLineIntersects(p.y, p.x, xMax, hb.p4, hb.p1)) count++;
 
 		/*.return true if odd (i.e., point started inside and crossed once to exit rectangle) */
		return (count%2) == 1;
	}

	/*.Finally, the collides with method. Just check if each corner is inside the other rectangle */
	collidesWith(other){
		var hb1 = this.getGlobalHitbox();
		var hb2 = other.getGlobalHitbox();

		if(this.isInsideHitbox(hb2.p1)) return true;
		if(this.isInsideHitbox(hb2.p2)) return true;
		if(this.isInsideHitbox(hb2.p3)) return true;
		if(this.isInsideHitbox(hb2.p4)) return true;

		if(other.isInsideHitbox(hb1.p1)) return true;
		if(other.isInsideHitbox(hb1.p2)) return true;
		if(other.isInsideHitbox(hb1.p3)) return true;
		if(other.isInsideHitbox(hb1.p4)) return true;

		return false;

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