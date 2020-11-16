/* jshint esversion: 6 */

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import Game from "./../components/game.js";

describe("game", () => {
  test("Renders game component.", () => {
    render(<Game />);
  });

  test("Find some specific text in the document.", () => {
    render(<Game />);
    expect(screen.getByText("Now player: ✗")).toBeInTheDocument();
    expect(screen.getByText("Sort buttons")).toBeInTheDocument();
    expect(screen.getByText("Go to the beggining")).toBeInTheDocument();
  });
});
