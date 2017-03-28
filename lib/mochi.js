// base class for mochi objects
// Most important methods are: Mochi.prototype.fall, Mochi.prototype.draw(ctx), Mochi.prototype.remove

class Mochi {
	constructor(options) {
		this.pos = options.pos;
		this.radius = options.radius;
		this.color = options.color;
		this.game = options.game;
	}

	draw(ctx) {
		// ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillstyle = this.color;
		ctx.beginPath();
		ctx.arc(
			this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false
		);
		ctx.lineWidth = 5;
		ctx.strokeStyle = 'black';
		ctx.stroke();
	}
}

Mochi.GRAVITY = 0.2;
Mochi.DAMPING = 0.9;
Mochi.TRACTION = 0.8;