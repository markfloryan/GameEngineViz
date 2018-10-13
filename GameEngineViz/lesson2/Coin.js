"use strict";

/**
 * Coin with events for pickup n stuff
 * File should be invisible for the purposes of the lessons
 *
 * */
class Coin extends Sprite {

    constructor(id){
        super(id, "Coin.png");
        this.eventTarget = new EventTarget();
        this.addEventListener("pickup", this.onPickup, false);
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

    // basic rectangular collision
    collidesWith(sprite) {
        if (!this.loaded || !sprite.loaded) {
            return false;
        }
        var box1 = this.getHitbox();
        var box2 = sprite.getHitbox();

        // console.log(box1.x + ", " + box1.y + ", " + box1.width + ", " + box1.height);

        return (box1.x <= (box2.x + box2.width) &&
                box2.x <= (box1.x + box1.width) &&
                box1.y <= (box2.y + box2.height) &&
                box2.y <= (box1.y + box1.height));
    }

    // event function
    onPickup(e) {
            e.detail.alpha = 0.0;
            console.log("Coin picked up!");
            e.detail.removeEventListener("pickup", e.detail.onPickup, false);
    }

    // add/removeEventListener wrappers
    // i will fix this eventually i promise
    addEventListener(type, listener, useCapture=false) {
        this.eventTarget.addEventListener(type, listener, useCapture);
    }

    removeEventListener(type, listener, useCapture=false) {
        this.eventTarget.removeEventListener(type, listener, useCapture);
    }

    dispatchEvent(type) {
        this.eventTarget.dispatchEvent(type);
    }
}

