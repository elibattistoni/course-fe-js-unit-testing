import { it, expect } from "vitest";
import { generateToken, generateTokenPromise } from "./async-example";

//% test async code: test for a function that gets a CALLBACK as input
//| IMPORTANT test for function that takes as input argument a callback function
it("should generate a token value", (done) => {
  //| NB done is an extra parameter ==> it is a function that you should call once you are done in your testing code
  //| you don't normally need to do that because usually your code is executed top to bottom
  //| but Vitest or JEST will not wait for any inner callback functions to finish
  //| it will just invoke the generateToken line, it will not wait for the callback
  //| function to be executed and therefore will not find any expectation
  //| therefore it will mark the test as passed simply because there was no assertion at all
  const testUserEmail = "test@test.com";

  // this does not work because Vitest or JEST do not wait for an inner callback
  // function to finish, they mark the test as passed simply because there was no assertion at all
  // generateToken(testUserEmail, (err,token) => {
  //   expect(token).toBeDefined()
  //   expect(token).toBe(2)
  // })

  generateToken(testUserEmail, (err, token) => {
    //| NB only in this case you need to add a try catch block
    //| the .to() functions in the end throw an error if they fail
    //| and by default, if you do not have this async code, Vitest and JEST will
    //| pick up these errors and consider the test to have failed, and show you the reason why
    //| NB but if you have a callback and use done(), then the error thrown will not be picked up by the test runner
    //| NB this is why in this case ONLY you have to use your own try catch block
    try {
      expect(token).toBeDefined(); // the token should exist, it should not be undefined
      // you could also test for the exact value, or to test for the value to be of type string
      // expect(token).toBe(2);
      //| IMPORTANT you can call done in the place where you know that you will
      //| be done with all your testing related work
      //| IMPORTANT and now Vitest or JEST will wait until done() is called
      //| they will find the assertion and evaluate it
      done();
    } catch (err) {
      done(err);
    }
  });
});

//% test async code: test for a function that has a PROMISE inside
//| writing tests for functions that yield promises is easier than writing tests for function that yield callbacks
//| there are a couple of ways of making a promise based test work

//# method 1
it("should generate a token value", () => {
  const testUserEmail = "test@test.com";
  //| NB expect() supports promises out of the box!

  //| if you want to evaluate the error that you get after the rejection (i.e. if you expect a promise to reject)
  // expect(generateTokenPromise(testUserEmail)).rejects.toBe();

  //| if you expect a promise to resolve:
  return expect(generateTokenPromise(testUserEmail)).resolves.toBeDefined(); //| this refers to the value that the promise resolved to
});
//| NB you should return the promise assertion in your test, this guarantees that Vitest / Jest wait for the promise to be resolved

//# method 2
it("should generate a token value", async () => {
  const testUserEmail = "test@test.com";
  const token = await generateTokenPromise(testUserEmail);
  expect(token).toBeDefined();
});
//| async await makes especially a lot of sense if you have multiple steps that you want to execute instead of just a single funciton call
//| NB you do not need to return when using async / await (since a function annotated with async returns a promise implicitly)
