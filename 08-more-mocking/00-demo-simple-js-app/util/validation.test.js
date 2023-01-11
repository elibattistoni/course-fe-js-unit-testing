import { it, expect } from "vitest";
import { validateNotEmpty } from "./validation";

it("should not throw an error if text input is a valid string", () => {
  const inputText = "some text";
  const resultFn = () => {
    validateNotEmpty(inputText, "error message");
  };
  expect(resultFn).not.toThrow();
});

it("should throw error if text input is an empty string", () => {
  const inputText = "";
  const resultFn = () => {
    validateNotEmpty(inputText, "error message");
  };
  expect(resultFn).toThrow();
});

it("should thorw an error if text is not a string", () => {
  const inputText1 = 0;
  const resultFn1 = () => {
    validateNotEmpty(inputText1, "error message");
  };
  expect(resultFn1).toThrow();

  const inputText2 = true;
  const resultFn2 = () => {
    validateNotEmpty(inputText2, "error message");
  };
  expect(resultFn2).toThrow();
});

it("should not throw an error if no error message is provided", () => {
  const inputText = "some text";
  const resultFn = () => {
    validateNotEmpty(inputText);
  };
  expect(resultFn).not.toThrow();
});
