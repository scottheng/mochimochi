/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_animejs__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_animejs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_animejs__);


var canvasEl = document.getElementById('fireworks');
var ctx = canvasEl.getContext('2d');
var numberOfParticules = 30;
var pointerX = 0;
var pointerY = 0;
var tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown';
var colors = ["#EDDC15", "#60872D", "#C73D79", "#004298", "#ffffff"];

// function setCanvasSize() {
//   canvasEl.width = window.innerWidth * 2;
//   canvasEl.height = window.innerHeight * 2;
//   canvasEl.style.width = window.innerWidth + 'px';
//   canvasEl.style.height = window.innerHeight + 'px';
//   canvasEl.getContext('2d').scale(2, 2);
// }

// function updateCoords(e) {
//   pointerX = e.clientX || e.touches[0].clientX;
//   pointerY = e.clientY || e.touches[0].clientY;
// }

function setParticuleDirection(p) {
  var angle = __WEBPACK_IMPORTED_MODULE_0_animejs___default.a.random(0, 360) * Math.PI / 180;
  var value = __WEBPACK_IMPORTED_MODULE_0_animejs___default.a.random(50, 180);
  var radius = [-1, 1][__WEBPACK_IMPORTED_MODULE_0_animejs___default.a.random(0, 1)] * value;
  return {
    x: p.x + radius * Math.cos(angle),
    y: p.y + radius * Math.sin(angle)
  };
}

function createParticule(x,y) {
  var p = {};
  p.x = x;
  p.y = y;
  p.color = colors[__WEBPACK_IMPORTED_MODULE_0_animejs___default.a.random(0, colors.length - 1)];
  p.radius = __WEBPACK_IMPORTED_MODULE_0_animejs___default.a.random(8, 16);
  p.endPos = setParticuleDirection(p);
  p.draw = function() {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
    ctx.fillStyle = p.color;
    ctx.fill();
  };
  return p;
}

function createCircle(x,y) {
  var p = {};
  p.x = x;
  p.y = y;
  p.color = '#FFF';
  p.radius = 0.1;
  p.alpha = .5;
  p.lineWidth = 6;
  p.draw = function() {
    ctx.globalAlpha = p.alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
    ctx.lineWidth = p.lineWidth;
    ctx.strokeStyle = p.color;
    ctx.stroke();
    ctx.globalAlpha = 1;
  };
  return p;
}

function renderParticule(anim) {
  for (var i = 0; i < anim.animatables.length; i++) {
    anim.animatables[i].target.draw();
  }
}

function animateParticules(x, y) {
  var circle = createCircle(x, y);
  var particules = [];
  for (var i = 0; i < numberOfParticules; i++) {
    particules.push(createParticule(x, y));
  }
  __WEBPACK_IMPORTED_MODULE_0_animejs___default.a.timeline().add({
    targets: particules,
    x: function(p) { return p.endPos.x; },
    y: function(p) { return p.endPos.y; },
    radius: 0.1,
    duration: __WEBPACK_IMPORTED_MODULE_0_animejs___default.a.random(1200, 1800),
    easing: 'easeOutExpo',
    update: renderParticule
  })
    .add({
    targets: circle,
    radius: __WEBPACK_IMPORTED_MODULE_0_animejs___default.a.random(80, 160),
    lineWidth: 0,
    alpha: {
      value: 0,
      easing: 'linear',
      duration: __WEBPACK_IMPORTED_MODULE_0_animejs___default.a.random(600, 800),  
    },
    duration: __WEBPACK_IMPORTED_MODULE_0_animejs___default.a.random(1200, 1800),
    easing: 'easeOutExpo',
    update: renderParticule,
    offset: 0
  });
}

var render = __WEBPACK_IMPORTED_MODULE_0_animejs___default()({
  duration: Infinity,
  update: function() {
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
  }
});

/* harmony default export */ __webpack_exports__["a"] = (animateParticules);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fireworks__ = __webpack_require__(0);
// Game View
// stores Game instance
// stores a canvas context to draw the game into
// installs key listeners to remove mochi objects



class Board {
	constructor(game, ctx, $canvas, canvas) {
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
		this.lastFrame = 0;
		this.fpsTime = 0;
		this.frameCount = 0;
		this.fps = 0;
		this.gameStates = { start: 0, ready: 1, checking: 2 };
		this.gameState = this.gameStates.ready;
		this.score = 0;
		this.animationState = 0;
		this.animationTime = 0;
		this.animationTimeTotal = 0.3;
		this.gameOver = false;
		this.drag = false;
		this.currentMove = { column1: 0, row1: 0, column2: 0, row2: 0 };
		this.canvas = canvas;
		this.timerID = null;
	}

	start(time) {
		if (!this.gameOver) {
			this.lastTime = time;
			this.timerID = requestAnimationFrame(this.animate.bind(this));
		}

	}

	end() {
		this.gameOver = true;
		cancelAnimationFrame(this.timerID);
		this.game.reset(this.ctx);
	}

