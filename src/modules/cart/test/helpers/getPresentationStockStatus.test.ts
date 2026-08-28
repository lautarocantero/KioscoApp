import { describe, it, expect } from "vitest";
import type { TFunction } from "i18next";
import { StockStatus } from "@typings/cart/cartEnums";
import { getPresentationStockStatus as getStockStatus, isAddDisabled } from "../../helpers/getPresentationStockStatus";

const t = ((key: string, opts?: Record<string, unknown>) => `${key}:${opts?.stock ?? ""}`) as TFunction;

describe("getStockStatus", () => {
  it("es Weight cuando la presentación se vende por peso, sin importar el stock", () => {
    expect(getStockStatus(0, 5, true, t).status).toBe(StockStatus.Weight);
    expect(getStockStatus(500, 5, true, t).status).toBe(StockStatus.Weight);
  });

  it("es Low cuando el stock es menor o igual al mínimo configurado", () => {
    expect(getStockStatus(5, 5, false, t).status).toBe(StockStatus.Low);
    expect(getStockStatus(2, 5, false, t).status).toBe(StockStatus.Low);
  });

  it("es Ok cuando el stock supera el mínimo", () => {
    expect(getStockStatus(6, 5, false, t).status).toBe(StockStatus.Ok);
  });

  it("clampea el stock negativo a 0 en el label", () => {
    expect(getStockStatus(-3, 5, false, t).label).toBe("cart.stockStatus.low:0");
  });
});

describe("isAddDisabled", () => {
  it("deshabilita cuando no hay stock y no es venta por peso", () => {
    expect(isAddDisabled(0, false)).toBe(true);
    expect(isAddDisabled(-1, false)).toBe(true);
  });

  it("no deshabilita si hay stock", () => {
    expect(isAddDisabled(1, false)).toBe(false);
  });

  it("nunca deshabilita venta por peso, aunque el stock sea 0", () => {
    expect(isAddDisabled(0, true)).toBe(false);
  });
});
