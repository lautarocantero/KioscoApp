import { describe, it, expect } from "vitest";
import { darkTheme } from "../../../theme/mainTheme";
import { getLandingAccentColor } from "../helpers/getLandingAccentColor";

describe("getLandingAccentColor", () => {
  it("resuelve el color del accent solicitado desde el theme", () => {
    expect(getLandingAccentColor(darkTheme, "violet")).toBe(darkTheme.custom.accents.violet);
    expect(getLandingAccentColor(darkTheme, "green")).toBe(darkTheme.custom.accents.green);
  });
});
