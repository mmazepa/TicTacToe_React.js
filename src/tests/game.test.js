/* jshint esversion: 6 */

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import Game from "./../components/game.js";

describe("game", () => {
  test("Renders game component.", () => {
    render(<Game />);
  });

  test("Search for the initial text to be in the document.", () => {
    render(<Game />);
    expect(screen.getByText("Teraz gracz: ✗")).toBeInTheDocument();
    expect(screen.getByText("Sortuj")).toBeInTheDocument();
    expect(screen.getByText("Przejdź na początek gry")).toBeInTheDocument();
  });
});
