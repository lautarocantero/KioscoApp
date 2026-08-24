import { describe, it, expect } from "vitest";
import { getLandingWavePath } from "../helpers/getLandingWavePath";

describe("getLandingWavePath", () => {
  it("devuelve un path SVG distinto para variantes distintas", () => {
    expect(getLandingWavePath(0)).not.toBe(getLandingWavePath(1));
    expect(getLandingWavePath(1)).not.toBe(getLandingWavePath(2));
    expect(getLandingWavePath(2)).not.toBe(getLandingWavePath(3));
  });

  it("cicla las variantes cuando el índice excede la cantidad de patrones disponibles", () => {
    expect(getLandingWavePath(4)).toBe(getLandingWavePath(0));
    expect(getLandingWavePath(5)).toBe(getLandingWavePath(1));
  });

  it("siempre devuelve un path válido (arranca en M y termina en Z)", () => {
    for (let variant = 0; variant < 6; variant += 1) {
      const path = getLandingWavePath(variant);
      expect(path.startsWith("M")).toBe(true);
      expect(path.endsWith("Z")).toBe(true);
    }
  });
});
