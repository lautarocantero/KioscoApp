import validateProductSelection from "../../../../helpers/ProductDialog/Validation/ValidateProductSelection";
import { describe, expect, it } from "vitest";

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

describe("", () => {

    it("falla si el evento no tiene target", () => {
      const result = validateProductSelection({ event: {}, products: [], productId: "123" });
      expect(result.valid).toBe(false);
      expect(result.message).toMatch(/error al agregar/);
    });

    it("falla si productId es inexistente", () => {
      // @ts-expect-error probando valor undefined
      const result = validateProductSelection({ event: { target:{} }, products: [], productId: undefined });
      expect(result.valid).toBe(false);
      expect(result.message).toMatch(/No se ha encontrado el producto./);
    });

    it("falla si productId está vacío", () => {
      const result = validateProductSelection({ event: { target:{} }, products: [], productId: "   " });
      expect(result.valid).toBe(false);
      expect(result.message).toMatch(/Id del producto esta vacio/);
    });

    it("falla si products no es array", () => {
      // @ts-expect-error probando valor null
      const result = validateProductSelection({ event: { target:{} }, products: null , productId: "123" });
      expect(result.valid).toBe(false);
      expect(result.message).toMatch(/No han cargado correctamente/);
    });

    it("falla si products está vacío", () => {
      const result = validateProductSelection({ event: { target:{} }, products: [], productId: "123" });
      expect(result.valid).toBe(false);
      expect(result.message).toMatch(/No han cargado correctamente/);
    });

    it("pasa si todos los datos son válidos", () => {
      const result = validateProductSelection({ event: { target:{} }, products: [data], productId: "123" });
      expect(result.valid).toBe(true);
    });

})
