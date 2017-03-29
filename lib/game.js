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

		this.mochis.forEach((mochi) => {
			mochi.draw(ctx);
		});

	}

	randomPosition() {
		return [
			Game.DIM_X * Math.random(),
			Game.DIM_Y * Math.random()
		];
	}


}

Game.BG_COLOR = "#FFFFFF";
Game.NUM_MOCHIS = 10;
Game.DIM_X = 600;
Game.DIM_Y = 360;


export default Game;