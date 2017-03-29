// base class for mochi objects
// Most important methods are: Mochi.prototype.fall, Mochi.prototype.draw(ctx), Mochi.prototype.remove

class Mochi {
	constructor(options) {
		this.pos = options.pos || options.game.randomPosition();
		this.vel = [2,5];
		this.radius = 20;
		this.color = "#B8C947";
		this.game = options.game;
	}

	draw(ctx) {

		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(
			this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false
		);
		ctx.fill();
		ctx.strokeStyle = "#60872D";
		ctx.lineWidth = 3;
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(
			this.pos[0]-7, this.pos[1]-2, 4, 0, 2 * Math.PI, false
		);
		ctx.fillStyle = "#60872D";
		ctx.fill();

		ctx.beginPath();
		ctx.arc(
			this.pos[0]+7, this.pos[1]-2, 4, 0, 2 * Math.PI, false
		);
		ctx.fillStyle = "#60872D";
		ctx.fill();


		ctx.beginPath();
		ctx.arc(
			this.pos[0], this.pos[1]+5, 3, 0, Math.PI, false
		);
		
		ctx.stroke();

		ctx.beginPath();
		ctx.ellipse(this.pos[0]-10, this.pos[1]+7, 4, 4, 90 * Math.PI/180, 0, 2 * Math.PI);
		ctx.fillStyle = "#E9CEB0";
		ctx.fill();

		ctx.beginPath();
		ctx.ellipse(this.pos[0]+10, this.pos[1]+7, 4, 4, 90 * Math.PI/180, 0, 2 * Math.PI);
		ctx.fillStyle = "#E9CEB0";
		ctx.fill();
		


	}
}

Mochi.GRAVITY = 0.2;
Mochi.DAMPING = 0.9;
Mochi.TRACTION = 0.8;

export default Mochi;