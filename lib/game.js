// holds collection of mochis
// Game.prototype.checkColors checks for matching colored mochis
// Game.prototype.ctx draws the Game
// Keeps track of dimensions of the space, brings falling objects into the screen
import Mochi from './mochi';
import animateParticules from './fireworks';


class Game {
	constructor() {
		this.mochis = [];
		this.grid = new Array();

		for (let y = 0; y < Game.ROWS; y++) {
			this.grid[y] = new Array();

			for (let x = 0; x < Game.COLS; x++) {
				this.grid[y][x] = 0;
			}
		}

		this.createStartBoard();
	
	}


	draw(ctx) {
		ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

		for (let y = 0; y < Game.ROWS; y++) {
			for (let x = 0; x < Game.COLS; x++) {

				this.grid[y][x].draw(ctx);
			}
		}

	}

	createStartBoard() {
		for (let y = 0; y <= Game.LASTROW; y++) {
			for (let x = 0; x <= Game.LASTCOL; x++) {
				this.grid[y][x] = new Mochi({game: this, coordX: x, coordY: y});
			}
		}
	}

	removeMochi(startX, startY, ctx) {
		const startCol = parseInt(startX / 50);
		console.log(startCol);
		const startRow = parseInt(startY / 50);
		console.log(startRow);

		let x = startCol;
		let y = startRow;

		if (this.grid[y][x].color === "#CF6C9A") {


			this.draw(ctx);
			animateParticules(50 * x, 50 * y);
		}

	}

	switchMochis(coords, ctx) {
		debugger
		const mochiOneCoord = coords[0];
		const mochiTwoCoord = coords[1];

		const mochiOneX = parseInt(mochiOneCoord[0]/50);
		const mochiOneY = parseInt(mochiOneCoord[1]/50);

		const mochiTwoX = parseInt(mochiTwoCoord[0]/50);
		const mochiTwoY = parseInt(mochiTwoCoord[1]/50);

		this.grid[mochiOneY][mochiOneX].coordX = mochiTwoX;
		this.grid[mochiOneY][mochiOneX].coordY = mochiTwoY;

		this.grid[mochiTwoY][mochiTwoX].coordX = mochiOneX;
		this.grid[mochiTwoY][mochiTwoX].coordY = mochiOneY;

		this.draw(ctx);

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
Game.LASTCOL = Game.COLS - 1;
Game.ROWS = 10;
Game.LASTROW = Game.ROWS - 1;
Game.COLHEIGHT = 50;
Game.COLWIDTH = 50;


export default Game;