// base class for mochi objects
// Most important methods are: Mochi.prototype.fall, Mochi.prototype.draw(ctx), Mochi.prototype.remove

class Mochi {
	constructor(options) {
		this.coordX = options.coordX;
		this.coordY = options.coordY;
		this.vel = [2,5];
		this.radius = 20;
		this.color = "#B8C947";
		this.game = options.game;
	}

	draw(ctx) {

		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(
			this.coordX*50, this.coordY*50, this.radius, 0, 2 * Math.PI, false
		);
		ctx.fill();
		ctx.strokeStyle = "#60872D";
		ctx.lineWidth = 3;
		ctx.stroke();

		// Draw normal eyes
		// ctx.beginPath();
		// ctx.arc(
		// 	this.coordX-7, this.coordY-2, 4, 0, 2 * Math.PI, false
		// );
		// ctx.fillStyle = "#60872D";
		// ctx.fill();

		// ctx.beginPath();
		// ctx.arc(
		// 	this.coordX+7, this.coordY-2, 4, 0, 2 * Math.PI, false
		// );
		// ctx.fillStyle = "#60872D";
		// ctx.fill();

		// Draw >< eyes
		// ctx.beginPath();
		// ctx.moveTo(this.coordX-7, this.coordY-2);
		// ctx.lineTo(0,0);
		// ctx.stroke();


		// ctx.beginPath();
		// ctx.arc(
		// 	this.coordX, this.coordY+5, 3, 0, Math.PI, false
		// );
		
		// ctx.stroke();

		// ctx.beginPath();
		// ctx.ellipse(this.coordX-10, this.coordY+7, 4, 4, 90 * Math.PI/180, 0, 2 * Math.PI);
		// ctx.fillStyle = "#E9CEB0";
		// ctx.fill();

		// ctx.beginPath();
		// ctx.ellipse(this.coordX+10, this.coordY+7, 4, 4, 90 * Math.PI/180, 0, 2 * Math.PI);
		// ctx.fillStyle = "#E9CEB0";
		// ctx.fill();
		
	}

	fall() {

	}
}

Mochi.GRAVITY = 0.2;
Mochi.DAMPING = 0.9;
Mochi.TRACTION = 0.8;

export default Mochi;