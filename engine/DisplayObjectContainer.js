"use strict";

/**
 * A very basic display object for a javascript based gaming engine
 * 
 * */
class DisplayObjectContainer extends DisplayObject{
	
	constructor(id, filename){
		super(id, filename);

		/* List of children (type DisplayObject) */
		this.children = new ArrayList();
	}

	/* Add a child to this container */
	addChild(child){
		if(!this.children.contains(child)) this.children.add(child);
	}

	/* Remove a child */
	removeChild(child){
		this.children.remove(child);
	}

	removeAllChildren(){
		this.children.clear();
	}


	/**
	 * Invoked every frame, manually for now, but later automatically if this DO is in DisplayTree
	 */
	update(pressedKeys, gamepads){
		super.update(pressedKeys, gamepads);

		for(var i=0; i<this.children.size(); i++){
			this.children.get(i).update(pressedKeys, gamepads);
		}
	}

	/**
	 * Draws this image to the screen
	 */
	draw(g){
		super.draw(g);

		super.applyTransformations(g);
		for(var i=0; i<this.children.size(); i++){
			this.children.get(i).draw(g);
		}	
		super.reverseTransformations(g);
	}

	
}

