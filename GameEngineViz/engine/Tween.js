const X = "X",
      Y = "Y",
      SCALE_X = "SCALE_X",
      SCALE_Y = "SCALE_Y",
      ALPHA = "ALPHA",
      ROTATION = "ROTATION";


function zeroToOne(start, finish, transVal){
    return (finish * transVal) + (start * (1 - transVal));
}

function smoothStepFunc(transVal){
  return ((transVal) * (transVal) * (transVal) * ((transVal) * ((transVal) * 6 - 15) + 10));
}

function catmullrom(t, p0, p1, p2, p3){
	return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t );
}

class TweenParams {
    constructor(tweenType, start, final, time, func){
        this.tweenType = tweenType;
        this.start = start;
        this.final = final;
        this.time = time;
        this.func = func;
        this.hasStarted = false;
        // maybe start this later
        this.clock = new GameClock();
    }

    setHasStarted(started){
        this.hasStarted = true;
        console.log("Animation starting: " + this.tweenType);
    }

static linear(start, finish, timeRatio){
    return zeroToOne(start, finish, timeRatio);
}

static smoothStep(start, finish, timeRatio){
  return zeroToOne(start, finish, smoothStepFunc(timeRatio));
}

static smootherStep(start, finish, timeRatio){
  return zeroToOne(start, finish, smoothStepFunc(smoothStepFunc(timeRatio)));
}

static smoothestStep(start, finish, timeRatio){
  return zeroToOne(start, finish, smoothStepFunc(smoothStepFunc(smoothStepFunc(timeRatio))));
}

static accelerateSquared(start, finish, timeRatio){
  var v = timeRatio * timeRatio;
  return zeroToOne(start, finish, v);
}

static decellerateSquared(start, finish, timeRatio){
  var v = 1 - (1 - timeRatio) * (1 - timeRatio);
  return zeroToOne(start, finish, v);
}

static catmullromTen(start, finish, timeRatio){
  var v = catmullrom(timeRatio, 0, 0, 1, 10);
  return zeroToOne(start, finish, v);
}

static catmullromNTen(start, finish, timeRatio){
  var v = catmullrom(timeRatio, 0, 0, 1, -10);
  return zeroToOne(start, finish, v);
}

static get X() {
    return X;
  }

static get Y() {
    return Y;
  }

  static get SCALE_X() {
    return SCALE_X;
  }
  
  static get SCALE_Y() {
    return SCALE_Y;
  }

  static get ALPHA() {
    return ALPHA;
  }

  static get ROTATION() {
    return ROTATION;
  }
    
}


class Tween extends EventEmitter {

    constructor(displayObject){
        super();
        this.displayObject = displayObject;
      	this.animations = new ArrayList();
    }

    animate(tweenParams){
	      this.animations.push(tweenParams);
    }

    finishAnimation(tweenParams){
	      this.animations.remove(tweenParams);
        console.log("Removing animation: " + tweenParams.tweenType);
    }


}

class TweenJuggler {
    constructor(){
        TweenJuggler.instance = this;
        this.tweenList = new ArrayList();
    }

    static getInstance(){ return TweenJuggler.instance; }

    update() {
        var tween;
        if(this.tweenList.size() != 0){
		    var i;
		    for (i = 0; i < this.tweenList.size(); i++) {
		    var tween = this.tweenList.get(i);
                    var j;
                    for (j = 0; j < tween.animations.size(); j++) {
                            var animationParams = tween.animations.get(j);
                            if(!animationParams.hasStarted){
                                animationParams.clock.resetGameClock();
                                animationParams.setHasStarted(true);
                                
                            }
                            var elapsedTime = animationParams.clock.getElapsedTime()
                            var timeRatio = elapsedTime/animationParams.time;
                            if(animationParams.tweenType == TweenableParams.ALPHA){  
				    var newAlpha = animationParams.func(animationParams.start, animationParams.final, timeRatio);
                                    if(elapsedTime >= animationParams.time) {
                                        tween.displayObject.alpha = animationParams.final;
                                        tween.finishAnimation(animationParams);
                                    } else {
                                       tween.displayObject.alpha = newAlpha;
                                    }

                            } else if(animationParams.tweenType == TweenableParams.ROTATION){
				    var newRotation = animationParams.func(animationParams.start, animationParams.final, timeRatio);
                                    if(elapsedTime >= animationParams.time) {
                                        tween.displayObject.rotation = animationParams.final;
                                        tween.finishAnimation(animationParams);
                                    } else {
                                       tween.displayObject.rotation = newRotation;
                                    }
                            
			    } else if(animationParams.tweenType == TweenableParams.SCALE_X){
				    var newScaleX = animationParams.func(animationParams.start, animationParams.final, timeRatio);
                                    if(elapsedTime >= animationParams.time) {
                                        tween.displayObject.scaleX = animationParams.final;
                                        tween.finishAnimation(animationParams);
                                    } else {
                                       tween.displayObject.scaleX = newScaleX;
                                    }
 
			    } else if(animationParams.tweenType == TweenableParams.SCALE_Y){
				    var newScaleY = animationParams.func(animationParams.start, animationParams.final, timeRatio);
                                    if(elapsedTime >= animationParams.time) {
                                        tween.displayObject.scaleY = animationParams.final;
                                        tween.finishAnimation(animationParams);
                                    } else {
                                       tween.displayObject.scaleY = newScaleY;
                                    }

                             } else if(animationParams.tweenType == TweenableParams.X){
				    var newX = animationParams.func(animationParams.start, animationParams.final, timeRatio);
                                    if(elapsedTime >= animationParams.time) {
                                        tween.displayObject.setX(animationParams.final);
                                        tween.finishAnimation(animationParams);
                                    } else {
                                       tween.displayObject.setX(newX);
                                    }

                             } else if(animationParams.tweenType == TweenableParams.Y){
				    var newY = animationParams.func(animationParams.start, animationParams.final, timeRatio);
                                    if(elapsedTime >= animationParams.time) {
                                        tween.displayObject.setY(animationParams.final);
                                        tween.finishAnimation(animationParams);
                                    } else {
                                       tween.displayObject.setY(newY);
                                    }
                             }


                           if(tween.animations.size() == 0){
				               this.remove(tween);
                                               tween.emit('onTweenComplete', 'onTweenComplete');
			   }
		    }
   	     }
        }
    }

    add(tween){
        var i;
        for (i = 0; i < this.tweenList.size(); i++) {
            if(this.tweenList.get(i).displayObject == tween.displayObject){
                return;
            }
        }
        console.log("Adding tween: " + tween.displayObject.id);
        this.tweenList.push(tween);

    }

    remove(tween){ this.tweenList.remove(tween); }
}
