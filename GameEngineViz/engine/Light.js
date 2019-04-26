class Light{
	constructor(id, position, radius, osc) {
				this.id = id;
                this.position = position;
		        this.radius = radius;
		        this.osc = osc || false;
	}
}


class LightSystem{
	constructor() {
		this.lights = new ArrayList();;
	}
	
	darken(ctx, darkenColor, amount) {
		ctx.fillStyle = darkenColor;
		ctx.globalAlpha = amount;
		ctx.fillRect(0, 0, this.width, this.height);
		ctx.globalAlpha = 1;
	}
	
	lightenGradient(ctx, x, y, radius, osc) {
		ctx.save();
		ctx.globalCompositeOperation = 'lighter';
		if(osc){
			var rnd = 0.05 * Math.sin(1.1 * Date.now() / 1000);
		} else {
			var rnd = 0;
		}
		radius = radius * (1 + rnd);
		var radialGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
		radialGradient.addColorStop(0.0, '#BB9');
		radialGradient.addColorStop(0.2 + rnd, '#AA8');
		radialGradient.addColorStop(0.7 + rnd, '#330');
		radialGradient.addColorStop(0.90, '#110');
		radialGradient.addColorStop(1, '#000');
		ctx.fillStyle = radialGradient;
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, 2 * Math.PI);
		ctx.fill();
		ctx.restore();
	}
	
	addLight(id, position, radius, osc){
		var light = new Light(id, position, radius, osc);
		this.lights.push(light);
		return light;
	}
	
	getLight(id){
		for (var i = 0; i < this.lights.size(); i++){
			if(id == this.lights.get(i).id){
				return this.lights.get(i);
			}
		}
	}
	
	draw(g){
		for (var i = 0; i < this.lights.size(); i++){
			var light = this.lights.get(i);
			this.lightenGradient(g, light.position.x, light.position.y, light.radius, light.osc);
		}
	}
	
	remove(light){ this.lights.remove(light); }


}