	animate(time) {
		
		const timeDelta = (time - this.lastTime)/500;
		let lastTime = timeDelta;
		this.updateFPS(timeDelta);

		this.game.draw(this.ctx, this.gameState, this.animationState, this.currentMove, this.animationTime, this.animationTimeTotal, this.gameOver );

		if (this.gameState === this.gameStates.ready) {

		}
		else if (this.gameState === this.gameStates.checking) {
			
			this.animationTime += timeDelta;

			if (this.animationState === 0) {
				if (this.animationTime > this.animationTimeTotal) {
					this.game.searchForMatchingMochis();

					if (this.game.matchedMochis.length > 0) {

						for (let i = 0; i < this.game.matchedMochis.length; i++) {
							this.score += 100 * this.game.matchedMochis[i].length;
							$('#score').html(this.score);
						}
		
						this.game.removeMochis();
						this.animationState = 1;
					}
					else {
						this.gameState = this.gameStates.ready;
					}
					this.animationTime = 0;
				}
			}
			else if (this.animationState === 1) {
				if (this.animationTime > this.animationTimeTotal) {
	
					this.game.shiftMochis();
					
					this.animationState = 0;
					this.animationTime = 0;

					this.game.searchForMatchingMochis();

					if (this.game.matchedMochis.length <= 0) {
						this.gameState = this.gameStates.ready;
					}
				}
			}
			else if (this.animationState === 2) {
		
				if (this.animationTime > this.animationTimeTotal) {
					this.game.swapMochis(this.currentMove.column1, this.currentMove.row1,
									this.currentMove.column2, this.currentMove.row2);
					this.game.searchForMatchingMochis();
					if (this.game.matchedMochis.length > 0) {
						this.animationState = 0;
						this.animationTime = 0;
						this.gameState = this.gameStates.checking;
					}
					else {
						this.animationState = 3;
						this.animationTime = 0;
					}
					this.game.matchedMochis = [];
					this.game.searchForMatchingMochis();
				}
			}
			else if (this.animationState === 3) {
				
				if (this.animationTime > this.animationTimeTotal) {
					this.game.swapMochis(this.currentMove.column1, this.currentMove.row1,
									this.currentMove.column2, this.currentMove.row2);
					
					this.gameState = this.gameStates.ready;
				}
			}
			this.game.matchedMochis = [];
			this.game.searchForMatchingMochis();
		}
		requestAnimationFrame(this.start.bind(this));
	}

	updateFPS(delta) {
		if (this.fpsTime > 0.25) {
			this.fps = Math.round(this.frameCount/this.fpsTime);
			this.fpsTime = 0;
			this.frameCount = 0;
		}
		this.fpsTime += delta;
		this.frameCount += 1;

	}

	swapTiles(x1, y1, x2, y2) {
		
		this.currentMove = { column1: x1, row1: y1, column2: x2, row2: y2 };

		this.game.selectedTile.selected = false;

		this.animationState = 2;
		this.animationTime = 0;
		this.gameState = this.gameStates.checking;

	}

	handleMouseMove(e) {

		let pos = this.getMousePos(this.canvas, e);


		if (this.drag && this.game.selectedTile.selected) {
			let mt = this.getMouseTile(pos);

			if (mt.valid) {
				this.swapTiles(mt.x, mt.y, this.game.selectedTile.column, this.game.selectedTile.row);

			}

		}

	}

	handleMouseDown(e) {
		
		let pos = this.getMousePos(this.canvas, e);
		
		if (!this.drag) {
			let mt = this.getMouseTile(pos);
			if (mt.valid) {
				let swapped = false;
				if (this.game.selectedTile.selected) {
					if (mt.x === this.game.selectedTile.column && mt.y === this.game.selectedTile.row) {
						this.game.selectedTile.selected = false;
						this.drag = true;
						return;
					}
					else {
						this.swapTiles(mt.x, mt.y, this.game.selectedTile.column, this.game.selectedTile.row);

						swapped = true;

					}
				}
				if (!swapped) {

					this.game.selectedTile.column = mt.x;
					this.game.selectedTile.row = mt.y;
					this.game.selectedTile.selected = true;
				}
			}
			else {
				this.game.selectedTile.selected = false;
			}

			this.drag = true;
		}
		
	}

	handleMouseUp(e) {
		this.drag = false;
	}

	handleMouseOut(e) {
		this.drag = false;
	}
    
	getMouseTile(pos) {
		
        var tx = Math.floor((pos.x) / 50);
        var ty = Math.floor((pos.y) / 50);
        
        // Check if the tile is valid
        if (tx >= 0 && tx < 10 && ty >= 0 && ty < 10) {
            // Tile is valid
            return {
                valid: true,
                x: tx,
                y: ty
            };
        }
        
        // No valid tile
        return {
            valid: false,
            x: 0,
            y: 0
        };
    }

	getMousePos(canvas, e) {
		let rect = canvas.getBoundingClientRect();
		return {
			x: Math.round((e.clientX - rect.left)/(rect.right - rect.left)*canvas.width),
			y: Math.round((e.clientY - rect.top)/(rect.bottom - rect.top)*canvas.height)
		};
	}


}



/* harmony default export */ __webpack_exports__["a"] = (Board);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mochi__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fireworks__ = __webpack_require__(0);
// holds collection of mochis
// Game.prototype.checkColors checks for matching colored mochis
// Game.prototype.ctx draws the Game
// Keeps track of dimensions of the space, brings falling objects into the screen




