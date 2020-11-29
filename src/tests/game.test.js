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
        expect(screen.getByText(/Now player: /i)).toBeInTheDocument();
        expect(screen.getByText("Sort buttons")).toBeInTheDocument();
        expect(screen.getByText("Go to the beggining")).toBeInTheDocument();

        const labels = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];
        for (let i = 0; i < labels.length; i++) {
            expect(screen.getByText(labels[i])).toBeInTheDocument();
        }
    });
});
