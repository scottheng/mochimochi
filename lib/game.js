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
				this.grid[x][y] = new Mochi( {coordX: x, coordY: y} );
			}
		}

		this.createStartBoard();
	
	}


	draw(ctx, gameState, animationState, currentMove, animationTime, animationTimeTotal, gameOver) {

		ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

		for (let x = 0; x < Game.COLS; x++) {
			for (let y = 0; y < Game.ROWS; y++) {
				if (this.grid[x][y] !== 0) {
					this.grid[x][y].draw(ctx);
				}
			}
		}

		if (gameState === 2 && (animationState === 2 || animationState === 3)) {
	
			let shiftX = currentMove.column2 - currentMove.column1;
			let shiftY = currentMove.row2 - currentMove.row1;

			let coord1 = this.getTileCoordinate(currentMove.column1, currentMove.row1, 0, 0);
			let coord1Shift = this.getTileCoordinate(currentMove.column1, currentMove.row1, (animationTime / animationTimeTotal) * shiftX, (animationTime/animationTimeTotal)*shiftY);
			let mochiOne = this.grid[currentMove.column1][currentMove.row1];

			let coord2 = this.getTileCoordinate(currentMove.column2, currentMove.row2, 0, 0);
			let coord2Shift = this.getTileCoordinate(currentMove.column2, currentMove.row2, (animationTime / animationTimeTotal) * -shiftX, (animationTime/animationTimeTotal)* -shiftY);
			let mochiTwo = this.grid[currentMove.column2][currentMove.row2];			

			if (animationState === 2) {
				mochiOne.draw(ctx);
				mochiTwo.draw(ctx);
			}
			else {
				mochiTwo.draw(ctx);
				mochiOne.draw(ctx);
			}
		}

	}

	reset(ctx) {
		ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	}


	getTileCoordinate(column, row, columnOffset, rowOffset) {
        var tileX = (column + columnOffset) * 50;
        var tileY = (row + rowOffset) * 50;
        return { tileX: tileX, tileY: tileY};
	}

	createStartBoard() {

		for (let x = 0; x <= Game.LASTCOL; x++) {
			for (let y = 0; y <= Game.LASTROW; y++) {
				this.grid[x][y] = new Mochi({game: this, coordX: x, coordY: y});
			}
		}
		this.searchBoard();



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
		
			for (let x = 0; x <= Game.LASTCOL; x++) {
				let searchComplete = false;

				if (x === Game.LASTCOL) {
					searchComplete = true;
				}
				else {
					if (this.grid[x][y].color === this.grid[x+1][y].color &&
						this.grid[x][y] !== 0) {
						numMatchingMochis += 1;

					}
					else {
						searchComplete = true;
					}
				}

				if (searchComplete) {
					if (numMatchingMochis >= 3) {
                        this.matchedMochis.push({ column: x+1-numMatchingMochis, row:y,
                                        length: numMatchingMochis, horizontal: true });
					}

					numMatchingMochis = 1;
				}

			}
		}

		for (let x = 0; x <= Game.LASTCOL; x++) {
			let numMatchingMochis = 1;

			for (let y = 0; y <= Game.LASTROW; y++) {
				let searchComplete = false;

				if (y === Game.LASTROW) {
					searchComplete = true;
				}
				else {
					if (this.grid[x][y].color === this.grid[x][y+1].color &&
						this.grid[x][y] !== 0) {
						numMatchingMochis += 1;

					}
					else {
						searchComplete = true;
					}
				}

				if (searchComplete) {
					if (numMatchingMochis >= 3) {
                        this.matchedMochis.push({ column: x, row:y+1-numMatchingMochis,
                                        length: numMatchingMochis, horizontal: false });
					}

					numMatchingMochis = 1;
				}

			}
		}

	}

	removeMochis() {
		
		this.matchedMochis.forEach(matchingSets => {
			if (matchingSets.horizontal) {
				for (let y = matchingSets.column; y < matchingSets.column + matchingSets.length; y++) {
					this.grid[y][matchingSets.row] = 0;
				}
			}
			else {
				for (let x = matchingSets.row; x < matchingSets.row + matchingSets.length; x++) {
					this.grid[matchingSets.column][x] = 0;
				}
			}
		});

		for (let x = 0; x <= Game.LASTCOL; x++) {
			let shiftFactor = 0;
			for (let y = Game.LASTROW; y >= 0; y--) {
				if (this.grid[x][y] === 0) {
					shiftFactor += 1;
					animateParticules(50 * x, 50 * y);
					document.getElementById('pop').play();
				}
				else {
					this.grid[x][y].shift = shiftFactor;
				}
			}
		}
		// this.matchedMochis = [];

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
						this.swapMochis(x, y, x, y + shiftFactor);
					}
				}
					this.grid[x][y].shift = 0;

			}
		}
		this.matchedMochis = [];
	}

	swapMochis(x1, y1, x2, y2) {
		
		let mochiOne = this.grid[x1][y1].color;
		this.grid[x1][y1].color = this.grid[x2][y2].color;
		this.grid[x2][y2].color = mochiOne;
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