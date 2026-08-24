import { describe, it, expect } from "vitest";
import { getPublicAssetUrl } from "../../helpers/getPublicAssetUrl";

describe("getPublicAssetUrl", () => {
  it("antepone el BASE_URL configurado a una ruta sin barra inicial", () => {
    expect(getPublicAssetUrl("images/logo.png")).toBe(`${import.meta.env.BASE_URL}images/logo.png`);
  });

  it("normaliza una ruta con barra inicial antes de anteponer el BASE_URL", () => {
    expect(getPublicAssetUrl("/images/logo.png")).toBe(`${import.meta.env.BASE_URL}images/logo.png`);
  });
});
