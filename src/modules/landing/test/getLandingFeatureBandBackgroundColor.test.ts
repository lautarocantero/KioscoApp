import { describe, it, expect } from "vitest";
import { darkTheme } from "../../../theme/mainTheme";
import { getLandingFeatureBandBackgroundColor } from "../helpers/getLandingFeatureBandBackgroundColor";

describe("getLandingFeatureBandBackgroundColor", () => {
  it("tiñe la base oscura de la band con el color de acento recibido", () => {
    const color = getLandingFeatureBandBackgroundColor(darkTheme, "blue");

    expect(color).toBe(`color-mix(in srgb, ${darkTheme.custom.accents.blue} 18%, #1f1c2c 82%)`);
  });

  it("devuelve un tinte distinto para cada acento", () => {
    const blue = getLandingFeatureBandBackgroundColor(darkTheme, "blue");
    const gold = getLandingFeatureBandBackgroundColor(darkTheme, "gold");

    expect(blue).not.toBe(gold);
  });
});
