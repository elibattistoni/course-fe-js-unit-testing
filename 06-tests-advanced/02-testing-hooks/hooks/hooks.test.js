import { it, expect, beforeAll, beforeEach, afterAll, afterEach } from "vitest";

import { User } from "./hooks";

//| NB these hooks ahve nothing to do with React Hooks!
//| hooks are just functions that are executed automatically by the test runner at certain points of time
//| NB if you notice, in all these tests there is a lot of duplication:
//| const testEmail = "test@test.com";
//| const user = new User(testEmail);

//| to solve this, you can have a testEmail global value, like this:
const testEmail = "test@test.com";

//| IMPORTANT with global values: because in all the test you manipulate the same global object / value!!
//| especially if you use const user = new User(testEmail) as a global variable, in each test it will not be initialized anew
//| this is a problem that hooks can help us solve
//| hooks are special functions provided by Vitest and Jest
//| there are 4 hooks that we can use: beforeAll, beforeEach, afterAll, afterEach
//| these functions can be executed either: before all tests run (beforeAll), before each single test runs (beforeEach)
//| after all tests executed (afterAll) or after each single test is executed (afterEach)
//| NB you can add them at the top level (like in the example) or if you have testing suites, you can add them inside the describe() function
//| and if you declare them at the top leve, they apply to all tests in the file
//| if you delcare them inside a suite, they apply for that suite only

let user = new User(testEmail);

beforeAll(() => {
  console.log("beforeAll()");
});
beforeEach(() => {
  console.log("beforeEach()");
  // clean up before each test
  user = new User(testEmail);
});
afterAll(() => {
  console.log("afterAll()");
  //| useful for e.g. erase the database that you created before all your tests were executed
  //| so that nothing is saved on your file system
});
afterEach(() => {
  console.log("afterEach()");
  // clean up after each test
  // user = new User(testEmail);
});

it.concurrent("should update the email", () => {
  // const testEmail = "test@test.com";
  // const user = new User(testEmail);
  const newTestEmail = "test2@test.com";
  user.updateEmail(newTestEmail);

  expect(user.email).toBe(newTestEmail);
});

it.concurrent("should have an email property", () => {
  // const testEmail = "test@test.com";
  // const user = new User(testEmail);

  expect(user).toHaveProperty("email");
});

it.concurrent("should store the provided email value", () => {
  // const testEmail = "test@test.com";
  // const user = new User(testEmail);

  expect(user.email).toBe(testEmail);
});

it.concurrent("should clear the email", () => {
  // const testEmail = "test@test.com";
  // const user = new User(testEmail);
  user.clearEmail();

  expect(user.email).toBe("");
});

it.concurrent(
  "should still have an email property after clearing the email",
  () => {
    // const testEmail = "test@test.com";
    // const user = new User(testEmail);
    user.clearEmail();

    expect(user).toHaveProperty("email");
  }
);

//% interesting feature provided by Vitest and Jest: you can test your tests concurrently
//| which is nice if you want to speed up the overall time it takes to execute all your tests
//| by default, the tests are executed one after the other
//| if you write: it.concurrent() then if you add this concurrent annotation to a test,
//| this test will be run concurrently (in parallel) with all the other tests that have this annotation
//| NB you can also add if to the describe function, and then all the test inside
//| that suite will be executed in parallel (and you do not have to add .concurrent to every single test in that suite)
//| describe.concurrent()

//| NOTE
//| Even when not adding the .concurrent property / annotation, tests that are stored
//| in different files are executed concurrently (i.e., in parallel). This is done by
//| both Vitest and Jest - ensuring that your tests run in a short amount of time.
//| With .concurrent you can enforce this behavior also inside the individual files
//| (i.e., tests that live in one and the same file are executed concurrently).
//| Concurrent execution can reduce the amount of time your tests need to execute.
//| A downside of concurrent execution is, that tests that perform clashing (global)
//| state manipulations may interfere with each other.
