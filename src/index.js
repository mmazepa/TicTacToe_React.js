/* jshint esversion: 6 */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

function Square(props) {
    return (
        <button id={props.id}
            className="square"
            onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                id={"square" + i}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    renderBoard() {
        let board = [];
        for (var i = 0; i < 3; i++) {
            let squares = [];
            for (var j = 0; j < 3; j++) {
                squares.push(this.renderSquare(3*i+j));
            }
            board.push(<div className="board-row">{squares}</div>);
        }
        return board;
    }

    render() {
        return (
            <div>
                {this.renderBoard()}
            </div>
        );
    }
}

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
        squares[i] = this.state.xIsNext ? '✗' : '〇';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });

        this.handleHistoryClick();
    }

    async handleHistoryClick() {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        for (var i = 0; i < history.length; i++) {
            var id = "button" + i;
            await document.getElementById(id).classList.remove("activeButton");
        };
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
        };
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Przejdź do ruchu #' + move :
                'Przejdź na początek gry';
            return (
                <li key={move}>
                    <button id={"button" + move}
                            className="button activeButton"
                            onClick={() => {
                                this.jumpTo(move);
                                this.handleHistoryClick();
                            }}>
                        {desc}
                    </button>
                    {history[this.state.stepNumber][0]}
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Wygrywa: ' + winner.sign;
            winner.squares.map((elem) => {
                var id = "square" + elem;
                document.getElementById(id).classList.add("winSquare");
                return null;
            });
        } else if (!winner && history.length === 10 && this.state.stepNumber === 9) {
            status = 'Brak ruchów, REMIS';
        } else {
            status = 'Teraz gracz: ' + (this.state.xIsNext ? '✗' : '〇');
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
                        Sortuj
                    </button>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {
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
}

function sortButtons() {
    var buttons = document.getElementsByClassName("button");

    var return1 = -1;
    var return2 = 1;

    if (buttons[0].id === "button0") {
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
    var container = buttons[0].parentElement.parentElement;
    container.innerHTML = "";

    for (var i = 0, l = buttons.length; i < l; i++) {
        const li = document.createElement("li");
        li.appendChild(buttons[i]);
        container.appendChild(li);
    }
}
