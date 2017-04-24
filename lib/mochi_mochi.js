import Game from './game';
import Board from './board';

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
		$(".how-to-gif").hide();
		$('#score').html(0);

		const game = new Game();
		
		const board = new Board(game, ctx, $canvas, canvasEl);
	
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