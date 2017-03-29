// Game View
// stores Game instance
// stores a canvas context to draw the game into
// installs key listeners to remove mochi objects

class Board {
	constructor(game, ctx, $canvas) {
		this.game = game;
		this.ctx = ctx;
		this.$canvas = $canvas;
		this.canvasOffset = $canvas.offset();
		this.offsetX = this.canvasOffset.left;
		this.offsetY = this.canvasOffset.top;
		this.scrollX = $canvas.scrollLeft();
		this.scrollY = $canvas.scrollTop();
		this.isDown = false;
		this.startX = 0;
		this.startY = 0;
		this.mouseX = 0;
		this.mouseY = 0;

		this.grid = new Array();

		for (let y = 0; y < game.ROWS; y++) {
			this.grid[y] = new Array();

			for (let x = 0; x < game.COLS; x++) {
				this.grid[y][x] = 0;
			}
		}

	}

	start() {
		
		requestAnimationFrame(this.animate.bind(this));
	}

	animate() {
		this.game.draw(this.ctx);
	}

	handleMouseDown(e) {
		e.preventDefault();
		e.stopPropagation();

		this.startX = parseInt(e.clientX - this.offsetX);
		this.startY = parseInt(e.clientY - this.offsetY);

		console.log(this.startX);
		// console.log(startY);

		this.isDown = true;
		this.removeMochi();
	}

	handleMouseUp(e) {
		e.preventDefault();
		e.stopPropagation();

		this.mouseX = parseInt(e.clientX - this.offsetX);
		this.mouseY = parseInt(e.clientY - this.offsetY);

		this.isDown = false;


	}

	removeMochi() {
		const startCol = parseInt(this.startX / 50);
		console.log(startCol);
		const startRow = parseInt(this.startY / 50);
		console.log(startRow);

		let x = startCol;
		let y = startRow;
	
		this.ctx.save();
		this.ctx.fillStyle = "red";
		this.ctx.globalAlpha = 0.25;
        this.ctx.globalCompositeOperation = "destination-over";
        this.ctx.clearRect((x) * 50 + 2, (y) * 50 + 2, 50 - 4, 50 - 4);
		
        this.ctx.restore();
	}


}



export default Board;