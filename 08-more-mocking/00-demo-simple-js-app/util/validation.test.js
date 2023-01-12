import { it, expect } from "vitest";
import { validateNotEmpty } from "./validation";

it("should throw an error if an empty string is provided as input value", () => {
  const inputText = "";
  const resultFn = () => validateNotEmpty(inputText);
  expect(resultFn).toThrow();
});

it("should throw an error if a string with only blanks is provided as input value", () => {
  const inputText = "     ";
  const resultFn = () => validateNotEmpty(inputText);
  expect(resultFn).toThrow();
});

it("should throw an error with the provided error message, if an error is thrown", () => {
  const testInput = "";
  const testErrorMessage = "test";

  const validationFn = () => validateNotEmpty(testInput, testErrorMessage);

  expect(validationFn).toThrow(testErrorMessage);
});
