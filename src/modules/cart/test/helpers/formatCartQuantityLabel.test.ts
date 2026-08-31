import { describe, it, expect } from "vitest";
import type { TFunction } from "i18next";
import { formatCartQuantityLabel } from "../../helpers/formatCartQuantityLabel";

const t = ((key: string) => (key === "cart.table.weightUnit" ? "g" : "u")) as TFunction;

describe("formatCartQuantityLabel", () => {
  it("formatea en unidades para venta por unidad", () => {
    expect(formatCartQuantityLabel(3, false, t)).toBe("3 u");
  });

  it("formatea en gramos para venta por peso", () => {
    expect(formatCartQuantityLabel(300, true, t)).toBe("300 g");
  });
});
