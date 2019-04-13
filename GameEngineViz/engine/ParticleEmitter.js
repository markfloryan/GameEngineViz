class Particle extends Sprite{

  constructor(particleTemplate, initPoint, initVelocity, initAlpha){
      super("particle", particleTemplate.image);
      this.image = particleTemplate.image;
      this.size = particleTemplate.size || Math.random() * 10 + 15;
      this.lifespan = Math.random() * particleTemplate.lifespan || Math.random() * 500; 
      this.timeLeft = particleTemplate.lifespan;
      this.position = initPoint || new Tuple(0, 0);
      this.velocity = initVelocity || new Tuple(0, 0);
      this.alpha = initAlpha || 1;
      this.initAlpha = this.alpha;
      this.acceleration = particleTemplate.acceleration || new Tuple(0, 0);
      //this.fade = fade * Math.random() || 0.1 * Math.random();
      if(particleTemplate.rotate){
	      this.rotation = Math.random()*360;
      }
      this.isDead = false;
      this.scaleX = this.size;
      this.scaleY = this.size;
  }

  move(){
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.setX(this.position.x);
      this.setY(this.position.y);
      this.alpha = ((this.timeLeft*0.01)/this.lifespan) * this.initAlpha;
      this.timeLeft = this.timeLeft - 1;
      if(this.timeLeft<0){
          this.isDead = true;
      }
  }

  draw(g){
	super.draw(g);
  }
 
}

class ParticleTemplate {
     constructor(image, size, lifespan, velocity, acceleration, rotate, initAlpha){
         this.image = image;
         this.size = size;
         this.lifespan = lifespan; 
	 this.velocity = velocity || new Tuple(0, 0);
         this.acceleration = acceleration || new Tuple(0, 0);
         this.rotate = rotate;
         this.initAlpha = initAlpha;
      }
}

class Emitter{
    constructor(particleTemplate, source, spread, maxParticles, emissionRate, lifetime, lowerX, upperX, lowerY, upperY){
	  this.particles = [];
          this.particleTemplate = particleTemplate;
	  this.position = source; // Tuple
	  this.spread = spread || Math.PI / 32; // possible angles = velocity +/- spread
          this.maxParticles = maxParticles || 20000;
          this.emissionRate = emissionRate || 10;
          this.lifetime = lifetime || Infinity;
          this.lowerX = lowerX || 0;
          this.upperX = upperX || 800;
          this.lowerY = lowerY || 0;
          this.upperY = upperY || 600;
          this.isDead = false;
    }
    
    emitParticle(){
	  // Use an angle randomized over the spread so we have more of a "spray"
          var particle = this.particleTemplate; 
	  var angle = particle.velocity.getAngle() + this.spread - (Math.random() * this.spread * 2);
	 
	  // The magnitude of the emitter's velocity
	  var magnitude = particle.velocity.getMagnitude();
	 
	  // The emitter's position
	  var position = new Tuple(this.position.x, this.position.y);
	 
	  // New velocity based off of the calculated angle and magnitude
	  var velocity = Tuple.fromAngle(angle, magnitude);
	
	  return new Particle(particle, position, velocity, particle.initAlpha);
    }

    addNewParticles(){
	 // if we're at our max number of particles, stop emitting.
	  if (this.particles.length > this.maxParticles) return;

	    // for [emissionRate], emit a particle
	    for (var j = 0; j < this.emissionRate; j++) {
	      this.particles.push(this.emitParticle());
	    }
	
    }

    drawParticles(g){
        // a new array to hold particles within our bounds
        var currentParticles = [];

        for (var i = 0; i < this.particles.length; i++) {
	    var particle = this.particles[i];
	    var pos = particle.position;

	    // If we're out of bounds, drop this particle and move on to the next
	    if (pos.x < this.lowerX || pos.x > this.upperX || pos.y < this.lowerY || pos.y > this.upperY || particle.isDead) continue;
	 
	    // Move our particles
	    particle.move();
	 
	    // Add this particle to the list of current particles
	    currentParticles.push(particle);
            particle.draw(g);
        }

        // Update our global particles, clearing room for old particles to be collected
	this.particles = currentParticles;
        this.lifetime = this.lifetime - 1;
   
      	if(this.lifetime<0){
	  this.isDead = true;
      	}
    }
}
    
class ParticleEmitterSystem{
	constructor() {
		this.emitters = [];
	}
	
	addEmitter(emitter){
		this.emitters.push(emitter);	
	}
	
	addNewEmitter(particleTemplate, source, spread, maxParticles, emissionRate, lifetime, lowerX, upperX, lowerY, upperY){
		this.emitters.push(new Emitter(particleTemplate, source, spread, maxParticles, emissionRate, lifetime, lowerX, upperX, lowerY, upperY));
	}
	
	update() {
		var tempEmitters = [];
		// for each emitter
		for (var i = 0; i < this.emitters.length; i++) {
			this.emitters[i].addNewParticles();
		    if(!this.emitters[i].isDead){
				tempEmitters.push(this.emitters[i]);
            }
        } 
        this.emitters = tempEmitters;
	}
	
	draw(g){
		for (var i = 0; i < this.emitters.length; i++){
			this.emitters[i].drawParticles(g);
		}
	}
}






