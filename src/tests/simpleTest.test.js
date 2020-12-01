/* jshint esversion: 6 */

import { between, calculateLabel, checkFieldWithLabel } from "./../components/game.js";

const signs = ["✘", "〇"];

describe("\"between\" function", () => {
    test("Number 5 is between 2 and 7.", () => { expect(between(5, 2, 7)).toBe(true); });
    test("Number 5 is between 7 and 2.", () => { expect(between(5, 7, 2)).toBe(true); });
    test("Number 7 is NOT between 2 and 5.", () => { expect(between(7, 2, 5)).toBe(false); });
    test("Number 7 is NOT between 5 and 2.", () => { expect(between(7, 5, 2)).toBe(false); });
});

describe("\"calculateLabel\" function", () => {
    const labels = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];
    for (let i = 0; i < labels.length; i++) {
        test("Field \"" + i + "\" is labeled \"" + labels[i] + "\".", () => {
            expect(calculateLabel(i)).toBe(labels[i]);
        });
    }
});

describe("\"checkFieldWithLabel\" function", () => {
    let squares1 = ["", "", "", "", "", "", "", "", ""];
    let squares2 = ["", "", "", "", "", "", "", "", ""];
    const labels = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];
    for (let i = 0; i < labels.length; i++) {
        test("Last assigned field is \"" + labels[i] + "\".", () => {
            squares2[i] = signs[i%2];
            expect(checkFieldWithLabel(squares1, squares2)).toBe(labels[i]);
            squares1[i] = squares2[i];
        });
    }
});
