import { it, expect, vi } from "vitest";
import writeData from "./io";
import { promises as fs } from "fs"; // import mocked module because we used vi.mock("fs")

/*
it("should execute the writeFile mehtod", () => {
  const testData = "Test";
  const testFilename = "test.txt";

  //| we want to check only if it is resolved, and we expect the value to which
  //| it is resolved to be undefined because we do not get any value
  //| but we would not make it here if it was rejected
  return expect(writeData(testData, testFilename)).resolves.toBeUndefined();
});
*/
//| this has a disadvantage: whenever we run this test, we create the test.txt file in the data folder
//| sometimes this might be a problem
//| because our test has a side effect, i.e. it writes data to the hard drive
//| this could be a problem if you clash with data that should not be edited or deleted (e.g. production data)
//| but also when sending HTTO requests to backend APIs, or working with databases
//| these are all side effects because you interact with some other system (with something else outside of your program and outside of your code)
//| NB typically you want to avoid this when working with tests

//| IMPORTANT how to get rid of these side effects?
//| there are 2 main approaches: you can use 1) spies and 2) mocks (theoretically, there are also stubs and fakes)
//| cfr https://stackoverflow.com/questions/52131231/simple-definition-of-stub-spy-fake-and-mock-in-unit-testing
//| cfr https://stackoverflow.com/questions/3459287/whats-the-difference-between-a-mock-stub

/*
% spies
| spies are wrappers around your function or empty replacements for functions
| that allow you to track if and how a function was called
| you can use spies if you just want to know whether a function was executed (and you don't care about what the function does)
| and you can either: 1) replace the original function with such a spy object, or 2) replace the function
| this second one is more common because this also allows you to get rid of a side effect, if you replace a function
% mocks
| mocks are replacements for bigger parts of an API of a certain module or code
| with them you can also implement some test-specific logic in the replacement function that does something else than the original function
| but helps you test different scenarios
| (i.e. they can be a replacement for an API that may provide test specific behavior instead)

|NB for spies --> cfr data.js and data.test.js
|NB for mocks --> cfr io.js and io.test.js
*/

//% mocks
//| here we have the problem that we do not want to execute the original writeFile method
//| we only want to find out whether it was called, but it should not do its job of writing to the file system
//| it should do that during production, but not when we run our tests
//| we could use spies, but to replace it with an empty function and find out whether it was called it is harder
//| because it comes from a module that we do not own
//| IMPORTANT with mocks we can replace functionalities that are defined in modules,
//| regardless of whether we own them or not

//| we have the .mock() method on the vi object
//| this .mock() method gets as input argument the name of the module or
//| the path to the module that should be mocked
//| this works with builtin or third party module but also with your own modules / files
//| this will kick off the Vitest or Jest auto-mocking algorithm
//| it will basically find this module, and replace all the functions in there with empty spy functions that do not do anything
vi.mock("fs");
//| now when we call writeData, it will no longer write the test.txt file

it("should execute the writeFile mehtod", () => {
  const testData = "Test";
  const testFilename = "test.txt";

  //| however, now we no longer get back a promise that resolves (because now there are only empty spy functions)
  // return expect(writeData(testData, testFilename)).resolves.toBeUndefined();

  writeData(testData, testFilename);
  // now fs.writeFile is an empty spy function therefore we can call (NB it is an automatically created spy function)
  expect(fs.writeFile).toBeCalled();
});
