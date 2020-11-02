/* jshint esversion: 6 */

import React from "react";
import { render } from "@testing-library/react";

import Game from "./../components/game.js";

describe("game", () => {
  test("Renders game component.", () => {
    render(<Game />);
  });
});
