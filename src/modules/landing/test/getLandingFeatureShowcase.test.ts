import { describe, it, expect } from "vitest";
import { getLandingFeatureShowcase } from "../helpers/getLandingFeatureShowcase";

describe("getLandingFeatureShowcase", () => {
  it("devuelve 4 items con badge, título, subtítulo, ahorro, media y 3 items de grilla cada uno", () => {
    const items = getLandingFeatureShowcase();

    expect(items).toHaveLength(4);
    items.forEach((item) => {
      expect(item.badgeKey).toMatch(/^landing\.showcase\./);
      expect(item.titleStartKey).toMatch(/^landing\.showcase\./);
      expect(item.titleHighlightKey).toMatch(/^landing\.showcase\./);
      expect(item.subtitleKey).toMatch(/^landing\.showcase\./);
      expect(item.savesKey).toMatch(/^landing\.showcase\./);
      expect(item.mediaVideoSrc).toBeTruthy();
      expect(item.mediaAltKey).toMatch(/^landing\.showcase\./);
      expect(item.accent).toBeTruthy();
      expect(item.items).toHaveLength(3);
      item.items.forEach((gridItem) => {
        expect(gridItem.Icon).toBeDefined();
        expect(gridItem.labelKey).toMatch(/^landing\.showcase\./);
        expect(gridItem.detailKey).toMatch(/^landing\.showcase\./);
      });
    });
  });

  it("marca como clickeable solo el item de permisos por rol de multi-kiosco", () => {
    const items = getLandingFeatureShowcase();

    const multiKiosco = items.find((item) => item.badgeKey.includes("multiKiosco"))!;
    const clickableItems = multiKiosco.items.filter((gridItem) => gridItem.isClickable);

    expect(clickableItems).toHaveLength(1);
    expect(clickableItems[0].labelKey).toContain("rolePermissions");

    const otherItems = items.filter((item) => !item.badgeKey.includes("multiKiosco"));
    otherItems.forEach((item) => {
      expect(item.items.some((gridItem) => gridItem.isClickable)).toBe(false);
    });
  });
});
