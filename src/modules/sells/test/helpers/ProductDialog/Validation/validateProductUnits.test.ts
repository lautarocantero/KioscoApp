import validateProductUnits from "../../../../helpers/ProductDialog/Validation/ValidateProductUnits";
import { describe, it, expect } from "vitest";

const data = {
    gallery_urls: ["not-a-url"], 
    name: "Test", 
    price: 10, 
    stock: 5, 
    _id: "1", 
    brand: "X", 
    created_at: "2024", 
    description: "desc", 
    expiration_date: "2025", 
    image_url: "img.png", 
    min_stock: 1, 
    model_size: "M", 
    model_type: "type", 
    product_id: "pid", 
    sku: "sku", 
    updated_at: "2025" 
}

describe("validateProductUnits", () => {
  it("falla si el valor es nulo", () => {
    const result = validateProductUnits({ incomingValue: null, Presentation: data });
    expect(result.valid).toBe(false);
    expect(result.message).toMatch(/nulo/);
  });

  it("falla si el valor no es numérico", () => {
    // @ts-expect-error probando valor no numérico
    const result = validateProductUnits({ incomingValue: "abc" as unknown, Presentation: data });
    expect(result.valid).toBe(false);
    expect(result.message).toMatch(/no es numérico/);
  });

  it("ajusta a 1 si el valor es menor o igual a 0", () => {
    const result = validateProductUnits({ incomingValue: 0, Presentation: data });
    expect(result.valid).toBe(false);
    expect(result.adjustedValue).toBe(1);
    expect(result.message).toMatch(/mínima es 1/);
  });

  it("falla si no hay producto seleccionado", () => {
    const result = validateProductUnits({ incomingValue: 2, Presentation: undefined });
    expect(result.valid).toBe(false);
    expect(result.message).toMatch(/producto válido/);
  });

  it("ajusta al máximo si el valor supera el stock", () => {
    const result = validateProductUnits({ incomingValue: 20, Presentation: data });
    expect(result.valid).toBe(false);
    expect(result.adjustedValue).toBe(5);
    expect(result.message).toMatch(/máxima permitida es 5/);
  });

  it("pasa si el valor es válido y dentro del stock", () => {
    const result = validateProductUnits({ incomingValue: 5, Presentation: data });
    expect(result.valid).toBe(true);
  });
});
