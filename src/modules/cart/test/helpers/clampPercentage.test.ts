import { describe, it, expect } from "vitest";
import { clampPercentage, sanitizePercentageInput } from "../../helpers/clampPercentage";

describe("sanitizePercentageInput", () => {
  it("elimina todo lo que no sea un dígito", () => {
    expect(sanitizePercentageInput("1a2b3")).toBe("123");
    expect(sanitizePercentageInput("-15.5")).toBe("155");
    expect(sanitizePercentageInput("")).toBe("");
  });
});

describe("clampPercentage", () => {
  it("deja pasar valores dentro de 0-100", () => {
    expect(clampPercentage(0)).toBe(0);
    expect(clampPercentage(50)).toBe(50);
    expect(clampPercentage(100)).toBe(100);
  });

  it("clampea por debajo de 0 y por encima de 100", () => {
    expect(clampPercentage(-10)).toBe(0);
    expect(clampPercentage(150)).toBe(100);
  });
});
