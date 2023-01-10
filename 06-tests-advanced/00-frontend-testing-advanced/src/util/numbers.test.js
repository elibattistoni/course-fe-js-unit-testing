import { describe, it, expect } from "vitest";

import { cleanNumbers, transformToNumber } from "./numbers";

describe("transformToNumber()", () => {
  it("should transform a string number to a number of type number", () => {
    const input = "1";

    const result = transformToNumber(input);

    expect(result).toBeTypeOf("number");
  });

  it("should transform a string number to a number of type number", () => {
    const input = "1";

    const result = transformToNumber(input);

    expect(result).toBe(+input);
  });

  it("should yield NaN for non-transformable values", () => {
    const input = "invalid";
    const input2 = {};

    const result = transformToNumber(input);
    const result2 = transformToNumber(input2);

    expect(result).toBeNaN();
    expect(result2).toBeNaN();
  });
});

describe("cleanNumbers()", () => {
  it("should return an array of number values if an array of string number values is provided", () => {
    const numberValues = ["1", "2"];

    const cleanedNumbers = cleanNumbers(numberValues);

    // expect(cleanedNumbers[0]).toBeTypeOf('number');
    // expect(cleanedNumbers).toBe([1, 2]);
    //| NB there is a difference between primitive values (e.g. numbers, strings) and reference values (e.g. objects ; reference values == "stored in memory"):
    //| therefore if you create an object, even if it has the same shape and the same properties, they will still occupy different places in memory, and therefore they are treated as totally different values
    //| 1 == 1 this is true
    //| {} == {} this is false
    //| NB .toBe() checks for EXACT equality, and two arrays, even if they look equal, they are note exactly the same object
    //| NB for convenience however, Vitest and JEST also have a .toEqual() method,
    //| which does not check for exact equality, but it goes through the value you pass to .toEqual()
    //| and it does a deep comparison of that value with the value that you are evaluating
    expect(cleanedNumbers).toEqual([1, 2]);
  });

  it("should throw an error if an array with at least one empty string is provided", () => {
    const numberValues = ["", 1];

    const cleanFn = () => cleanNumbers(numberValues);

    expect(cleanFn).toThrow();
  });
});
