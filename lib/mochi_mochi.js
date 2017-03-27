import Game from './game';

document.addEventListener("DOMContentLoaded", () => {
	const canvasEl = document.getElementById("canvas");

	const ctx = canvasEl.getContext("2d");
	const game = new Game();
});