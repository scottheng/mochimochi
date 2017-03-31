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
		this.lastFrame = 0;
		this.fpsTime = 0;
		this.frameCount = 0;
		this.fps = 0;
		this.gameStates = { start: 0, ready: 1, checking: 2 };
		this.gameState = this.gameStates.start;
		this.score = 0;
		this.animationState = 0;
		this.animationTime = 0;
		this.animationTimeTotal = 0.3;
		this.gameOver = 0;


	}

	start() {
		this.lastTime = 0;
		requestAnimationFrame(this.animate.bind(this));
		this.game.draw(this.ctx);
	}

	animate(time) {
		const timeDelta = (time - this.lastTime)/1000;
		let lastTime = timeDelta;
		this.updateFPS(timeDelta);

		if (this.gameState === this.gameStates.ready) {

		}
		else if (this.gameState === this.gameStates.checking) {
			this.animationTime += timeDelta;

			if (this.animationState === 0) {
				if (this.animationTime > this.animationTimeTotal) {
					this.game.searchForMatchingMochis();

					if (this.game.matchedMochis.length > 0) {
						for (let i = 0; i < this.game.matchedMochis.length; i++) {
							this.score += 100;
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
					this.game.swap(this.mochiCoords[0][1], this.mochiCoords[0][0],
									this.mochiCoords[1][1], this.mochiCoords[1][0]);
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
					this.game.searchForMatchingMochis();
				}
			}
			else if (this.animationState === 3) {

				if (this.animationTime > this.animationTimeTotal) {
					this.game.swap(this.mochiCoords[0][1], this.mochiCoords[0][0],
									this.mochiCoords[1][1], this.mochiCoords[1][0]);
					
					this.gameState = this.gameStates.ready;
				}
			}
			this.game.searchForMatchingMochis();
		}
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
		// this.game.removeMochi(mouseX, mouseY, this.ctx);

		this.mochiCoords.push([mouseX, mouseY]);

		if (this.mochiCoords.length === 2) {
			this.game.switchMochis(this.mochiCoords, this.ctx);

			this.mochiCoords = [];
		}

	}



}



export default Board;