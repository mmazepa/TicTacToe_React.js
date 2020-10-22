/* jshint esversion: 6 */

import React from "react";
import Square from "./square.js";

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                key={"square" + i}
                id={"square" + i}
                value={this.props.squares[i]}
                label={calculateLabel(i)}
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
            board.push(<div key={"row" + i} className="board-row">{squares}</div>);
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
export default Board;

function calculateLabel(num) {
    if (between(num, 0, 2))
        return "A" + (num%3+1);
    else if (between(num, 3, 5))
        return "B" + (num%3+1);
    else if (between(num, 6, 8))
        return "C" + (num%3+1);
}

function between(x, min, max) {
  return x >= min && x <= max;
}
