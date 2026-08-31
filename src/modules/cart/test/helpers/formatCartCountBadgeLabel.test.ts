import { describe, it, expect } from "vitest";
import type { TFunction } from "i18next";
import { formatCartCountBadgeLabel } from "../../helpers/formatCartCountBadgeLabel";

const t = ((key: string, opts?: { count?: number }) =>
  key === "cart.header.itemsBadge" ? `${opts?.count} ítems` : "vacío") as TFunction;

describe("formatCartCountBadgeLabel", () => {
  it("muestra 'vacío' cuando no hay ítems", () => {
    expect(formatCartCountBadgeLabel(0, t)).toBe("vacío");
  });

  it("muestra la cantidad de ítems cuando hay al menos uno", () => {
    expect(formatCartCountBadgeLabel(4, t)).toBe("4 ítems");
  });
});
