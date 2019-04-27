class Tuple{

  constructor(x,y){
      this.x = x || 0;
      this.y = y || 0;
  }

  add(tuple){
      this.x += tuple.x;
      this.y += tuple.y;
  }

  getMagnitude(){
      return Math.sqrt(this.x * this.x + this.y * this.y);
  }
 
  getAngle(){
      return Math.atan2(this.y,this.x);
  }

// Allows us to get a new vector from angle and magnitude
  static fromAngle(angle, magnitude){
      return new Tuple(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
  }
  
}
