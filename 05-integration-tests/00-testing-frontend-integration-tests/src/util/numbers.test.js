import { it, expect, describe } from "vitest";

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

// =============================================================================
// ########################### INTEGRATION TEST ################################
// =============================================================================

describe("cleanNumbers()", () => {
  //| 1. test the core functionality this function whould fulfill and provide
  it("should return an array of number values if an array of string number values is provided", () => {
    const numbers = ["1", "2"];
    const cleanedNumbers = cleanNumbers(numbers);
    expect(cleanedNumbers[0]).toBeTypeOf("number");
  });

  //| NB the teacher adds one more test, but in practice we should add more integration tests
  it("should throw an error if an array with at least one empty string is provided", () => {
    const numbers = ["", "1"];
    const cleanFn = () => cleanNumbers(numbers);
    //| NB here we could test also for a specific error message
    expect(cleanFn).toThrow();
  });
});
