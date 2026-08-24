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
      expect(item.mediaVideoSrc).toBeTruthy();
      expect(item.mediaAltKey).toMatch(/^landing\.showcase\./);
      expect(item.accent).toBeTruthy();
      expect(item.mediaDecorations.length).toBeGreaterThan(0);
      expect(item.bullets).toHaveLength(3);
      item.bullets.forEach((bullet) => {
        expect(bullet.Icon).toBeDefined();
        expect(bullet.labelKey).toMatch(/^landing\.showcase\./);
      });
    });
  });

  it("usa los íconos de decoración temáticos de kiosco, ventas y reportes en sus features", () => {
    const items = getLandingFeatureShowcase();

    const multiKiosco = items.find((item) => item.badgeKey.includes("multiKiosco"))!;
    const sellsReports = items.find((item) => item.badgeKey.includes("sellsReports"))!;

    expect(multiKiosco.mediaDecorations.some((d) => d.src.endsWith("kiosco.png"))).toBe(true);
    expect(sellsReports.mediaDecorations.some((d) => d.src.endsWith("sells.png"))).toBe(true);
    expect(sellsReports.mediaDecorations.some((d) => d.src.endsWith("reports.png"))).toBe(true);
  });
});
