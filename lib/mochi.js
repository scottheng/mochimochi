// base class for mochi objects
// Most important methods are: Mochi.prototype.fall, Mochi.prototype.draw(ctx), Mochi.prototype.remove

class Mochi {
	constructor(options) {
		this.coordX = options.coordX;
		this.coordY = options.coordY;
		this.radius = 20;
		this.color = options.color || this.randomColor();
		this.game = options.game;
		this.shift = 0;
	}

	draw(ctx) {

		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(
			this.coordX * 50 + this.radius + 5, this.coordY * 50 + this.radius + 5, this.radius, 0, 2 * Math.PI, false
		);
		ctx.fill();

		if (this.color === "#CF6C9A") {
			ctx.strokeStyle = "#C73D79";
			ctx.lineWidth = 3;
			ctx.stroke();

			ctx.beginPath();
			ctx.arc(
				(this.coordX * 50 + this.radius + 5) - 7, (this.coordY * 50 + this.radius + 5) - 2, 4, 0, 2 * Math.PI, false
			);
			ctx.fillStyle = "#C73D79";
			ctx.fill();

			ctx.beginPath();
			ctx.arc(
				(this.coordX * 50 + this.radius + 5) + 7, (this.coordY * 50 + this.radius + 5) - 2, 4, 0, 2 * Math.PI, false
			);
			ctx.fillStyle = "#C73D79";
			ctx.fill();

			// cheek
			ctx.beginPath();
			ctx.ellipse((this.coordX * 50 + this.radius + 5)-10, (this.coordY * 50 + this.radius + 5)+7, 4, 4, 90 * Math.PI/180, 0, 2 * Math.PI);
			ctx.fillStyle = "#D78CAD";
			ctx.fill();

			ctx.beginPath();
			ctx.ellipse((this.coordX * 50 + this.radius + 5)+10, (this.coordY * 50 + this.radius + 5)+7, 4, 4, 90 * Math.PI/180, 0, 2 * Math.PI);
			ctx.fillStyle = "#D78CAD";
			ctx.fill();

			ctx.beginPath();
			ctx.arc(
				(this.coordX * 50 + this.radius + 5), (this.coordY * 50 + this.radius + 5) + 5, 3, 0, Math.PI, false
			);
			
			ctx.lineWidth = 1;
			ctx.stroke();

		}
		else if (this.color === "#F2ECA0") {
			ctx.strokeStyle = "#EDDC15";
			ctx.lineWidth = 3;
			ctx.stroke();

			ctx.beginPath();
			ctx.moveTo((this.coordX * 50 + this.radius + 5)-2, (this.coordY * 50 + this.radius + 5)-4);
			ctx.lineTo((this.coordX * 50 + this.radius + 5)-10,(this.coordY * 50 + this.radius + 5)-8);
			ctx.lineWidth = 3;
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo((this.coordX * 50 + this.radius + 5)-2, (this.coordY * 50 + this.radius + 5)-4);
			ctx.lineTo((this.coordX * 50 + this.radius + 5)-10,(this.coordY * 50 + this.radius + 5));
			ctx.lineWidth = 3;
			ctx.stroke();

			ctx.beginPath();
			ctx.moveTo((this.coordX * 50 + this.radius + 5)+2, (this.coordY * 50 + this.radius + 5)-4);
			ctx.lineTo((this.coordX * 50 + this.radius + 5)+10,(this.coordY * 50 + this.radius + 5)-8);
			ctx.lineWidth = 3;
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo((this.coordX * 50 + this.radius + 5)+2, (this.coordY * 50 + this.radius + 5)-4);
			ctx.lineTo((this.coordX * 50 + this.radius + 5)+10,(this.coordY * 50 + this.radius + 5));
			ctx.lineWidth = 3;
			ctx.stroke();

			// cheek
			ctx.beginPath();
			ctx.ellipse((this.coordX * 50 + this.radius + 5)-10, (this.coordY * 50 + this.radius + 5)+7, 4, 4, 90 * Math.PI/180, 0, 2 * Math.PI);
			ctx.fillStyle = "#E9CEB0";
			ctx.fill();

			ctx.beginPath();
			ctx.ellipse((this.coordX * 50 + this.radius + 5)+10, (this.coordY * 50 + this.radius + 5)+7, 4, 4, 90 * Math.PI/180, 0, 2 * Math.PI);
			ctx.fillStyle = "#E9CEB0";
			ctx.fill();
			
			ctx.beginPath();
			ctx.arc(
				(this.coordX * 50 + this.radius + 5), (this.coordY * 50 + this.radius + 5) + 5, 3, 0, Math.PI, false
			);
			
			ctx.lineWidth = 1;
			ctx.stroke();
		}
		else if (this.color === "#B8C947") {
			ctx.strokeStyle = "#60872D";
			ctx.lineWidth = 3;
			ctx.stroke();

			ctx.beginPath();
			ctx.moveTo((this.coordX * 50 + this.radius + 5)-2, (this.coordY * 50 + this.radius + 5)-4);
			ctx.lineTo((this.coordX * 50 + this.radius + 5)-10,(this.coordY * 50 + this.radius + 5)-8);
			ctx.lineWidth = 3;
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo((this.coordX * 50 + this.radius + 5)-2, (this.coordY * 50 + this.radius + 5)-4);
			ctx.lineTo((this.coordX * 50 + this.radius + 5)-10,(this.coordY * 50 + this.radius + 5));
			ctx.lineWidth = 3;
			ctx.stroke();

			ctx.beginPath();
			ctx.arc(
				(this.coordX * 50 + this.radius + 5) + 7, (this.coordY * 50 + this.radius + 5) - 4, 4, 0, 2 * Math.PI, false
			);
			ctx.fillStyle = "#60872D";
			ctx.fill();

			ctx.beginPath();
			ctx.ellipse((this.coordX * 50 + this.radius + 5)-10, (this.coordY * 50 + this.radius + 5)+7, 4, 4, 90 * Math.PI/180, 0, 2 * Math.PI);
			ctx.fillStyle = "#E9CEB0";
			ctx.fill();

			ctx.beginPath();
			ctx.ellipse((this.coordX * 50 + this.radius + 5)+10, (this.coordY * 50 + this.radius + 5)+7, 4, 4, 90 * Math.PI/180, 0, 2 * Math.PI);
			ctx.fillStyle = "#E9CEB0";
			ctx.fill();

			ctx.beginPath();
			ctx.arc(
				(this.coordX * 50 + this.radius + 5), (this.coordY * 50 + this.radius + 5) + 5, 3, 0, Math.PI, false
			);
			
			ctx.lineWidth = 1;
			ctx.stroke();
		}
		else if (this.color === "#2479AF") {
			ctx.strokeStyle = "#004298";
			ctx.lineWidth = 3;
			ctx.stroke();

			ctx.beginPath();
			ctx.arc(
				(this.coordX * 50 + this.radius + 5) - 7, (this.coordY * 50 + this.radius + 5) - 6, 4, 0, Math.PI, false
			);

			ctx.stroke();

			ctx.beginPath();
			ctx.arc(
				(this.coordX * 50 + this.radius + 5) + 7, (this.coordY * 50 + this.radius + 5) - 6, 4, 0, Math.PI, false
			);

			ctx.stroke();


			ctx.beginPath();
			ctx.ellipse((this.coordX * 50 + this.radius + 5)-10, (this.coordY * 50 + this.radius + 5)+7, 4, 4, 90 * Math.PI/180, 0, 2 * Math.PI);
			ctx.fillStyle = "#D78CAD";
			ctx.fill();

			ctx.beginPath();
			ctx.ellipse((this.coordX * 50 + this.radius + 5)+10, (this.coordY * 50 + this.radius + 5)+7, 4, 4, 90 * Math.PI/180, 0, 2 * Math.PI);
			ctx.fillStyle = "#D78CAD";
			ctx.fill();


			ctx.beginPath();
			ctx.arc(
				(this.coordX * 50 + this.radius + 5), (this.coordY * 50 + this.radius + 5) + 5, 3, 0, 2*Math.PI, false
			);
			ctx.fillStyle = "#004298";
			ctx.fill();


		}
		else if (this.color === "#A495CC") {
			ctx.strokeStyle = "#704782";
			ctx.lineWidth = 3;
			ctx.stroke();	


			ctx.beginPath();
			ctx.arc(
				(this.coordX * 50 + this.radius + 5) - 7, (this.coordY * 50 + this.radius + 5) - 2, 4, 0, 2 * Math.PI, false
			);
			ctx.fillStyle = "#704782";
			ctx.fill();

			ctx.beginPath();
			ctx.arc(
				(this.coordX * 50 + this.radius + 5) + 7, (this.coordY * 50 + this.radius + 5) - 2, 4, 0, 2 * Math.PI, false
			);
			ctx.fillStyle = "#704782";
			ctx.fill();

			// cheek
			ctx.beginPath();
			ctx.ellipse((this.coordX * 50 + this.radius + 5)-10, (this.coordY * 50 + this.radius + 5)+7, 4, 4, 90 * Math.PI/180, 0, 2 * Math.PI);
			ctx.fillStyle = "#D78CAD";
			ctx.fill();

			ctx.beginPath();
			ctx.ellipse((this.coordX * 50 + this.radius + 5)+10, (this.coordY * 50 + this.radius + 5)+7, 4, 4, 90 * Math.PI/180, 0, 2 * Math.PI);
			ctx.fillStyle = "#D78CAD";
			ctx.fill();

			ctx.beginPath();
			ctx.arc(
				(this.coordX * 50 + this.radius + 5), (this.coordY * 50 + this.radius + 5) + 5, 3, 0, Math.PI, false
			);
			
			ctx.lineWidth = 1;
			ctx.stroke();
		}

		else if (this.color === "#FEE8CF") {
			ctx.strokeStyle = "#8D540E";
			ctx.lineWidth = 3;
			ctx.stroke();	


			ctx.beginPath();
			ctx.arc(
				(this.coordX * 50 + this.radius + 5) - 7, (this.coordY * 50 + this.radius + 5) - 2, 4, 0, 2 * Math.PI, false
			);
			ctx.fillStyle = "#8D540E";
			ctx.fill();

			ctx.beginPath();
			ctx.arc(
				(this.coordX * 50 + this.radius + 5) + 7, (this.coordY * 50 + this.radius + 5) - 2, 4, 0, 2 * Math.PI, false
			);
			ctx.fillStyle = "#8D540E";
			ctx.fill();

			// cheek
			ctx.beginPath();
			ctx.ellipse((this.coordX * 50 + this.radius + 5)-10, (this.coordY * 50 + this.radius + 5)+7, 4, 4, 90 * Math.PI/180, 0, 2 * Math.PI);
			ctx.fillStyle = "#D78CAD";
			ctx.fill();

			ctx.beginPath();
			ctx.ellipse((this.coordX * 50 + this.radius + 5)+10, (this.coordY * 50 + this.radius + 5)+7, 4, 4, 90 * Math.PI/180, 0, 2 * Math.PI);
			ctx.fillStyle = "#D78CAD";
			ctx.fill();

			ctx.beginPath();
			ctx.arc(
				(this.coordX * 50 + this.radius + 5), (this.coordY * 50 + this.radius + 5) + 5, 3, 0, Math.PI, false
			);
			
			ctx.lineWidth = 1;
			ctx.stroke();
		}

		else if (this.color === "#FFCCDD") {
			ctx.strokeStyle = "#F38BAB";
			ctx.lineWidth = 3;
			ctx.stroke();	


			ctx.beginPath();
			ctx.arc(
				(this.coordX * 50 + this.radius + 5) - 7, (this.coordY * 50 + this.radius + 5) - 2, 4, 0, 2 * Math.PI, false
			);
			ctx.fillStyle = "#F38BAB";
			ctx.fill();

			ctx.beginPath();
			ctx.arc(
				(this.coordX * 50 + this.radius + 5) + 7, (this.coordY * 50 + this.radius + 5) - 2, 4, 0, 2 * Math.PI, false
			);
			ctx.fillStyle = "#F38BAB";
			ctx.fill();

			// cheek
			ctx.beginPath();
			ctx.ellipse((this.coordX * 50 + this.radius + 5)-10, (this.coordY * 50 + this.radius + 5)+7, 4, 4, 90 * Math.PI/180, 0, 2 * Math.PI);
			ctx.fillStyle = "#D78CAD";
			ctx.fill();

			ctx.beginPath();
			ctx.ellipse((this.coordX * 50 + this.radius + 5)+10, (this.coordY * 50 + this.radius + 5)+7, 4, 4, 90 * Math.PI/180, 0, 2 * Math.PI);
			ctx.fillStyle = "#D78CAD";
			ctx.fill();

			ctx.beginPath();
			ctx.arc(
				(this.coordX * 50 + this.radius + 5), (this.coordY * 50 + this.radius + 5) + 5, 3, 0, Math.PI, false
			);
			
			ctx.lineWidth = 1;
			ctx.stroke();
		}


	}



	randomColor() {
		return Mochi.COLORS[Math.floor(7*Math.random())];
	}

}

Mochi.COLORS = ["#CF6C9A", "#F2ECA0", "#B8C947", "#2479AF", "#A495CC", "#FEE8CF", "#FFCCDD"];
export default Mochi;