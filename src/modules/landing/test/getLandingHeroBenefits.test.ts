import { describe, it, expect } from "vitest";
import { getLandingHeroBenefits } from "../helpers/getLandingHeroBenefits";

describe("getLandingHeroBenefits", () => {
  it("devuelve 4 beneficios con clave de traducción", () => {
    const benefits = getLandingHeroBenefits();

    expect(benefits).toHaveLength(4);
    benefits.forEach((benefit) => {
      expect(benefit.labelKey).toMatch(/^landing\.hero\.benefits\./);
    });
  });
});
