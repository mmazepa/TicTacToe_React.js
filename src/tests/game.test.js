/* jshint esversion: 6 */

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Game from "./../components/game.js";
import { labels } from "./../constants/constants.js";

describe("game", () => {
    test("Renders game component.", () => {
        render(<Game />);
    });

    test("Find some specific text in the document.", () => {
        render(<Game />);
        expect(screen.getByText(/Now player: /i)).toBeInTheDocument();
        expect(screen.getByText("Sort buttons")).toBeInTheDocument();
        expect(screen.getByText("Go to the beginning")).toBeInTheDocument();

        labels.forEach((item, index) => {
            expect(screen.getByText(item)).toBeInTheDocument();
        });
    });
});
