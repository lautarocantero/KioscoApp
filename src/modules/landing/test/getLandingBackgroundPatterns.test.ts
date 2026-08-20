import { describe, it, expect } from "vitest";
import { darkTheme } from "../../../theme/mainTheme";
import { getSectionBackgroundSx } from "../helpers/getLandingBackgroundPatterns";

describe("getLandingBackgroundPatterns", () => {
  it("getSectionBackgroundSx usa el color de fondo plano del theme", () => {
    const sx = getSectionBackgroundSx(darkTheme);
    expect(sx.backgroundColor).toBe(darkTheme.custom.darkblack);
  });
});
