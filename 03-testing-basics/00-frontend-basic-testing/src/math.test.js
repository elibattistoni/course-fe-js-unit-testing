//% add tests for math.js file here
//| when using Vitest, you have to import it; if you use JEST, you don't have to import it
//| IMPORTANT if in your package.json scripts you have the flag "--globals" you do not need to import it
//| the --globals makes the key test functions available globally and you don't need to import them
//| but the importing has the advantage of better autocompletion and support here in the code editor

import { test, it, expect } from "vitest"; //NB "test" and "it" are synonyms!
//| alternatively, you can also import the "it" function, they are synonyms
//| import { it } from "vitest"
//| (also for JEST)

//| NB the first argument is a string that defines what your test will test, i.e the description of the test
//| NB the second argument is the test: here you can write an anonymous function in place, or pass a pointer to another function
//| and in the body of this function you will write your actual testing code

//| test("should summarize ....")

import { add } from "./math"; //| NB VItest kind of acts as a build tool, therefore you can omit the file extension (cfr app.js)

it("should summarize all number values in an array", () => {
  //| NB this function should execute the add function, pass in an array of numbers, and then define some expected value,
  //| which then will be checked by Vitest (by the assertion library)
  //| and then it will either mark the test as successful if the expectation is met, or as failed if the expectation is not met

  //# 1. ARRANGE
  const numbers = [1, 2];

  //# 2. ACT
  //| call the function that you want to test and pass in an array of numbers (like when you would actually call it)
  const result = add(numbers);

  //# 3. ASSERT
  const expectedResult = numbers.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );
  //| for defining the expectation, you can use the expect function (for both Vitest and JEST)
  expect(result).toBe(expectedResult); //| NB go to the Vitest website and to the API section to learn more about all the possible assertion statements that you can use
});

//| IMPORTANT typically, you should write MORE THAN ONE TEST PER UNIT

//| IMPORTANT we also want to test for a few THINGS THAT SHOULD NOT HAPPEN

it("should yield NaN if at least one invalid number is provided", () => {
  //# 1. Arrange
  const inputs = ["invalid", 1];
  //| "invalid" is a string that cannot be converted into a number

  //# 2. Act
  const result = add(inputs);

  //# 3. Assert
  expect(result).toBeNaN();
});
//| NB since this test fails, we want to change the main code because we want this test to succeed

it("should yield a correct sum if an array of numeric string values is provided", () => {
  //# 1. Arrange
  const inputs = ["1", "2"];

  //# 2. Act
  const result = add(inputs);

  // const expectedResult = inputs.reduce(
  //   (previousValue, currentValue) =>
  //     parseInt(previousValue) + parseInt(currentValue),
  //   0
  // ); // the one above is the same as this one
  const expectedResult = inputs.reduce(
    (previousValue, currentValue) => +previousValue + +currentValue,
    0
  );

  expect(result).toBe(expectedResult);
});

//% NB always write more than 1 test, check different scenarios,
//% check for certain things that we don't want to happen,
//% and check for invalid input values are passed in
//% IMPORTANT think about a lot of different scenarios that could occurr, and write appropriate tests
//% ultimately, writing tests is an ITERATIVE PROCESS as your project grows
//% you always want to be open to adding more tests, you always want to think about possible values,
//% invalid values, maybe situations where things could crash, etc

it("should yield 0 if an empty array is provided", () => {
  const inputs = [];

  const result = add(inputs);

  expect(result).toBe(0);
});

it("should throw an error if no value is passed into the function", () => {
  //| add() expect to throw an error
  //| how to write this test? because we cannot look for an error,
  //| because an error is not really a value that is returned by this function,
  //| because errors bubble up in JavaScript, and in many other languages
  //| an error is instead thrown, so here we have to catch it
  //| for this we have to change the code a bit

  //| wrap the add() function into another function, to make sure that is not executed immediately,
  //| but instead in combination with toThrow() which checks whether an error was thrown
  //| and resultFn will be executed by Vitest when the test runs, then Vitest checks whether an error was thrown,
  //| and if so it considers the test successful
  //| and not successful if no error was thrown
  const resultFn = () => {
    add();
  };
  expect(resultFn).toThrow(/is not iterable/);
  //| NB this saves us the hassle of writing our own try-catch blocks
  //| NB you can check for the opposite by writing: expect(resultFn).not.toThrow()
  //| NB and this not property exists for all the .to functions
});

it("should throw an error if provided with multiple arguments instead of an array", () => {
  //| NB we always just want to check with the minimum amount of arguments because we want to keep our tests simple
  //| NB as a side note, if you would be using Typescript this would not be even possible, because
  //| TS would know that the add() function only takes one parameter
  //| but with JS you can call a function with multiple parameters even if it just wants one
  //| (because JS is pretty flexible regarding the amount of arguments that you are passing in)

  const n1 = 1;
  const n2 = 2;

  const resultFn = () => {
    add(n1, n2);
  };

  expect(resultFn).toThrow(/is not iterable/);
  //| NB as argument of .toThrow(), you can pass the expected error message or the expected instance of error class
  //| NB you should add this if you want to make sure that you really check for the right error, and that it is not failing for some other reasons
  //| you can alternatively also pass a regex
});
