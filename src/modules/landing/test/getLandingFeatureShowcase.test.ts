import { describe, it, expect } from "vitest";
import { getLandingFeatureShowcase } from "../helpers/getLandingFeatureShowcase";

describe("getLandingFeatureShowcase", () => {
  it("devuelve 4 items con badge, título, subtítulo, media y 3 bullets cada uno", () => {
    const items = getLandingFeatureShowcase();

    expect(items).toHaveLength(4);
    items.forEach((item) => {
      expect(item.badgeKey).toMatch(/^landing\.showcase\./);
      expect(item.titleStartKey).toMatch(/^landing\.showcase\./);
      expect(item.titleHighlightKey).toMatch(/^landing\.showcase\./);
      expect(item.subtitleKey).toMatch(/^landing\.showcase\./);
      expect(item.mediaSrc).toBeTruthy();
      expect(item.mediaAltKey).toMatch(/^landing\.showcase\./);
      expect(item.accent).toBeTruthy();
      expect(item.bullets).toHaveLength(3);
      item.bullets.forEach((bullet) => {
        expect(bullet.Icon).toBeDefined();
        expect(bullet.labelKey).toMatch(/^landing\.showcase\./);
      });
    });
  });
});
