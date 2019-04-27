class WaterBody extends Sprite{
	constructor(canvas, width, height, wavesNum, lesson) {
		super("water",null);
        this.drawingCanvas = canvas;
		this.ctx = drawingCanvas.getContext("2d");
        this.width = width;
        this.height = height;
        this.wavesNum = wavesNum;
        this.waves = [];
        this.lesson = lesson;
		// spring stuff
		this.tension = .025,
		this.dampening = .025,
		this.spread = .25;

		for(var i = 0; i < this.wavesNum; i++){
		    var x =  Math.ceil(this.width/this.wavesNum)*i,
			y = (this.height);  
                    console.log(y);   
		    
		    this.waves.push({
			    pos : {x : x, y : y}, 
			    targetHeight : y,
			    height : y,
			    speed : 0
		    });   
		} 


	}

    update(pressedKeys, gamePads){
		super.update(pressedKeys, gamePads);
		this.isCollidingSurface();
	}

	draw(g){
		super.draw(g);
        this.oldAlpha = this.ctx.globalAlpha;
        this.ctx.globalAlpha *= 0.5;

	    for(var i = 0; i < this.wavesNum; i++){    
			var diff = this.waves[i].targetHeight - this.waves[i].height;
			
			this.waves[i].speed += this.tension * diff - this.waves[i].speed * this.dampening;
			this.waves[i].height += this.waves[i].speed;
	    }    
	    
	    var lDeltas = [],
		rDeltas = [];

	    for (var i = 0; i < this.wavesNum; i++){
			if (i > 0){
				lDeltas[i] = this.spread * (this.waves[i].height - this.waves[i - 1].height);
				this.waves[i - 1].speed += lDeltas[i];
			}
			
			if (i < this.wavesNum - 1){
				rDeltas[i] = this.spread * (this.waves[i].height - this.waves[i + 1].height);
				this.waves[i + 1].speed += rDeltas[i];
			}
	    }

	    for (var i = 0; i < this.wavesNum; i++){

		if (i > 0){
		    this.waves[i - 1].height += lDeltas[i];
		}
		if (i < this.waves.length - 1){
		    this.waves[i + 1].height += rDeltas[i];
		}
		
		// draw the wave
		this.waves[i].pos.y = window.innerHeight - this.waves[i].height;
		if(i < this.wavesNum-1){
		     var grad = this.ctx.createLinearGradient(this.waves[i].pos.x,this.waves[i].pos.y,this.waves[i+1].pos.x,window.innerHeight);
		     grad.addColorStop(0, 'rgb(0,100,200)');
		     grad.addColorStop(1, 'rgb(0,0,100)');

		    
		    this.ctx.fillStyle = grad;
		    this.ctx.beginPath();
		    this.ctx.lineTo(this.waves[i].pos.x, this.waves[i].pos.y);
		    this.ctx.lineTo(this.waves[i+1].pos.x, this.waves[i].pos.y);
		    this.ctx.lineTo(this.waves[i+1].pos.x, window.innerHeight);
		    this.ctx.lineTo(this.waves[i].pos.x, window.innerHeight);
		    this.ctx.fill();
		}
	    }
            this.ctx.globalAlpha = this.oldAlpha;
	   
	}


        isCollidingSurface() {
			var lessonSprites = this.lesson.children;
			for (var i = 0; i < lessonSprites.size(); i++){
				var sprite = lessonSprites.get(i);
				var spriteX = sprite.getX();
				var box = sprite.getScaledHitbox();
				var midSprite = spriteX + box.width/2;
				if(box.y + box.height >= this.height && box.y < this.height && sprite.getVelY() != 0){
					var wave = Math.floor(this.wavesNum/(this.width/midSprite));
					if (wave > 1 && wave < this.wavesNum-1){
						this.waves[wave].speed -= sprite.getVelY();
						this.waves[wave+1].speed -= sprite.getVelY();
						this.waves[wave-1].speed -= sprite.getVelY();
						var template = new ParticleTemplate("water_particle.png", 0.1, Math.abs(sprite.getVelY())*3, Tuple.fromAngle(1.5*Math.PI, Math.abs(sprite.getVelY()*2)), new Tuple(Math.random() * -0.002 + 0.001, Math.random() + 1), false, 0.5);
						this.lesson.emitters.addEmitter(new Emitter(template, new Tuple(midSprite,this.waves[wave].pos.y), Math.PI/2, 25, Math.abs(sprite.getVelY()), Math.abs(sprite.getVelY())*5));
					}
				}          
			}
       }

}







