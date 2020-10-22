/* jshint esversion: 6 */

import React from "react";

function Square(props) {
    return (
        <button id={props.id}
            className="square"
            onClick={props.onClick}>
            {props.value}
            <span class="fieldLabel">{props.label}</span>
        </button>
    );
}
export default Square;
