# Mochi Mochi Javascript Project Proposal

## Background

Mochi Mochi is an tile-matching arcade game inspired by Disney Tsum Tsum. The goal of the game is to connect 3 or more of the same colored mochis. The more you connect, the higher you score. Connecting 7 or more mochis will give you a magical bubble that will clear surrounding mochis.

## Minimum Viable Product features

This JS game will satisfy the following criteria with smooth, bug-free gameplay:

- [ ] Start and reset the game board
- [ ] Score points by connecting at least three same-colored mochis
- [ ] Score more points by connecting at least four mochis
- [ ] Spawn magical bubble when connecting at least seven mochis
- [ ] Production README

## Wireframes
![alt text][wireframe]

[wireframe]: /docs/wireframes/mochi-mochi.png "mochi-mochi"

This app will consist of a game board and a START button. The user can also click on "How to play" to get instructions for the game. When the game ends, the user's score will pop up in a modal, giving an option to play again.

## Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla javascript and `jQuery` for overall structure and game logic
- `HTML5 Canvas` for DOM manipulation and rendering
- `anime.js` for CSS animations
- Webpack for bundling scripts

In addition to the webpack entry file, the following scripts will be used in this project:

`board.js`: this script will handle creating and updating the necessary `HTML5 Canvas` elements

`mochi.js`: this script will handle the game logic

## Implementation Timeline

### Day 1: 

- Render game board on Canvas
- Render mochi objects on game board

### Day 2:

- Remove mochi objects by matching three same-colored mochis
- Replace removed mochis with new falling mochis

### Day 3:

- Assign points to number of mochis removed; render magical bubble
- Add event listeners/click events for user interaction

### Day 4:

- Style webpage, add 'How to play', score keeper

### Bonus Features

- [ ] Mobile capability
- [ ] Special effects for different mochi characters
- [ ] Levels of difficulty 