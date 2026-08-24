import { describe, it, expect } from "vitest";
import { getLandingDownloadTrustPoints } from "../helpers/getLandingDownloadTrustPoints";

describe("getLandingDownloadTrustPoints", () => {
  it("devuelve 3 puntos de confianza con ícono, título y subtítulo", () => {
    const points = getLandingDownloadTrustPoints();

    expect(points).toHaveLength(3);
    points.forEach((point) => {
      expect(point.Icon).toBeDefined();
      expect(point.titleKey).toMatch(/^landing\.download\.trust\./);
      expect(point.subtitleKey).toMatch(/^landing\.download\.trust\./);
    });
  });
});
