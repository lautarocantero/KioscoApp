import { describe, it, expect } from "vitest";
import { getLandingNavLinks } from "../helpers/getLandingNavLinks";

describe("getLandingNavLinks", () => {
  it("devuelve los links de navegación con su targetId", () => {
    const links = getLandingNavLinks();

    expect(links).toEqual([
      { labelKey: "landing.nav.features", targetId: "landing-features" },
      { labelKey: "landing.nav.resources", targetId: "landing-download" },
    ]);
  });
});
