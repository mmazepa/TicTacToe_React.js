/* jshint esversion: 6 */

import { between, calculateLabel } from "./../components/game.js";

describe("\"between\" function", () => {
    test("Number 5 is between 2 and 7.", () => { expect(between(5, 2, 7)).toBe(true); });
    test("Number 7 is NOT between 2 and 5.", () => { expect(between(7, 2, 5)).toBe(false); });
});

describe("\"calculateLabel\" function", () => {
    const labels = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];
    for (let i = 0; i < labels.length; i++) {
        test("Field '" + i + "' is labeled '" + labels[i] + "'.", () => {
            expect(calculateLabel(i)).toBe(labels[i]);
        });
    }
});
