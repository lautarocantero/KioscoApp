import { describe, it, expect } from "vitest";
import { getDefaultAddQuantity } from "../../helpers/saleTypeHelper";

describe("getDefaultAddQuantity", () => {
  it("retorna 1 para venta por unidad", () => {
    expect(getDefaultAddQuantity("unit")).toBe(1);
    expect(getDefaultAddQuantity(undefined)).toBe(1);
  });

  it("retorna 100 (un paso) para venta por peso", () => {
    expect(getDefaultAddQuantity("weight")).toBe(100);
  });
});
