import { it, expect } from "vitest";
import { validateStringNotEmpty, validateNumber } from "./validation";

it("should throw error if a string is empty", () => {
  const input = "";

  const resultFn = () => {
    validateStringNotEmpty(input);
  };

  expect(resultFn).toThrow();
});

it("should not throw error if a string is not empty", () => {
  const input = "a";

  const resultFn = () => {
    validateStringNotEmpty(input);
  };

  expect(resultFn).not.toThrow();
});

it("should throw an error for numbers", () => {
  const input = 1;

  const resultFn = () => {
    validateStringNotEmpty(input);
  };

  expect(resultFn).toThrow();
});

it("should throw an error for arrays and objects", () => {
  const input1 = {};
  const input2 = [];

  const resultFn1 = () => {
    validateStringNotEmpty(input1);
  };

  const resultFn2 = () => {
    validateStringNotEmpty(input2);
  };

  expect(resultFn1).toThrow();
  expect(resultFn2).toThrow();
});
