import { describe, it, expect } from "vitest";
import type { PresentationRow } from "@typings/cart/cartTypes";
import { searchPresentationRows } from "../../helpers/searchPresentationRows";

const row = (overrides: Partial<PresentationRow>): PresentationRow => ({
  key: overrides.sku ?? "key",
  productId: "prod-1",
  presentationId: "pres-1",
  product: "Coca Cola",
  presentation: "Botella, 500",
  category: "Bebidas",
  sku: "SKU-1",
  price: 100,
  stock: 10,
  minStock: 5,
  isWeight: false,
  presentationData: {} as PresentationRow["presentationData"],
  ...overrides,
});

describe("searchPresentationRows", () => {
  it("retorna vacío cuando la query está vacía", () => {
    expect(searchPresentationRows([row({})], "")).toEqual([]);
    expect(searchPresentationRows([row({})], "   ")).toEqual([]);
  });

  it("matchea sin importar mayúsculas ni acentos", () => {
    const rows = [row({ product: "Almacén", sku: "A1" })];
    expect(searchPresentationRows(rows, "almacen")).toHaveLength(1);
  });

  it("matchea por sku y por categoría además del nombre", () => {
    const rows = [
      row({ product: "Leche", sku: "LEC-1", category: "Lácteos" }),
      row({ product: "Yogur", sku: "YOG-1", category: "Bebidas" }),
    ];

    expect(searchPresentationRows(rows, "LEC-1")).toHaveLength(1);
    expect(searchPresentationRows(rows, "lacteos")).toHaveLength(1);
  });

  it("prioriza prefijo de producto, luego prefijo de sku, luego el resto", () => {
    const rows = [
      row({ key: "other", product: "Yerba con Coca", sku: "X1" }),
      row({ key: "sku-prefix", product: "Fernet", sku: "COCA-1" }),
      row({ key: "product-prefix", product: "Coca Cola", sku: "Y1" }),
    ];

    const result = searchPresentationRows(rows, "coca");

    expect(result.map((r) => r.key)).toEqual(["product-prefix", "sku-prefix", "other"]);
  });

  it("corta el resultado a 8 filas", () => {
    const rows = Array.from({ length: 12 }, (_, i) => row({ key: `k${i}`, product: `Producto ${i}` }));
    expect(searchPresentationRows(rows, "producto")).toHaveLength(8);
  });
});