class Game {
	constructor() {
		this.matchedMochis = [];
		this.grid = new Array();
		this.selectedTile = {column: 0, row: 0, selected: false};

		for (let x = 0; x <= Game.LASTCOL; x++) {
			this.grid[x] = new Array();

			for (let y = 0; y <= Game.LASTROW; y++) {
				this.grid[x][y] = new __WEBPACK_IMPORTED_MODULE_0__mochi__["a" /* default */]( {coordX: x, coordY: y} );
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
				this.grid[x][y] = new __WEBPACK_IMPORTED_MODULE_0__mochi__["a" /* default */]({game: this, coordX: x, coordY: y});
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
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__fireworks__["a" /* default */])(50 * x, 50 * y);
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
				
					this.grid[x][y] = new __WEBPACK_IMPORTED_MODULE_0__mochi__["a" /* default */]({game: this, coordX: x, coordY: y});
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



/* harmony default export */ __webpack_exports__["a"] = (Game);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// base class for mochi objects
// Most important methods are: Mochi.prototype.fall, Mochi.prototype.draw(ctx), Mochi.prototype.remove

class Mochi {
	constructor(options) {
		this.coordX = options.coordX;
		this.coordY = options.coordY;
		this.radius = 20;
		this.color = options.color || this.randomColor();
		this.game = options.game;
		this.shift = 0;
	}

	draw(ctx) {

		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(
			this.coordX * 50 + this.radius + 5, this.coordY * 50 + this.radius + 5, this.radius, 0, 2 * Math.PI, false
		);
		ctx.fill();

		if (this.color === "#CF6C9A") {
			ctx.strokeStyle = "#C73D79";
			ctx.lineWidth = 3;
			ctx.stroke();

			ctx.beginPath();
			ctx.arc(
				(this.coordX * 50 + this.radius + 5) - 7, (this.coordY * 50 + this.radius + 5) - 2, 4, 0, 2 * Math.PI, false
			);
			ctx.fillStyle = "#C73D79";
			ctx.fill();

			ctx.beginPath();
			ctx.arc(
				(this.coordX * 50 + this.radius + 5) + 7, (this.coordY * 50 + this.radius + 5) - 2, 4, 0, 2 * Math.PI, false
			);
			ctx.fillStyle = "#C73D79";
			ctx.fill();

			// cheek
			ctx.beginPath();
			ctx.ellipse((this.coordX * 50 + this.radius + 5)-10, (this.coordY * 50 + this.radius + 5)+7, 4, 4, 90 * Math.PI/180, 0, 2 * Math.PI);
			ctx.fillStyle = "#D78CAD";
			ctx.fill();

			ctx.beginPath();
			ctx.ellipse((this.coordX * 50 + this.radius + 5)+10, (this.coordY * 50 + this.radius + 5)+7, 4, 4, 90 * Math.PI/180, 0, 2 * Math.PI);
			ctx.fillStyle = "#D78CAD";
			ctx.fill();

			ctx.beginPath();
			ctx.arc(
				(this.coordX * 50 + this.radius + 5), (this.coordY * 50 + this.radius + 5) + 5, 3, 0, Math.PI, false
			);
			
			ctx.lineWidth = 1;
			ctx.stroke();

		}
		else if (this.color === "#F2ECA0") {
			ctx.strokeStyle = "#EDDC15";
			ctx.lineWidth = 3;
			ctx.stroke();

			ctx.beginPath();
			ctx.moveTo((this.coordX * 50 + this.radius + 5)-2, (this.coordY * 50 + this.radius + 5)-4);
			ctx.lineTo((this.coordX * 50 + this.radius + 5)-10,(this.coordY * 50 + this.radius + 5)-8);
			ctx.lineWidth = 3;
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo((this.coordX * 50 + this.radius + 5)-2, (this.coordY * 50 + this.radius + 5)-4);
			ctx.lineTo((this.coordX * 50 + this.radius + 5)-10,(this.coordY * 50 + this.radius + 5));
			ctx.lineWidth = 3;
			ctx.stroke();

			ctx.beginPath();
			ctx.moveTo((this.coordX * 50 + this.radius + 5)+2, (this.coordY * 50 + this.radius + 5)-4);
			ctx.lineTo((this.coordX * 50 + this.radius + 5)+10,(this.coordY * 50 + this.radius + 5)-8);
			ctx.lineWidth = 3;
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo((this.coordX * 50 + this.radius + 5)+2, (this.coordY * 50 + this.radius + 5)-4);
			ctx.lineTo((this.coordX * 50 + this.radius + 5)+10,(this.coordY * 50 + this.radius + 5));
			ctx.lineWidth = 3;
			ctx.stroke();

			// cheek
			ctx.beginPath();
			ctx.ellipse((this.coordX * 50 + this.radius + 5)-10, (this.coordY * 50 + this.radius + 5)+7, 4, 4, 90 * Math.PI/180, 0, 2 * Math.PI);
			ctx.fillStyle = "#E9CEB0";
			ctx.fill();

			ctx.beginPath();
			ctx.ellipse((this.coordX * 50 + this.radius + 5)+10, (this.coordY * 50 + this.radius + 5)+7, 4, 4, 90 * Math.PI/180, 0, 2 * Math.PI);
			ctx.fillStyle = "#E9CEB0";
			ctx.fill();
			
			ctx.beginPath();
			ctx.arc(
				(this.coordX * 50 + this.radius + 5), (this.coordY * 50 + this.radius + 5) + 5, 3, 0, Math.PI, false
			);
			
			ctx.lineWidth = 1;
			ctx.stroke();
		}
		else if (this.color === "#B8C947") {
			ctx.strokeStyle = "#60872D";
			ctx.lineWidth = 3;
			ctx.stroke();

			ctx.beginPath();
			ctx.moveTo((this.coordX * 50 + this.radius + 5)-2, (this.coordY * 50 + this.radius + 5)-4);
			ctx.lineTo((this.coordX * 50 + this.radius + 5)-10,(this.coordY * 50 + this.radius + 5)-8);
			ctx.lineWidth = 3;
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo((this.coordX * 50 + this.radius + 5)-2, (this.coordY * 50 + this.radius + 5)-4);
			ctx.lineTo((this.coordX * 50 + this.radius + 5)-10,(this.coordY * 50 + this.radius + 5));
			ctx.lineWidth = 3;
			ctx.stroke();

			ctx.beginPath();
			ctx.arc(
				(this.coordX * 50 + this.radius + 5) + 7, (this.coordY * 50 + this.radius + 5) - 4, 4, 0, 2 * Math.PI, false
			);
			ctx.fillStyle = "#60872D";
			ctx.fill();

			ctx.beginPath();
			ctx.ellipse((this.coordX * 50 + this.radius + 5)-10, (this.coordY * 50 + this.radius + 5)+7, 4, 4, 90 * Math.PI/180, 0, 2 * Math.PI);
			ctx.fillStyle = "#E9CEB0";
			ctx.fill();

			ctx.beginPath();
			ctx.ellipse((this.coordX * 50 + this.radius + 5)+10, (this.coordY * 50 + this.radius + 5)+7, 4, 4, 90 * Math.PI/180, 0, 2 * Math.PI);
			ctx.fillStyle = "#E9CEB0";
			ctx.fill();

			ctx.beginPath();
			ctx.arc(
				(this.coordX * 50 + this.radius + 5), (this.coordY * 50 + this.radius + 5) + 5, 3, 0, Math.PI, false
			);
			
			ctx.lineWidth = 1;
			ctx.stroke();
		}
		else if (this.color === "#2479AF") {
			ctx.strokeStyle = "#004298";
			ctx.lineWidth = 3;
			ctx.stroke();

			ctx.beginPath();
			ctx.arc(
				(this.coordX * 50 + this.radius + 5) - 7, (this.coordY * 50 + this.radius + 5) - 6, 4, 0, Math.PI, false
			);

			ctx.stroke();

			ctx.beginPath();
			ctx.arc(
				(this.coordX * 50 + this.radius + 5) + 7, (this.coordY * 50 + this.radius + 5) - 6, 4, 0, Math.PI, false
			);

			ctx.stroke();


			ctx.beginPath();
			ctx.ellipse((this.coordX * 50 + this.radius + 5)-10, (this.coordY * 50 + this.radius + 5)+7, 4, 4, 90 * Math.PI/180, 0, 2 * Math.PI);
			ctx.fillStyle = "#D78CAD";
			ctx.fill();

			ctx.beginPath();
			ctx.ellipse((this.coordX * 50 + this.radius + 5)+10, (this.coordY * 50 + this.radius + 5)+7, 4, 4, 90 * Math.PI/180, 0, 2 * Math.PI);
			ctx.fillStyle = "#D78CAD";
			ctx.fill();


			ctx.beginPath();
			ctx.arc(
				(this.coordX * 50 + this.radius + 5), (this.coordY * 50 + this.radius + 5) + 5, 3, 0, 2*Math.PI, false
			);
			ctx.fillStyle = "#004298";
			ctx.fill();


		}
		else if (this.color === "#A495CC") {
			ctx.strokeStyle = "#704782";
			ctx.lineWidth = 3;
			ctx.stroke();	


			ctx.beginPath();
			ctx.arc(
				(this.coordX * 50 + this.radius + 5) - 7, (this.coordY * 50 + this.radius + 5) - 2, 4, 0, 2 * Math.PI, false
			);
			ctx.fillStyle = "#704782";
			ctx.fill();

			ctx.beginPath();
			ctx.arc(
				(this.coordX * 50 + this.radius + 5) + 7, (this.coordY * 50 + this.radius + 5) - 2, 4, 0, 2 * Math.PI, false
			);
			ctx.fillStyle = "#704782";
			ctx.fill();

			// cheek
			ctx.beginPath();
			ctx.ellipse((this.coordX * 50 + this.radius + 5)-10, (this.coordY * 50 + this.radius + 5)+7, 4, 4, 90 * Math.PI/180, 0, 2 * Math.PI);
			ctx.fillStyle = "#D78CAD";
			ctx.fill();

			ctx.beginPath();
			ctx.ellipse((this.coordX * 50 + this.radius + 5)+10, (this.coordY * 50 + this.radius + 5)+7, 4, 4, 90 * Math.PI/180, 0, 2 * Math.PI);
			ctx.fillStyle = "#D78CAD";
			ctx.fill();

			ctx.beginPath();
			ctx.arc(
				(this.coordX * 50 + this.radius + 5), (this.coordY * 50 + this.radius + 5) + 5, 3, 0, Math.PI, false
			);
			
			ctx.lineWidth = 1;
			ctx.stroke();
		}

		else if (this.color === "#FEE8CF") {
			ctx.strokeStyle = "#8D540E";
			ctx.lineWidth = 3;
			ctx.stroke();	


			ctx.beginPath();
			ctx.arc(
				(this.coordX * 50 + this.radius + 5) - 7, (this.coordY * 50 + this.radius + 5) - 2, 4, 0, 2 * Math.PI, false
			);
			ctx.fillStyle = "#8D540E";
			ctx.fill();

			ctx.beginPath();
			ctx.arc(
				(this.coordX * 50 + this.radius + 5) + 7, (this.coordY * 50 + this.radius + 5) - 2, 4, 0, 2 * Math.PI, false
			);
			ctx.fillStyle = "#8D540E";
			ctx.fill();

			// cheek
			ctx.beginPath();
			ctx.ellipse((this.coordX * 50 + this.radius + 5)-10, (this.coordY * 50 + this.radius + 5)+7, 4, 4, 90 * Math.PI/180, 0, 2 * Math.PI);
			ctx.fillStyle = "#D78CAD";
			ctx.fill();

			ctx.beginPath();
			ctx.ellipse((this.coordX * 50 + this.radius + 5)+10, (this.coordY * 50 + this.radius + 5)+7, 4, 4, 90 * Math.PI/180, 0, 2 * Math.PI);
			ctx.fillStyle = "#D78CAD";
			ctx.fill();

			ctx.beginPath();
			ctx.arc(
				(this.coordX * 50 + this.radius + 5), (this.coordY * 50 + this.radius + 5) + 5, 3, 0, Math.PI, false
			);
			
			ctx.lineWidth = 1;
			ctx.stroke();
		}

		else if (this.color === "#FFCCDD") {
			ctx.strokeStyle = "#F38BAB";
			ctx.lineWidth = 3;
			ctx.stroke();	


			ctx.beginPath();
			ctx.arc(
				(this.coordX * 50 + this.radius + 5) - 7, (this.coordY * 50 + this.radius + 5) - 2, 4, 0, 2 * Math.PI, false
			);
			ctx.fillStyle = "#F38BAB";
			ctx.fill();

			ctx.beginPath();
			ctx.arc(
				(this.coordX * 50 + this.radius + 5) + 7, (this.coordY * 50 + this.radius + 5) - 2, 4, 0, 2 * Math.PI, false
			);
			ctx.fillStyle = "#F38BAB";
			ctx.fill();

			// cheek
			ctx.beginPath();
			ctx.ellipse((this.coordX * 50 + this.radius + 5)-10, (this.coordY * 50 + this.radius + 5)+7, 4, 4, 90 * Math.PI/180, 0, 2 * Math.PI);
			ctx.fillStyle = "#D78CAD";
			ctx.fill();

			ctx.beginPath();
			ctx.ellipse((this.coordX * 50 + this.radius + 5)+10, (this.coordY * 50 + this.radius + 5)+7, 4, 4, 90 * Math.PI/180, 0, 2 * Math.PI);
			ctx.fillStyle = "#D78CAD";
			ctx.fill();

			ctx.beginPath();
			ctx.arc(
				(this.coordX * 50 + this.radius + 5), (this.coordY * 50 + this.radius + 5) + 5, 3, 0, Math.PI, false
			);
			
			ctx.lineWidth = 1;
			ctx.stroke();
		}


	}



	randomColor() {
		return Mochi.COLORS[Math.floor(7*Math.random())];
	}

}

Mochi.COLORS = ["#CF6C9A", "#F2ECA0", "#B8C947", "#2479AF", "#A495CC", "#FEE8CF", "#FFCCDD"];
/* harmony default export */ __webpack_exports__["a"] = (Mochi);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__board__ = __webpack_require__(1);



$(document).ready( () => {
	const WIDTH = 500;
	const HEIGHT = 500;

	const canvasEl = document.getElementById("canvas");
	canvasEl.width = WIDTH;
	canvasEl.height = HEIGHT;

	const ctx = canvasEl.getContext("2d");

	const $canvas = $("#canvas");

	$( document ).on('click', '.start', () => {
		$(".start").hide();
		$('#score').html(0);

		const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */]();
		
		const board = new __WEBPACK_IMPORTED_MODULE_1__board__["a" /* default */](game, ctx, $canvas, canvasEl);
	
		board.start(0);
		let time = 29;

		let timer = setInterval(() => {
			$('#time').html(time);
			time--;
		},1000);

		setTimeout(() => {
			board.end();
			clearInterval(timer);
			$('#time').html(0);
			$('#start').html('Play Again?');
			$('.start').show();
		},30000);


		$("#fireworks").mousemove(e => {
			board.handleMouseMove(e);
		});
		$("#fireworks").mousedown(e => {
			board.handleMouseDown(e);
		});
		$("#fireworks").mouseup(e => {
			board.handleMouseUp(e);
		});
		$("#fireworks").mouseout(e => {
			board.handleMouseOut(e);
		});
	});

});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 2017 Julian Garnier
 Released under the MIT license
*/
var $jscomp$this=this;
(function(v,p){ true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (p),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"object"===typeof module&&module.exports?module.exports=p():v.anime=p()})(this,function(){function v(a){if(!g.col(a))try{return document.querySelectorAll(a)}catch(b){}}function p(a){return a.reduce(function(a,d){return a.concat(g.arr(d)?p(d):d)},[])}function w(a){if(g.arr(a))return a;g.str(a)&&(a=v(a)||a);return a instanceof NodeList||a instanceof HTMLCollection?[].slice.call(a):[a]}function F(a,b){return a.some(function(a){return a===b})}
function A(a){var b={},d;for(d in a)b[d]=a[d];return b}function G(a,b){var d=A(a),c;for(c in a)d[c]=b.hasOwnProperty(c)?b[c]:a[c];return d}function B(a,b){var d=A(a),c;for(c in b)d[c]=g.und(a[c])?b[c]:a[c];return d}function S(a){a=a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(a,b,d,h){return b+b+d+d+h+h});var b=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);a=parseInt(b[1],16);var d=parseInt(b[2],16),b=parseInt(b[3],16);return"rgb("+a+","+d+","+b+")"}function T(a){function b(a,b,c){0>
c&&(c+=1);1<c&&--c;return c<1/6?a+6*(b-a)*c:.5>c?b:c<2/3?a+(b-a)*(2/3-c)*6:a}var d=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(a);a=parseInt(d[1])/360;var c=parseInt(d[2])/100,d=parseInt(d[3])/100;if(0==c)c=d=a=d;else{var e=.5>d?d*(1+c):d+c-d*c,l=2*d-e,c=b(l,e,a+1/3),d=b(l,e,a);a=b(l,e,a-1/3)}return"rgb("+255*c+","+255*d+","+255*a+")"}function x(a){if(a=/([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|pc|vw|vh|deg|rad|turn)?/.exec(a))return a[2]}function U(a){if(-1<a.indexOf("translate"))return"px";
if(-1<a.indexOf("rotate")||-1<a.indexOf("skew"))return"deg"}function H(a,b){return g.fnc(a)?a(b.target,b.id,b.total):a}function C(a,b){if(b in a.style)return getComputedStyle(a).getPropertyValue(b.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase())||"0"}function I(a,b){if(g.dom(a)&&F(V,b))return"transform";if(g.dom(a)&&(a.getAttribute(b)||g.svg(a)&&a[b]))return"attribute";if(g.dom(a)&&"transform"!==b&&C(a,b))return"css";if(null!=a[b])return"object"}function W(a,b){var d=U(b),d=-1<b.indexOf("scale")?
1:0+d;a=a.style.transform;if(!a)return d;for(var c=[],e=[],l=[],h=/(\w+)\((.+?)\)/g;c=h.exec(a);)e.push(c[1]),l.push(c[2]);a=l.filter(function(a,c){return e[c]===b});return a.length?a[0]:d}function J(a,b){switch(I(a,b)){case "transform":return W(a,b);case "css":return C(a,b);case "attribute":return a.getAttribute(b)}return a[b]||0}function K(a,b){var d=/^(\*=|\+=|-=)/.exec(a);if(!d)return a;b=parseFloat(b);a=parseFloat(a.replace(d[0],""));switch(d[0][0]){case "+":return b+a;case "-":return b-a;case "*":return b*
a}}function D(a){return g.obj(a)&&a.hasOwnProperty("totalLength")}function X(a,b){function d(c){c=void 0===c?0:c;return a.el.getPointAtLength(1<=b+c?b+c:0)}var c=d(),e=d(-1),l=d(1);switch(a.property){case "x":return c.x;case "y":return c.y;case "angle":return 180*Math.atan2(l.y-e.y,l.x-e.x)/Math.PI}}function L(a,b){var d=/-?\d*\.?\d+/g;a=D(a)?a.totalLength:a;if(g.col(a))b=g.rgb(a)?a:g.hex(a)?S(a):g.hsl(a)?T(a):void 0;else{var c=x(a);a=c?a.substr(0,a.length-c.length):a;b=b?a+b:a}b+="";return{original:b,
numbers:b.match(d)?b.match(d).map(Number):[0],strings:b.split(d)}}function Y(a,b){return b.reduce(function(b,c,e){return b+a[e-1]+c})}function M(a){return(a?p(g.arr(a)?a.map(w):w(a)):[]).filter(function(a,d,c){return c.indexOf(a)===d})}function Z(a){var b=M(a);return b.map(function(a,c){return{target:a,id:c,total:b.length}})}function aa(a,b){var d=A(b);if(g.arr(a)){var c=a.length;2!==c||g.obj(a[0])?g.fnc(b.duration)||(d.duration=b.duration/c):a={value:a}}return w(a).map(function(a,c){c=c?0:b.delay;
a=g.obj(a)&&!D(a)?a:{value:a};g.und(a.delay)&&(a.delay=c);return a}).map(function(a){return B(a,d)})}function ba(a,b){var d={},c;for(c in a){var e=H(a[c],b);g.arr(e)&&(e=e.map(function(a){return H(a,b)}),1===e.length&&(e=e[0]));d[c]=e}d.duration=parseFloat(d.duration);d.delay=parseFloat(d.delay);return d}function ca(a){return g.arr(a)?y.apply(this,a):N[a]}function da(a,b){var d;return a.tweens.map(function(c){c=ba(c,b);var e=c.value,l=J(b.target,a.name),h=d?d.to.original:l,h=g.arr(e)?e[0]:h,m=K(g.arr(e)?
e[1]:e,h),l=x(m)||x(h)||x(l);c.isPath=D(e);c.from=L(h,l);c.to=L(m,l);c.start=d?d.end:a.offset;c.end=c.start+c.delay+c.duration;c.easing=ca(c.easing);c.elasticity=(1E3-Math.min(Math.max(c.elasticity,1),999))/1E3;g.col(c.from.original)&&(c.round=1);return d=c})}function ea(a,b){return p(a.map(function(a){return b.map(function(b){var c=I(a.target,b.name);if(c){var d=da(b,a);b={type:c,property:b.name,animatable:a,tweens:d,duration:d[d.length-1].end,delay:d[0].delay}}else b=void 0;return b})})).filter(function(a){return!g.und(a)})}
function O(a,b,d){var c="delay"===a?Math.min:Math.max;return b.length?c.apply(Math,b.map(function(b){return b[a]})):d[a]}function fa(a){var b=G(ga,a),d=G(ha,a),c=Z(a.targets),e=[],g=B(b,d),h;for(h in a)g.hasOwnProperty(h)||"targets"===h||e.push({name:h,offset:g.offset,tweens:aa(a[h],d)});a=ea(c,e);return B(b,{children:[],animatables:c,animations:a,duration:O("duration",a,d),delay:O("delay",a,d)})}function n(a){function b(){return window.Promise&&new Promise(function(a){return Q=a})}function d(a){return f.reversed?
f.duration-a:a}function c(a){for(var b=0,c={},d=f.animations,e={};b<d.length;){var g=d[b],h=g.animatable,m=g.tweens;e.tween=m.filter(function(b){return a<b.end})[0]||m[m.length-1];e.isPath$1=e.tween.isPath;e.round=e.tween.round;e.eased=e.tween.easing(Math.min(Math.max(a-e.tween.start-e.tween.delay,0),e.tween.duration)/e.tween.duration,e.tween.elasticity);m=Y(e.tween.to.numbers.map(function(a){return function(b,c){c=a.isPath$1?0:a.tween.from.numbers[c];b=c+a.eased*(b-c);a.isPath$1&&(b=X(a.tween.value,
b));a.round&&(b=Math.round(b*a.round)/a.round);return b}}(e)),e.tween.to.strings);ia[g.type](h.target,g.property,m,c,h.id);g.currentValue=m;b++;e={isPath$1:e.isPath$1,tween:e.tween,eased:e.eased,round:e.round}}if(c)for(var k in c)E||(E=C(document.body,"transform")?"transform":"-webkit-transform"),f.animatables[k].target.style[E]=c[k].join(" ");f.currentTime=a;f.progress=a/f.duration*100}function e(a){if(f[a])f[a](f)}function g(){f.remaining&&!0!==f.remaining&&f.remaining--}function h(a){var h=f.duration,
l=f.offset,n=f.delay,P=f.currentTime,q=f.reversed,r=d(a),r=Math.min(Math.max(r,0),h);if(f.children){var p=f.children;if(r>=f.currentTime)for(var u=0;u<p.length;u++)p[u].seek(r);else for(u=p.length;u--;)p[u].seek(r)}r>l&&r<h?(c(r),!f.began&&r>=n&&(f.began=!0,e("begin")),e("run")):(r<=l&&0!==P&&(c(0),q&&g()),r>=h&&P!==h&&(c(h),q||g()));a>=h&&(f.remaining?(t=m,"alternate"===f.direction&&(f.reversed=!f.reversed)):(f.pause(),"Promise"in window&&(Q(),R=b()),f.completed||(f.completed=!0,e("complete"))),
k=0);e("update")}a=void 0===a?{}:a;var m,t,k=0,Q=null,R=b(),f=fa(a);f.reset=function(){var a=f.direction,b=f.loop;f.currentTime=0;f.progress=0;f.paused=!0;f.began=!1;f.completed=!1;f.reversed="reverse"===a;f.remaining="alternate"===a&&1===b?2:b;for(a=f.children.length;a--;)b=f.children[a],b.seek(b.offset),b.reset()};f.tick=function(a){m=a;t||(t=m);h((k+m-t)*n.speed)};f.seek=function(a){h(d(a))};f.pause=function(){var a=q.indexOf(f);-1<a&&q.splice(a,1);f.paused=!0};f.play=function(){f.paused&&(f.paused=
!1,t=0,k=d(f.currentTime),q.push(f),z||ja())};f.reverse=function(){f.reversed=!f.reversed;t=0;k=d(f.currentTime)};f.restart=function(){f.pause();f.reset();f.play()};f.finished=R;f.reset();f.autoplay&&f.play();return f}var ga={update:void 0,begin:void 0,run:void 0,complete:void 0,loop:1,direction:"normal",autoplay:!0,offset:0},ha={duration:1E3,delay:0,easing:"easeOutElastic",elasticity:500,round:0},V="translateX translateY translateZ rotate rotateX rotateY rotateZ scale scaleX scaleY scaleZ skewX skewY".split(" "),
E,g={arr:function(a){return Array.isArray(a)},obj:function(a){return-1<Object.prototype.toString.call(a).indexOf("Object")},svg:function(a){return a instanceof SVGElement},dom:function(a){return a.nodeType||g.svg(a)},str:function(a){return"string"===typeof a},fnc:function(a){return"function"===typeof a},und:function(a){return"undefined"===typeof a},hex:function(a){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a)},rgb:function(a){return/^rgb/.test(a)},hsl:function(a){return/^hsl/.test(a)},col:function(a){return g.hex(a)||
g.rgb(a)||g.hsl(a)}},y=function(){function a(a,d,c){return(((1-3*c+3*d)*a+(3*c-6*d))*a+3*d)*a}return function(b,d,c,e){if(0<=b&&1>=b&&0<=c&&1>=c){var g=new Float32Array(11);if(b!==d||c!==e)for(var h=0;11>h;++h)g[h]=a(.1*h,b,c);return function(h){if(b===d&&c===e)return h;if(0===h)return 0;if(1===h)return 1;for(var m=0,k=1;10!==k&&g[k]<=h;++k)m+=.1;--k;var k=m+(h-g[k])/(g[k+1]-g[k])*.1,l=3*(1-3*c+3*b)*k*k+2*(3*c-6*b)*k+3*b;if(.001<=l){for(m=0;4>m;++m){l=3*(1-3*c+3*b)*k*k+2*(3*c-6*b)*k+3*b;if(0===l)break;
var n=a(k,b,c)-h,k=k-n/l}h=k}else if(0===l)h=k;else{var k=m,m=m+.1,f=0;do n=k+(m-k)/2,l=a(n,b,c)-h,0<l?m=n:k=n;while(1e-7<Math.abs(l)&&10>++f);h=n}return a(h,d,e)}}}}(),N=function(){function a(a,b){return 0===a||1===a?a:-Math.pow(2,10*(a-1))*Math.sin(2*(a-1-b/(2*Math.PI)*Math.asin(1))*Math.PI/b)}var b="Quad Cubic Quart Quint Sine Expo Circ Back Elastic".split(" "),d={In:[[.55,.085,.68,.53],[.55,.055,.675,.19],[.895,.03,.685,.22],[.755,.05,.855,.06],[.47,0,.745,.715],[.95,.05,.795,.035],[.6,.04,.98,
.335],[.6,-.28,.735,.045],a],Out:[[.25,.46,.45,.94],[.215,.61,.355,1],[.165,.84,.44,1],[.23,1,.32,1],[.39,.575,.565,1],[.19,1,.22,1],[.075,.82,.165,1],[.175,.885,.32,1.275],function(b,c){return 1-a(1-b,c)}],InOut:[[.455,.03,.515,.955],[.645,.045,.355,1],[.77,0,.175,1],[.86,0,.07,1],[.445,.05,.55,.95],[1,0,0,1],[.785,.135,.15,.86],[.68,-.55,.265,1.55],function(b,c){return.5>b?a(2*b,c)/2:1-a(-2*b+2,c)/2}]},c={linear:y(.25,.25,.75,.75)},e={},l;for(l in d)e.type=l,d[e.type].forEach(function(a){return function(d,
e){c["ease"+a.type+b[e]]=g.fnc(d)?d:y.apply($jscomp$this,d)}}(e)),e={type:e.type};return c}(),ia={css:function(a,b,d){return a.style[b]=d},attribute:function(a,b,d){return a.setAttribute(b,d)},object:function(a,b,d){return a[b]=d},transform:function(a,b,d,c,e){c[e]||(c[e]=[]);c[e].push(b+"("+d+")")}},q=[],z=0,ja=function(){function a(){z=requestAnimationFrame(b)}function b(b){var c=q.length;if(c){for(var d=0;d<c;)q[d]&&q[d].tick(b),d++;a()}else cancelAnimationFrame(z),z=0}return a}();n.version="2.0.2";
n.speed=1;n.running=q;n.remove=function(a){a=M(a);for(var b=q.length;b--;)for(var d=q[b],c=d.animations,e=c.length;e--;)F(a,c[e].animatable.target)&&(c.splice(e,1),c.length||d.pause())};n.getValue=J;n.path=function(a,b){var d=g.str(a)?v(a)[0]:a,c=b||100;return function(a){return{el:d,property:a,totalLength:d.getTotalLength()*(c/100)}}};n.setDashoffset=function(a){var b=a.getTotalLength();a.setAttribute("stroke-dasharray",b);return b};n.bezier=y;n.easings=N;n.timeline=function(a){var b=n(a);b.pause();
b.duration=0;b.add=function(a){b.children.forEach(function(a){a.began=!0;a.completed=!0});w(a).forEach(function(a){var c=b.duration,d=a.offset;a.autoplay=!1;a.offset=g.und(d)?c:K(d,c);b.seek(a.offset);a=n(a);a.duration>c&&(b.duration=a.duration);a.began=!0;b.children.push(a)});b.reset();b.seek(0);b.autoplay&&b.restart();return b};return b};n.random=function(a,b){return Math.floor(Math.random()*(b-a+1))+a};return n});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map