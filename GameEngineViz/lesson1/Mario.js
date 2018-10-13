"use strict";

class Mario extends Sprite {

    constructor(id, posX, posY){
        super(id, "Mario.png");
        this.setX(posX);
        this.setY(posY);
    }

    /**
     * Invoked every frame, manually for now, but later automatically if this DO is in DisplayTree
     */
    update(pressedKeys, gamePads){
        super.update(pressedKeys, gamePads);
    }

    /**
     * Draws this image to the screen
     */
    draw(g){
        super.draw(g);
    }

    moveX(distance) {
        this.setX(this.getX() + distance);
    }
    
    moveY(distance) {
        this.setY(this.getY() + distance);
        }
}

