import { describe, it, expect } from "vitest";
import { darkTheme } from "../../../theme/mainTheme";
import { getHeroBackgroundImageSx, getWhiteSectionBackgroundSx } from "../helpers/getLandingBackgroundPatterns";
import { getPublicAssetUrl } from "../../shared/helpers/getPublicAssetUrl";

describe("getLandingBackgroundPatterns", () => {
  it("getHeroBackgroundImageSx usa la imagen de marca como fondo del hero", () => {
    const sx = getHeroBackgroundImageSx(darkTheme);
    expect(sx.backgroundImage).toBe(`url(${getPublicAssetUrl("images/backgroundImages/background-landing.png")})`);
    expect(sx.backgroundSize).toBe("cover");
  });

  it("getWhiteSectionBackgroundSx usa blanco del theme como fondo, para las secciones luego del hero", () => {
    const sx = getWhiteSectionBackgroundSx(darkTheme);
    expect(sx.backgroundColor).toBe(darkTheme.palette.common.white);
  });
});
