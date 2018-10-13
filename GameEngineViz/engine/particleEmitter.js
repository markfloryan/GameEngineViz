class Particle extends Sprite{

  constructor(size, lifespan, fade, point, velocity, acceleration){
      super("particle", "particle.png");
      this.size = Math.random() * size || Math.random() * 10 + 15;
      this.lifespan = Math.random() * lifespan || Math.random() * 500; 
      this.timeLeft = lifespan;
      this.position = point || new Tuple(0, 0);
      this.velocity = velocity || new Tuple(0, 0);
      this.acceleration = new Tuple(Math.random() * -0.002 + 0.001, Math.random() * -0.002);
      this.fade = fade * Math.random() || 0.1 * Math.random();
      //this.rotation = Math.random()*360;
      this.isDead = false;
      this.scaleX = size;
      this.scaleY = size;
  }

  move(){
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.setX(this.position.x);
      this.setY(this.position.y);
      this.alpha = (this.timeLeft*0.01)/this.lifespan;
      this.timeLeft = this.timeLeft - 1;
      if(this.timeLeft<0){
          this.isDead = true;
      }
  }

  draw(g){
	super.draw(g);
  }
 

}

class Emitter{
    constructor(source, velocity, spread, maxParticles, emissionRate){
	  this.particles = [];
	  this.position = source; // Tuple
	  this.velocity = velocity; // Tuple
	  this.spread = spread || Math.PI / 32; // possible angles = velocity +/- spread
          this.maxParticles = maxParticles || 20000;
          this.emissionRate = emissionRate || 10;
    }
    
    emitParticle(){
	// Use an angle randomized over the spread so we have more of a "spray"
	  var angle = this.velocity.getAngle() + this.spread - (Math.random() * this.spread * 2);
	 
	  // The magnitude of the emitter's velocity
	  var magnitude = this.velocity.getMagnitude();
	 
	  // The emitter's position
	  var position = new Tuple(this.position.x, this.position.y);
	 
	  // New velocity based off of the calculated angle and magnitude
	  var velocity = Tuple.fromAngle(angle, magnitude);
	 
	  // return our new Particle!
	  return new Particle(1.2, 200, Math.abs(angle), position,velocity);
    }
 
    addNewParticles(){
	// if we're at our max, stop emitting.
	  if (this.particles.length > this.maxParticles) return;
	 

	 
	    // for [emissionRate], emit a particle
	    for (var j = 0; j < this.emissionRate; j++) {
	      this.particles.push(this.emitParticle());
	    }
	
    }

    plotParticles(boundsX, boundsY) {
	  // a new array to hold particles within our bounds
	  var currentParticles = [];
	 
	  for (var i = 0; i < this.particles.length; i++) {
	    var particle = this.particles[i];
	    var pos = particle.position;
	 
	    // If we're out of bounds, drop this particle and move on to the next
	    if (pos.x < 0 || pos.x > boundsX || pos.y < 0 || pos.y > boundsY || particle.isDead) continue;
	 
	    // Move our particles
	    particle.move();
	 
	    // Add this particle to the list of current particles
	    currentParticles.push(particle);
	  }
	 
	  // Update our global particles, clearing room for old particles to be collected
	  this.particles = currentParticles;
    }

    drawParticles(g){
        for (var i = 0; i < this.particles.length; i++) {
	    var particle = this.particles[i];
            particle.draw(g);
        }
    }

}





