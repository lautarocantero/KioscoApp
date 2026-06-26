import validateProductForCart from "../../../../helpers/ProductDialog/Validation/ValidateProductForCart";
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

describe("Helper: ValidateProductForCart", () => {

    it("Falla si no recibe un producto", () => {
        const response = validateProductForCart({Presentation: null, requiredStock: 5});
        expect(response.message).toBe("Ocurrió un error al agregar el producto.");
    })

    it("falla si requiredStock no es entero", () => {
    const result = validateProductForCart({ Presentation: data, requiredStock: 1.5 });
    expect(result.valid).toBe(false);
    expect(result.message).toMatch(/número entero/);
    });

    it("falla si requiredStock <= 0", () => {
    const result = validateProductForCart({ Presentation: data, requiredStock: 0 });
    expect(result.valid).toBe(false);
    expect(result.message).toMatch(/No hay stock/);
    });

    it("falla si stock disponible es menor al requerido", () => {
    const result = validateProductForCart({ Presentation: { ...data, stock: 2 }, requiredStock: 5 });
    expect(result.valid).toBe(false);
    expect(result.message).toMatch(/stock disponible es de 2/);
    });

    it("falla si el precio es inválido", () => {
    const result = validateProductForCart({ Presentation: { ...data, price: 0 }, requiredStock: 1 });
    expect(result.valid).toBe(false);
    expect(result.message).toMatch(/precio.*inválido/);
    });

    it("pasa si todos los datos son válidos", () => {
    const result = validateProductForCart({ Presentation: data, requiredStock: 5 });
    expect(result.valid).toBe(true);
    });
});
