/* jshint esversion: 6 */

import React from "react";
import Board from "./board.js";

const signs = ["✘", "〇"];

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? signs[0] : signs[1];
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });

        this.handleHistoryClick(squares.length, i);
        selectLastClicked(squares.length, i);
    }

    async handleHistoryClick(length, index, object) {
        if (object !== null && object !== undefined) {
            selectLastClicked(length, object);
        } else {
            selectLastClicked(length, -1);
        }
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        for (var i = 0; i < history.length; i++) {
            var id = "button" + i;
            await document.getElementById(id).classList.remove("activeButton");
        }
        await document.getElementById("button" + this.state.stepNumber).classList.add("activeButton");
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
        for (var i = 0; i < 9; i++) {
            var id = "square" + i;
            document.getElementById(id).classList.remove("winSquare");
        }
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                "Move #" + move + ": " + ((move % 2) ? signs[0] : signs[1]) + " on " + checkFieldWithLabel(history[move-1].squares, history[move].squares) :
                "Go to the beggining";
            return (
                <li key={move} id={"li" + move}>
                    <button id={"button" + move}
                            className="button activeButton"
                            onClick={() => {
                                this.jumpTo(move);
                                this.handleHistoryClick(current.squares.length, move, ((move-1 >= 0) ? checkField(history[move-1].squares, history[move].squares) : null));
                            }}>
                        {desc}
                    </button>
                    {history[this.state.stepNumber][0]}
                </li>
            );
        });

        let status;
        if (winner) {
            status = "The winner is: " + winner.sign;
            winner.squares.map((elem) => {
                var id = "square" + elem;
                document.getElementById(id).classList.add("winSquare");
                return null;
            });
        } else if (!winner && history.length === 10 && this.state.stepNumber === 9) {
            status = "Lack of moves, DRAW";
        } else {
            status = "Now player: " + (this.state.xIsNext ? signs[0] : signs[1]);
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <button className="sortButton" onClick={() => sortButtons()}>
                        Sort buttons
                    </button>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}
export default Game;

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            const winnerObject = {
                sign: squares[a],
                squares: lines[i],
            };
            return winnerObject;
        }
    }
    return null;
};

const sortButtons = () => {
    var buttons = document.getElementsByTagName("li");

    var return1 = -1;
    var return2 = 1;

    if (buttons[0].id === "li0") {
        return2 = [return1, return1 = return2][0];
    }

    buttons = Array.prototype.slice.call(buttons);
    buttons.sort(function(a, b) {
        if (a.id < b.id) {
            return return1;
        } else {
            return return2;
        }
    });
    var container = buttons[0].parentElement;
    container.innerHTML = "";

    for (var i = 0, l = buttons.length; i < l; i++) {
        container.appendChild(buttons[i]);
    }
};

const checkField = (squares1, squares2) => {
    for (var i = 0; i < squares1.length; i++) {
        if (String(squares1[i]).localeCompare(String(squares2[i]))) {
            return i;
        }
    }
};

const checkFieldWithLabel = (squares1, squares2) => {
    return calculateLabel(checkField(squares1, squares2));
};

export const calculateLabel = (num) => {
    let number = num%3+1;
    let letter = ""
    if (between(num, 0, 2))
        letter = "A";
    else if (between(num, 3, 5))
        letter = "B";
    else if (between(num, 6, 8))
        letter = "C";
    return letter + number;
};

export const between = (x, min, max) => {
    if (min > max) [min, max] = [max, min];
    return x >= min && x <= max;
};

const selectLastClicked = (length, index) => {
    for (var count = 0; count < length; count++) {
        document.getElementById("square" + count).classList.remove("lastClicked");
    }

    if (index >= 0) {
        document.getElementById("square" + index).classList.add("lastClicked");
    }
}
