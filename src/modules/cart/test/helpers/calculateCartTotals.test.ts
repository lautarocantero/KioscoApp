import { describe, it, expect } from "vitest";
import { calculateCartTotals } from "../../helpers/calculateCartTotals";

describe("calculateCartTotals", () => {
  it("sin descuentos: el IVA se aplica directo sobre el subtotal", () => {
    const result = calculateCartTotals([{ lineBase: 1000, itemDiscountPercentage: 0 }], 0, 21);

    expect(result.lines).toEqual([1000]);
    expect(result.subtotal).toBe(1000);
    expect(result.discountAmount).toBe(0);
    expect(result.net).toBe(1000);
    expect(result.ivaAmount).toBe(210);
    expect(result.total).toBe(1210);
  });

  it("aplica el descuento por ítem sobre lineBase antes de sumar el subtotal", () => {
    const result = calculateCartTotals([{ lineBase: 1000, itemDiscountPercentage: 10 }], 0, 21);

    expect(result.lines).toEqual([900]);
    expect(result.subtotal).toBe(900);
    expect(result.total).toBeCloseTo(1089, 5);
  });

  it("el descuento global se aplica sobre el subtotal ya descontado por ítem, y el IVA sobre el neto", () => {
    const result = calculateCartTotals(
      [
        { lineBase: 1000, itemDiscountPercentage: 10 }, // línea = 900
        { lineBase: 500, itemDiscountPercentage: 0 },   // línea = 500
      ],
      10,
      21
    );

    expect(result.subtotal).toBe(1400);
    expect(result.discountAmount).toBeCloseTo(140, 5);
    expect(result.net).toBeCloseTo(1260, 5);
    expect(result.ivaAmount).toBeCloseTo(264.6, 5);
    expect(result.total).toBeCloseTo(1524.6, 5);
  });

  it("clampea descuentos fuera de rango (por ítem y global)", () => {
    const result = calculateCartTotals([{ lineBase: 1000, itemDiscountPercentage: 150 }], -20, 21);

    expect(result.lines).toEqual([0]);
    expect(result.subtotal).toBe(0);
    expect(result.discountAmount).toBe(0);
    expect(result.total).toBe(0);
  });

  it("devuelve todo en cero con el carrito vacío", () => {
    const result = calculateCartTotals([], 0, 21);

    expect(result).toEqual({ lines: [], subtotal: 0, discountAmount: 0, net: 0, ivaAmount: 0, total: 0 });
  });
});
