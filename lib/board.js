// Game View
// stores Game instance
// stores a canvas context to draw the game into
// installs key listeners to remove mochi objects

class Board {
	constructor(game, ctx) {
		this.game = game;
		this.ctx = ctx;
	}

	start() {
		
		requestAnimationFrame(this.animate.bind(this));
	}

	animate() {
		this.game.draw(this.ctx);
	}
}

export default Board;