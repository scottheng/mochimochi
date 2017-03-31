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


	// $(".start").click(() =>{
		const game = new Game();
		
		const board = new Board(game, ctx, $canvas, canvasEl);
		board.start(0);

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
	// });

});