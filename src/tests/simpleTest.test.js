/* jshint esversion: 6 */

import { between, calculateLabel } from './../components/game.js';

describe("between", () => {
  test("Number 5 is between 2 and 7.", () => { expect(between(5, 2, 7)).toBe(true); });
  test("Number 7 is NOT between 2 and 5.", () => { expect(between(7, 2, 5)).toBe(false); });
});

describe("calculateLabel", () => {
  test("Field '0' is labeled 'A1'.", () => { expect(calculateLabel(0)).toBe("A1"); });
  test("Field '1' is labeled 'A2'.", () => { expect(calculateLabel(1)).toBe("A2"); });
  test("Field '2' is labeled 'A3'.", () => { expect(calculateLabel(2)).toBe("A3"); });
  test("Field '3' is labeled 'B1'.", () => { expect(calculateLabel(3)).toBe("B1"); });
  test("Field '4' is labeled 'B2'.", () => { expect(calculateLabel(4)).toBe("B2"); });
  test("Field '5' is labeled 'B3'.", () => { expect(calculateLabel(5)).toBe("B3"); });
  test("Field '6' is labeled 'C1'.", () => { expect(calculateLabel(6)).toBe("C1"); });
  test("Field '7' is labeled 'C2'.", () => { expect(calculateLabel(7)).toBe("C2"); });
  test("Field '8' is labeled 'C3'.", () => { expect(calculateLabel(8)).toBe("C3"); });
});
