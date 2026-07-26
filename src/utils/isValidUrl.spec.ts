import { isValidUrl } from "./isValidUrl";

describe("isValidUrl", () => {
  it("should accept a valid https URL", () => {
    expect(isValidUrl("https://www.lunii.com")).toBe(true);
  });

  it("should reject urls without scheme", () => {
    expect(isValidUrl("www.lunii.com")).toBe(false);
  });

  it("should reject urls without a hostname", () => {
    expect(isValidUrl("https://lunii")).toBe(false);
  });

  it("should reject an invalid string", () => {
    expect(isValidUrl("not a url")).toBe(false);
  });
});
