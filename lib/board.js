// Game View
// stores Game instance
// stores a canvas context to draw the game into
// installs key listeners to remove mochi objects

import animateParticules from './fireworks';

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
		this.mochiCoords = [];


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

		const startX = parseInt(e.clientX - this.offsetX);
		const startY = parseInt(e.clientY - this.offsetY);
		this.isDown = true;
	}

	handleMouseUp(e) {
		e.preventDefault();
		e.stopPropagation();

		const mouseX = parseInt(e.clientX - this.offsetX);
		const mouseY = parseInt(e.clientY - this.offsetY);

		this.isDown = false;

		this.mochiCoords.push([mouseX, mouseY]);

		if (this.mochiCoords.length === 2) {
			this.game.switchMochis(this.mochiCoords, this.ctx);
			this.mochiCoords = [];
		}

	}



}



export default Board;