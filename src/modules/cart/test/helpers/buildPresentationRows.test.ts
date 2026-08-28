import { describe, it, expect } from "vitest";
import type { TFunction } from "i18next";
import type { Product } from "@typings/product/productTypes";
import type { Presentation } from "@typings/presentation/presentationTypes";
import { buildPresentationRows } from "../../helpers/buildPresentationRows";

const t = ((key: string, opts?: { defaultValue?: string }) => opts?.defaultValue ?? key) as TFunction;

const presentation = (overrides: Partial<Presentation> = {}): Presentation => ({
  _id: "pres-1",
  brand: "",
  category: [],
  created_at: "",
  description: "",
  expiration_date: "",
  image_url: "",
  min_stock: 5,
  model_size: 500,
  model_type: "bottle",
  model_unit: "ml" as Presentation["model_unit"],
  name: "Coca Cola 500ml",
  price: 100,
  product_id: "prod-1",
  barcode: "",
  sku: "SKU-1",
  stock: 20,
  updated_at: "",
  is_perishable: false,
  sale_type: "unit" as Presentation["sale_type"],
  ...overrides,
});

const product = (overrides: Partial<Product> = {}): Product => ({
  _id: "prod-1",
  name: "Coca Cola",
  description: "",
  brand: "",
  image_url: "",
  created_at: "",
  updated_at: "",
  presentations: [presentation()],
  ...overrides,
});

describe("buildPresentationRows", () => {
  it("aplana un producto con varias presentaciones a una fila por presentación", () => {
    const rows = buildPresentationRows(
      [product({ presentations: [presentation({ _id: "p1" }), presentation({ _id: "p2" })] })],
      t
    );

    expect(rows).toHaveLength(2);
    expect(rows[0].key).toBe("prod-1:p1");
    expect(rows[1].key).toBe("prod-1:p2");
  });

  it("copia stock, minStock, precio y sku de la presentación", () => {
    const [row] = buildPresentationRows(
      [product({ presentations: [presentation({ stock: 3, min_stock: 5, price: 250, sku: "ABC" })] })],
      t
    );

    expect(row.stock).toBe(3);
    expect(row.minStock).toBe(5);
    expect(row.price).toBe(250);
    expect(row.sku).toBe("ABC");
  });

  it("marca isWeight según el sale_type", () => {
    const [row] = buildPresentationRows(
      [product({ presentations: [presentation({ sale_type: "weight" as Presentation["sale_type"] })] })],
      t
    );

    expect(row.isWeight).toBe(true);
  });

  it("no rompe con productos sin presentaciones", () => {
    const rows = buildPresentationRows([product({ presentations: [] })], t);
    expect(rows).toEqual([]);
  });
});
