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

		for (let x = 0; x <= Game.LASTCOL; x++) {
			this.grid[x] = new Array();

			for (let y = 0; y <= Game.LASTROW; y++) {
				this.grid[x][y] = 0;
			}
		}

		this.createStartBoard();
	
	}


	draw(ctx, gameState, animationState, currentMove) {

		ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

		for (let x = 0; x < Game.COLS; x++) {
			for (let y = 0; y < Game.ROWS; y++) {
				if (this.grid[x][y] !== 0) {
					this.grid[x][y].draw(ctx);
				}
			}
		}



	

	}

	createStartBoard() {

		for (let x = 0; x <= Game.LASTCOL; x++) {
			for (let y = 0; y <= Game.LASTROW; y++) {
				this.grid[x][y] = new Mochi({game: this, coordX: x, coordY: y});
			}
		}
		this.searchBoard();

		this.matchedMochis = [];

	}

	searchBoard() {

		this.searchForMatchingMochis();
	
		while (this.matchedMochis.length > 0) {
		
			this.removeMochis();

			this.shiftMochis();

			this.searchForMatchingMochis();
		}
	}

	searchForMatchingMochis() {

		this.matchedMochis = [];
		for (let y = 0; y <= Game.LASTROW; y++) {
			let numMatchingMochis = 1;
			let matchingMochisCoords = [];
			for (let x = 0; x <= Game.LASTCOL; x++) {
				let searchComplete = false;
				matchingMochisCoords.push([x,y]);
				if (x === Game.LASTCOL) {
					searchComplete = true;
				}
				else {
					if (this.grid[x][y].color === this.grid[x+1][y].color &&
						this.grid[x][y] !== 0) {
						numMatchingMochis += 1;
						matchingMochisCoords.push([x+1,y]);
					}
					else {
						searchComplete = true;
					}
				}

				if (searchComplete) {
					if (numMatchingMochis >= 4) {
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
			for (let y = 0; y <= Game.LASTROW; y++) {
				let searchComplete = false;
				matchingMochisCoords.push([x,y]);
				if (y === Game.LASTROW) {
					searchComplete = true;
				}
				else {
					if (this.grid[x][y].color === this.grid[x][y+1].color &&
						this.grid[x][y] !== 0) {
						numMatchingMochis += 1;
						matchingMochisCoords.push([x+1,y]);
					}
					else {
						searchComplete = true;
					}
				}

				if (searchComplete) {
					if (numMatchingMochis >= 4) {
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
			});
		});

		for (let x = 0; x <= Game.LASTCOL; x++) {
			let shiftFactor = 0;
			for (let y = Game.LASTROW; y >= 0; y--) {
				if (this.grid[x][y] === 0) {
					shiftFactor += 1;
					animateParticules(50 * x, 50 * y);
					// this.grid[y][x].shift = 0;
				}
				else {
					this.grid[x][y].shift = shiftFactor;
				}
			}
		}
	}

	shiftMochis() {
		for (let x = 0; x <= Game.LASTCOL; x++) {
			for (let y = Game.LASTROW; y >=0; y--) {
				if (this.grid[x][y] === 0) {
				
					this.grid[x][y] = new Mochi({game: this, coordX: x, coordY: y});
				}
				else {
					let shiftFactor = this.grid[x][y].shift;
					if (shiftFactor > 0) {
						this.swapMochis(x, y, x, y + shiftFactor+1);
					}
				}

				this.grid[x][y].shift = 0;
			}
		}
	}

	swapMochis(x1, y1, x2, y2) {
		
		let mochiOne = this.grid[x1][y1];
		this.grid[x1][y1] = this.grid[x2][y2];
		this.grid[x2][y2] = mochiOne;
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