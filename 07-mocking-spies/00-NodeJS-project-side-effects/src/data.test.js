import { describe, it, expect, vi } from "vitest";
import { generateReportData } from "./data";

//| NB the Jest analogue of vi is import { jest } from "@jest/globals"

//% spy

describe("generateReportData()", () => {
  it("should execute logFn if provided", () => {
    //| we will not import logFn but instead we want to find out whether the log function is called
    //| so we create a spy replacement object
    //| logFn has a side effect: since it logs to the console, it interacts with the system console

    const logger = vi.fn(); //| NB vi is a special object; the method .fn() creates
    //| an empty function which IMPORTANT keeps track of any function executions of that function
    //| it also keeps track of the arguments that were provided with those calls
    //| NB logger is an empty replacement object with the spy functionality

    //| IMPORTANT if you want to have a different implementation for certain methods provided by a module (and only for one -- this -- test)
    //| you can add this (NB you have to be working with a .fn()):
    //| so that you can replace your function that is empty with a different function that does what you want
    // logger.mockImplementation(() => {});
    // logger.mockImplementationOnce(() => {}); //| with this, your replacement function will be only used once (it will switch back to an empty function thereafter)

    generateReportData(logger);
    //| so the logger function does not do anything, but it allows us to find out
    //| whether it was executed because it is a spy

    expect(logger).toBeCalled(); //| this will make the test pass only if logger was called
  });
});

//| NB spies are empty functions that have some tracker that keeps track of if they have been executed,
//| and how many times with .toBeCalledTimes(2)
//| or with which arguments it was called with .toBeCalledWith()

/*
% custom spy logic
| when we call the empty function, we can pass a function to the fn function:
| vi.fn(() => {})
| and this function () => {} will be used as implementation for this dummy function that is created
| by default it is an empty function that does not do anything
| but sometimes you want some test-specific behavior and you can then pass a function to fn to create such a spy function
| which still keeps track of executions and so on but which has also some behavior
| this can help us in io.test.js
*/
