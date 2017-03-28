import Game from './game';
import Board from './board';

document.addEventListener("DOMContentLoaded", () => {
	const WIDTH = 600;
	const HEIGHT = 360;

	const canvasEl = document.getElementById("canvas");
	canvasEl.width = WIDTH;
	canvasEl.height = HEIGHT;

	const ctx = canvasEl.getContext("2d");
	const game = new Game();

	new Board(game, ctx).start();



});