import { validateStringNotEmpty, validateNumber } from "./validation.js";

export function transformToNumber(value) {
  // return NaN;
  return +value;
}

export function cleanNumbers(numberValues) {
  const numbers = [];
  for (const numberInput of numberValues) {
    validateStringNotEmpty(numberInput);
    const number = transformToNumber(numberInput);
    validateNumber(number);
    numbers.push(number);
  }
  return numbers;
}

//% NB for the cleanNumbers function we need an integration test!!!
//| NB cleanNumbers is a function that calls other functions, so we have to test the combination of different functions
//| to have an integration test you have 2 options:
//| 1. inside your test, you can call multiple functions instead of a single function, and use the results of multiple functions in combination
//| 2. or you test a function that already calls other functions
