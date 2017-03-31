// holds collection of mochis
// Game.prototype.checkColors checks for matching colored mochis
// Game.prototype.ctx draws the Game
// Keeps track of dimensions of the space, brings falling objects into the screen
import Mochi from './mochi';
import animateParticules from './fireworks';


class Game {
	constructor() {
		this.matchedMochis = [];
		this.grid = new Array();
		this.selectedTile = {column: 0, row: 0, selected: false};

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
				if (this.grid[y][x] !== 0) {
					this.grid[y][x].draw(ctx);
				}
			}
		}

	

	}

	createStartBoard() {

		for (let y = 0; y <= Game.LASTROW; y++) {
			for (let x = 0; x <= Game.LASTCOL; x++) {
				this.grid[y][x] = new Mochi({game: this, coordX: x, coordY: y});
			}
		}
		this.searchBoard();

	}

	// removeMochi(startX, startY, ctx) {
	// 	const startCol = parseInt(startX / 50);
	// 	console.log(startCol);
	// 	const startRow = parseInt(startY / 50);
	// 	console.log(startRow);

	// 	let x = startCol;
	// 	let y = startRow;

	// 	if (this.grid[y][x].color === "#CF6C9A") {


	// 		this.draw(ctx);
	// 	}
	// 	animateParticules(50 * x, 50 * y);

	// }

	searchBoard() {

		this.searchForMatchingMochis();
	
		while (this.matchedMochis.length > 0) {
		
			this.removeMochis();

			this.shiftMochis();

			this.searchForMatchingMochis();
		}
	}

	searchForMatchingMochis() {
		
		for (let y = 0; y <= Game.LASTROW; y++) {
			let numMatchingMochis = 1;
			let matchingMochisCoords = [];
			for (let x = 0; x <= Game.LASTCOL; x++) {
				let searchComplete = false;
				matchingMochisCoords.push([y,x]);
				if (x === Game.LASTCOL) {
					searchComplete = true;
				}
				else {
					if (this.grid[y][x].color === this.grid[y][x+1].color &&
						this.grid[y][x] !== 0) {
						numMatchingMochis += 1;
						matchingMochisCoords.push([y,x+1]);
					}
					else {
						searchComplete = true;
					}
				}

				if (searchComplete) {
					if (numMatchingMochis >= 5) {
						this.matchedMochis.push(matchingMochisCoords);
						console.log(numMatchingMochis);
					}

					numMatchingMochis = 1;
				}

			}
		}

		for (let x = 0; x <= Game.LASTCOL; x++) {
			let numMatchingMochis = 1;
			let matchingMochisCoords = [];
			for (let y = 0; y <= Game.LASTCOL; y++) {
				let searchComplete = false;
				matchingMochisCoords.push([y,x]);
				if (y === Game.LASTROW) {
					searchComplete = true;
				}
				else {
					if (this.grid[y][x].color === this.grid[y+1][x].color &&
						this.grid[y][x] !== 0) {
						numMatchingMochis += 1;
						matchingMochisCoords.push([y,x+1]);
					}
					else {
						searchComplete = true;
					}
				}

				if (searchComplete) {
					if (numMatchingMochis >= 5) {
						this.matchedMochis.push(matchingMochisCoords);
						console.log(numMatchingMochis);
					}

					numMatchingMochis = 1;
				}

			}
		}

	}

	removeMochis() {
		this.matchedMochis.forEach(matchingSets => {
			matchingSets.forEach(mochiCoord => {
				this.grid[mochiCoord[0]][mochiCoord[1]] = 0;
				animateParticules(50 * mochiCoord[0], 50 * mochiCoord[1]);
			});
		});

		for (let x = 0; x <= Game.LASTCOL; x++) {
			let shiftFactor = 0;
			for (let y = Game.LASTROW; y >= 0; y--) {
				if (this.grid[y][x] === 0) {
					shiftFactor += 1;
					// this.grid[y][x].shift = 0;
				}
				else {
					this.grid[y][x].shift = shiftFactor;
				}
			}
		}
	}

	shiftMochis() {
		for (let x = 0; x <= Game.LASTCOL; x++) {
			for (let y = Game.LASTROW; y >=0; y--) {
				if (this.grid[y][x] === 0) {
					this.grid[y][x] = new Mochi({game: this, coordX: x, coordY: y});
				}
				else {
					const shiftFactor = this.grid[y][x].shift;
					if (shiftFactor > 0) {
						this.swapMochis(x, y, x, y + shiftFactor);
					}
				}

				this.grid[y][x].shift = 0;
			}
		}
	}

	swapMochis(x1, y1, x2, y2) {
		const mochiOne = this.grid[y1][x1];
		this.grid[y1][x1] = this.grid[y2][x2];
		this.grid[y2][x2] = mochiOne;
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