// holds collection of mochis
// Game.prototype.checkColors checks for matching colored mochis
// Game.prototype.ctx draws the Game
// Keeps track of dimensions of the space, brings falling objects into the screen
import Mochi from './mochi';

class Game {
	constructor() {
		this.mochis = [];

		this.addMochis();
	
	}

	addMochi(mochi) {
		this.mochis.push(mochi);
	}

	addMochis() {
		for (let i = 0; i < Game.NUM_MOCHIS; i++) {
			this.addMochi(new Mochi({game: this}));
		}

	}

	draw(ctx) {
		ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
		ctx.fillStyle = Game.BG_COLOR;
		ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

		for (let y = 0; y < Game.ROWS; y++) {
			for (let x = 0; x < Game.COLS; x++) {

				// ctx.rect(x * 50, y * 50, 50, 50);
				new Mochi({game: this, coordX: x, coordY: y}).draw(ctx);

			}
		}


	}

	randomPosition() {
		return [
			Game.DIM_X * Math.random(),
			Game.DIM_Y * Math.random()
		];
	}
	


}

Game.BG_COLOR = "#FFFFFF";
Game.DIM_X = 500;
Game.DIM_Y = 500;
Game.COLS = 10;
Game.ROWS = 10;
Game.COLHEIGHT = 50;
Game.COLWIDTH = 50;


export default Game;