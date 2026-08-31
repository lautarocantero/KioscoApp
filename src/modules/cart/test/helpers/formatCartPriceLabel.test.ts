import { describe, it, expect } from "vitest";
import type { TFunction } from "i18next";
import { formatCartPriceLabel } from "../../helpers/formatCartPriceLabel";
import { formatCurrency } from "../../helpers/formatCurrency";

const t = (() => "/100 g") as TFunction;

describe("formatCartPriceLabel", () => {
  it("no agrega sufijo para venta por unidad", () => {
    expect(formatCartPriceLabel(100, false, t)).toBe(formatCurrency(100));
  });

  it("agrega el sufijo /100 g para venta por peso", () => {
    expect(formatCartPriceLabel(1180, true, t)).toBe(`${formatCurrency(1180)} /100 g`);
  });
});
