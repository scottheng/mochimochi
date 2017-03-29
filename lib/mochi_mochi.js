import Game from './game';
import Board from './board';

document.addEventListener("DOMContentLoaded", () => {
	const WIDTH = 500;
	const HEIGHT = 500;

	const canvasEl = document.getElementById("canvas");
	canvasEl.width = WIDTH;
	canvasEl.height = HEIGHT;

	const ctx = canvasEl.getContext("2d");

	const $canvas = $("#canvas");
	const canvasOffset = $canvas.offset();
	const offsetX = canvasOffset.left;
	const offsetY = canvasOffset.top;
	const scrollX = $canvas.scrollLeft();
	const scrollY = $canvas.scrollTop();
	$("#canvas").mousedown(function (e) {
		handleMouseDown(e);
	});
	$("#canvas").mouseup(function (e) {
		handleMouseUp(e);
	});

	var rowCount = 7;
	var rowHeight = 50;
	var colCount = 7;
	var colWidth = 50;
	const game = new Game();

	// new Board(game, ctx).start();
	ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

	for (let y = 0; y < Game.ROWS; y++) {
		for (let x = 0; x < Game.COLS; x++) {

			ctx.rect(x * colWidth, y * rowHeight, colWidth, rowHeight);
			

			ctx.fillStyle = "#B8C947";
			ctx.beginPath();
			ctx.arc(
				x* 50 + 25, y * 50 + 25, 20, 0, 2 * Math.PI, false
			);
			ctx.fill();
			ctx.strokeStyle = "#60872D";
			ctx.lineWidth = 3;
			ctx.stroke();
		}
	}

	let startX, startY, mouseX, mouseY;
	let isDown = false;

	function handleMouseDown(e) {
		e.preventDefault();
		e.stopPropagation();

		startX = parseInt(e.clientX - offsetX);
		startY = parseInt(e.clientY - offsetY);

		// console.log(startX);
		// console.log(startY);

		isDown = true;
	}

	function handleMouseUp(e) {
		e.preventDefault();
		e.stopPropagation();

		mouseX = parseInt(e.clientX - offsetX);
		mouseY = parseInt(e.clientY - offsetY);

		isDown = false;

		removeMochi();

	}

	function removeMochi() {
		const startCol = parseInt(startX / 50);
		console.log(startCol);
		const startRow = parseInt(startY/50);
		console.log(startRow);

		let x = startCol;
		let y = startRow;
	
		ctx.save();
		ctx.fillStyle = "red";
		ctx.globalAlpha = 0.25;
        ctx.globalCompositeOperation = "destination-over";
        ctx.clearRect((x) * colWidth + 2, (y) * rowHeight + 2, colWidth - 4, rowHeight - 4);
		
        ctx.restore();
	}
});