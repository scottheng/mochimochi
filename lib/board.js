// Game View
// stores Game instance
// stores a canvas context to draw the game into
// installs key listeners to remove mochi objects

class Board {
	constructor(game, ctx) {
		this.game = game;
		this.ctx = ctx;

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
}

export default Board;