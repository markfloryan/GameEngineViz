"use strict";

class PumpkinHead extends Sprite {

    constructor(id, posX, posY){
        super(id, "pumpkin_head.png");
        this.setX(posX);
        this.setY(posY);
    }

    /**
     * Invoked every frame, manually for now, but later automatically if this DO is in DisplayTree
     */
    update(pressedKeys, gamePads){
        super.update(pressedKeys, gamePads);
        this.setX(this.getX() + this.getVelX());
	this.setY(this.getY() + this.getVelY());
    }

    /**
     * Draws this image to the screen
     */
    draw(g){
        super.draw(g);
    }

    moveX(velocity) {
        this.setVelX(velocity);
    }
    
    moveY(velocity) {
        this.setVelY(velocity);
    }
}

