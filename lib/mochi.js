// base class for mochi objects
// Most important methods are: Mochi.prototype.fall, Mochi.prototype.draw(ctx), Mochi.prototype.remove

class Mochi {
	constructor(options) {
		this.pos = [100, 100];
		this.vel = options.vel;
		this.radius = 60;
		this.color = "#000000";
		this.game = options.game;
	}

	draw(ctx) {

		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(
			this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false
		);
		ctx.fill();
	}
}

Mochi.GRAVITY = 0.2;
Mochi.DAMPING = 0.9;
Mochi.TRACTION = 0.8;

export default Mochi;