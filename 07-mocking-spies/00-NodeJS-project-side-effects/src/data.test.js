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

    generateReportData(logger);
    //| so the logger function does not do anything, but it allows us to find out
    //| whether it was executed because it is a spy

    expect(logger).toBeCalled(); //| this will make the test pass only if logger was called
  });
});
