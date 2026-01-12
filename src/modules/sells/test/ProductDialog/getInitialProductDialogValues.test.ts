import type { ProductVariant } from "@typings/productVariant/productVariant";
import getInitialProductDialogValues from "../../../sells/helpers/ProductDialog/Getters/getInitialProductDialogValues";
import { describe, it, expect } from "vitest";

describe("Helper: getInitialProductDialogValues", () => {
  const baseVariant: ProductVariant = {
    _id: "123",
    brand: "TestBrand",
    created_at: "2024-01-01",
    description: "Test product",
    expiration_date: "2025-01-01",
    gallery_urls: [],
    image_url: "/img/test.png",
    min_stock: 0,
    model_size: "M",
    model_type: "TypeA",
    name: "Test Product",
    price: 100,
    product_id: "prod-001",
    sku: "sku-001",
    stock: 10,
    updated_at: "2024-01-02",
  };

  it("debe devolver valores iniciales con la primera variante", () => {
    const result = getInitialProductDialogValues([baseVariant]);
    expect(result.productVariantId).toBe("123");
    expect(result.productVariant).toEqual(baseVariant);
    expect(result.requiredStock).toBe(1); // stock > 0
    expect(result.totalPrice).toBe(0);
  });

  it("debe devolver objeto vacío si no hay variantes", () => {
    const result = getInitialProductDialogValues([]);
    expect(result.productVariantId).toBe("");
    if (result.productVariant) 
        expect(result.productVariant.name).toBe(""); // emptyProductVariant
    expect(result.requiredStock).toBe(0); // stock = 0
    expect(result.totalPrice).toBe(0);
  });

  it("debe asignar requiredStock = 0 si el stock es 0", () => {
    const variantWithoutStock = { ...baseVariant, stock: 0 };
    const result = getInitialProductDialogValues([variantWithoutStock]);
    expect(result.requiredStock).toBe(0);
  });

  it("debe asignar requiredStock = 1 si el stock es mayor a 0", () => {
    const variantWithStock = { ...baseVariant, stock: 5 };
    const result = getInitialProductDialogValues([variantWithStock]);
    expect(result.requiredStock).toBe(1);
  });
});
