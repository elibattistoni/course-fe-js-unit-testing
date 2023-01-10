import { it, expect } from "vitest";
import { generateToken } from "./async-example";

//| IMPORTANT test for function that takes as input argument a callback function
it("should generate a token value", (done) => {
  //| NB done is an extra parameter ==> it is a function that you should call once you are done in your testing code
  //| you don't normally need to do that because usually your code is executed top to bottom
  //| but Vitest or JEST will not wait for any inner callback functions to finish
  //| it will just invoke the generateToken line, it will not wait for the callback function to be executed and therefore will not find any expectation
  //| therefore it will mark the test as passed simply because there was no assertion at all
  const testUserEmail = "test@test.com";

  generateToken(testUserEmail, (err, token) => {
    //| NB only in this case you need to add a try catch block
    //| the .to() functions in the end throw an error if they fail
    //| NB IMPORTANT HEREEEEEEEE
    try {
      expect(token).toBeDefined(); // the token should exist, it should not be undefined
      //| you can call done in the place where you know that you will be done with all your testing related work
      //| and now Vitest or JEST will wait until done() is called
      done();
    } catch (err) {
      done(err);
    }
  });
});
