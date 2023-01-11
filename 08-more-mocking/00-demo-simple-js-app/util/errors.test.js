import { it, describe, expect } from "vitest";
import { HttpError } from "./errors";

const validStatusCode = "200";
const validMessage = "success message";
const validData = {};

describe("HttpError", () => {
  it("should create an object with specific properties if the correct input is provided", () => {
    const error = new HttpError(validStatusCode, validMessage, validData);

    expect(error).toHaveProperty("statusCode");
    expect(error).toHaveProperty("message");
    expect(error).toHaveProperty("data");
  });
});

// describe("ValidationError", () => {});
