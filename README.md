# Mochi Mochi

Play [Mochi Mochi][website] !

[website]: https://scottheng.github.io/mochimochi

[![https://gyazo.com/a39fefbdb96c65e3eba7cded37efe42f](https://i.gyazo.com/a39fefbdb96c65e3eba7cded37efe42f.gif)](https://gyazo.com/a39fefbdb96c65e3eba7cded37efe42f)


Mochi Mochi is an tile-matching arcade game inspired by Bejeweled and Candy Crush. The goal of the game is to connect 3 or more of the same colored mochis. The more you connect, the higher you score! It's a race against the clock to see how many points you can score.

## Features and Implementation

This game uses JavaScript, jQuery for event listeners, and the anime.js library for CSS animations.

The main logic of the game is shown in the following code. Matching mochis are searched for and then removed from the game board. The remaining mochis on the board are then shifted down to fill in the gaps and new mochis are created to fill the board. The board is then searched again to determine whether matching mochis were formed during the shift.

```javascript
searchBoard() {
	this.searchForMatchingMochis();
	while (this.matchedMochis.length > 0) {
		this.removeMochis();
		this.shiftMochis();
		this.searchForMatchingMochis();
	}
}
```
### Search for Matching Mochis

The `searchForMatchingMochis` method checks the neighbors of each mochi to determine if the color is the same. The example code below checks all the neighboring mochis to the right. For each search, the search ends when the neighboring mochi is not the same color and evaluates the chain length.

```javascript
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

```

## Future Direction

### Mobile implementation
I plan to recreate this game in a mobile app to utilize touch functionalities.

### AI to determine highest scoring combos
I plan to program an AI to play the game that will look for the move that produces the highest score for each turn.

