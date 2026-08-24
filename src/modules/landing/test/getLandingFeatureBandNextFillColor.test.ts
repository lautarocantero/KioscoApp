import { describe, it, expect } from "vitest";
import { darkTheme } from "../../../theme/mainTheme";
import { getLandingFeatureBandNextFillColor } from "../helpers/getLandingFeatureBandNextFillColor";
import { getLandingFeatureBandBackgroundColor } from "../helpers/getLandingFeatureBandBackgroundColor";
import { getLandingFeatureShowcase } from "../helpers/getLandingFeatureShowcase";

describe("getLandingFeatureBandNextFillColor", () => {
  it("devuelve el color de fondo de la siguiente feature para items intermedios", () => {
    const items = getLandingFeatureShowcase();

    const nextColor = getLandingFeatureBandNextFillColor(darkTheme, items, 0);

    expect(nextColor).toBe(getLandingFeatureBandBackgroundColor(darkTheme, items[1].accent));
  });

  it("devuelve el blanco del theme para la última feature (transición a Download)", () => {
    const items = getLandingFeatureShowcase();

    const nextColor = getLandingFeatureBandNextFillColor(darkTheme, items, items.length - 1);

    expect(nextColor).toBe(darkTheme.palette.common.white);
  });
});
