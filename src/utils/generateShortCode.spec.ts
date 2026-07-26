import { generateShortCode } from "./generateShortCode";

describe("generateShortCode", () => {
  it("returns at most 6 characters", () => {
    expect(generateShortCode().length).toBeLessThanOrEqual(6);
  });

  it("returns only alphanumeric characters", () => {
    expect(generateShortCode()).toMatch(/^[a-z0-9]+$/);
  });
});
