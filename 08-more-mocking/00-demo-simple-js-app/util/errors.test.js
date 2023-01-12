import { it, describe, expect } from "vitest";
import { HttpError, ValidationError } from "./errors";

describe("HttpError", () => {
  it("should contain the provided status code, message and data", () => {
    const testStatus = 1;
    const testMessage = "Test";
    const testData = { key: "test" };

    const testError = new HttpError(testStatus, testMessage, testData);

    expect(testError.statusCode).toBe(testStatus);
    expect(testError.message).toBe(testMessage);
    expect(testError.data).toBe(testData);
  });

  it("should contain undefined as data if no data is provided", () => {
    // because we do not want any default fallback data if no data is provided,
    // we really want data to be undefined if it is not given

    const testStatus = 1;
    const testMessage = "Test";

    const testError = new HttpError(testStatus, testMessage);

    expect(testError.statusCode).toBe(testStatus);
    expect(testError.message).toBe(testMessage);
    expect(testError.data).not.toBeDefined();
    // or .toBeUndefined()
  });
});

describe("ValidationError", () => {
  it("should contain the provided message", () => {
    const testMessage = "test";

    const testError = new ValidationError(testMessage);

    expect(testError.message).toBe(testMessage);
  });
});

//| NB you can also write more tests!
