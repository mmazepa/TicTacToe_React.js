/* jshint esversion: 6 */

import { between, calculateLabel, checkFieldWithLabel } from "./../components/game.js";
import { signs, labels } from "./../constants/constants.js";

describe("\"between\" function", () => {
    test("Number 5 is between 2 and 7.", () => { expect(between(5, 2, 7)).toBe(true); });
    test("Number 5 is between 7 and 2.", () => { expect(between(5, 7, 2)).toBe(true); });
    test("Number 7 is NOT between 2 and 5.", () => { expect(between(7, 2, 5)).toBe(false); });
    test("Number 7 is NOT between 5 and 2.", () => { expect(between(7, 5, 2)).toBe(false); });
});

describe("\"calculateLabel\" function", () => {
    labels.forEach((item, index) => {
        test("Field \"" + index + "\" is labeled \"" + item + "\".", () => {
            expect(calculateLabel(index)).toBe(item);
        });
    });
});

describe("\"checkFieldWithLabel\" function", () => {
    let squares1 = new Array(9);
    let squares2 = new Array(9);
    labels.forEach((item, index) => {
        test("Last assigned field is \"" + item + "\".", () => {
            squares2[index] = signs[index%2];
            expect(checkFieldWithLabel(squares1, squares2)).toBe(item);
            squares1[index] = squares2[index];
        });
    });
});
