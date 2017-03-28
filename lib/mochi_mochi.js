import Game from './game';

document.addEventListener("DOMContentLoaded", () => {
	const WIDTH = 240;
	const HEIGHT = 360;

	const canvasEl = document.getElementById("canvas");
	canvasEl.width = WIDTH;
	canvasEl.height = HEIGHT;

	const ctx = canvasEl.getContext("2d");
	const game = new Game();

});