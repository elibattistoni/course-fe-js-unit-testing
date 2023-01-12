// TODO in this case, we want to avoid that a real request is sent
//| because if a real request is sent to the backend, especially if it is something like a POST request, then something might get changed in a database
//| and typically you do not want your tests to change something permanently
//| also because this will slow down your tests
//| and it might take a bandwidth if you have a lot of tests and they all send different requests
//| it might also start hammering your backend API with all your tests,
//| because you have all those extra unnecessary requests reaching the backend API
//| therefore this is another great use for mocking

import { sendDataRequest } from "./http";

//| we want to test that we can successfully send a request
//| and that the data that is returned by the API is returned after it was parsed

import { expect, it, test, vi } from "vitest";
import { HttpError } from "./errors";

const testResponseData = { testKey: "testData" };

//| NB IMPORTANT vi.stubGlobal() is a method that allows us to replace globally
//| available objects or functions with our implementations
//| e.g. like fetch()
//| the first argument should be the name of the globally avaialble function or object
//| the second argument is the replacement for this globally available object/function (API)
//| and we want to create this replacement function with vi.fn() so that we can also leverage the spy functionalities
//| but we also want to tweak the behavior of the apy function, so we need to pass a function as argument to vi.fn()

const testFetch = vi.fn((url, options) => {
  // url and options for configuring are the same parameters that the real fetch() function gets
  // we will also return a promise, like the real fetch() function does
  return new Promise((resolve, reject) => {
    //| check for correct input into the real fetch() function
    if (typeof options.body !== "string") {
      //| json is of type string
      //| here we want to make sure that the data passed as input to the fetch function is really a string (json)
      return reject("Not a string");
    }

    const testResponse = {
      ok: true,
      json() {
        return new Promise((resolve, reject) => {
          resolve(testResponseData);
        });
      },
    };
    resolve(testResponse);
  });
});

vi.stubGlobal("fetch", testFetch);

it("should return any available response data", () => {
  //| NB we must make sure that fetch() is not really executed (or that it is
  //| executed but it is not the original fetch function that is built into the browser)
  //| IMPORTANT we cannot do vi.mock() like we did before, because fetch is a globally
  //| available function, it is not imported from any module
  //| therefore we cannot use vi.mock() to replace a module
  //| but we can call another method from the vi object: vi.stubGlobal()

  const testData = { key: "test" };
  return expect(sendDataRequest(testData)).resolves.toEqual(testResponseData);
});

//| test whether our code really converts the provided data to json format before returning it
//| because the real fetch function would fail if we pass ustringified data to it
//| i.e. if we do not pass JSON data
it("should convert the provided data to JSON before sending the request", async () => {
  const testData = { key: "test" };

  //| here we want to find out whether the data was passed as JSON to the fetch function
  //| (json is of type string)
  //| and we want to make sure that when it rejects. it rejects to a string that is "Not a string" like we defined in the Promise
  let errorMessage;
  try {
    await sendDataRequest(testData);
  } catch (error) {
    let errorMessage = error;
  }

  expect(errorMessage).not.toBe("Not a string.");
});

it("should throw an HttpError in case of non-ok responses", () => {
  //| for this test only, we need to edit the testFetch function so that ok: false
  //| mockImplementationOnce == only for this test
  //| mockImplementation --> from this onwards
  testFetch.mockImplementationOnce((url, options) => {
    return new Promise((resolve, reject) => {
      const testResponse = {
        ok: false,
        json() {
          return new Promise((resolve, reject) => {
            resolve(testResponseData);
          });
        },
      };
      resolve(testResponse);
    });
  });

  const testData = { key: "test" };

  return expect(sendDataRequest(testData)).rejects.toBeInstanceOf(HttpError);
});
