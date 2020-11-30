# Tic Tac Toe - React.js

![npm](https://img.shields.io/badge/npm-7.0.3-blue)
![react](https://img.shields.io/badge/react-16.13.1-blue)

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info

Simple Tic Tac Toe (noughts and crosses, Xs and Os) game made with **React.js**. Bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

**Features:**
* multiplayer game mode - on one computer only (no AI or script-controlled opponent),
* "going back in time" - ability to go back to any move,
* sort back-buttons (the ones used to "go back in time") - ascending and descending,
* view history of your moves,
* view coordinates of every move saved in history of moves (e.g. ✘ on A1, 〇 on B2 etc.),
* highlight current move in the history of moves,
* highlight the three fields which ensured victory,
* information about the draw if the game ends due to lack of moves.

## Technologies

* **React.js** with **React JSX** syntax,
* **Sass** with **SCSS** syntax.

## Setup

To run this project, install it locally using **npm**:

```
$ cd ../TicTacToe_React.js
$ npm install
```

Then you can:

* `npm start` - launch the application and go to the [http://localhost:3000](http://localhost:3000) to play the game,
* `npm test` - launch all available tests.
