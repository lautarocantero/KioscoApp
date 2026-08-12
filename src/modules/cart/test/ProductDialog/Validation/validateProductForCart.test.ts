// src/modules/sells/test/helpers/ProductDialog/Validation/ValidateProductForCart.test.ts
import { describe, expect, it } from "vitest";
import { SALE_TYPE_VALUES, type SaleType } from "@typings/presentation/presentationEnum";
import { ModelUnit } from "@typings/presentation/presentationEnum";
import validateProductForCart from "../../../../cart/helpers/ProductDialog/Validation/ValidateProductForCart";

const UNIT_SALE_TYPE: SaleType = SALE_TYPE_VALUES[0]; // "unit"
const WEIGHT_SALE_TYPE: SaleType = SALE_TYPE_VALUES[1]; // "weight"

const data = {
    name: "Test",
    price: 10,
    stock: 5,
    _id: "1",
    brand: "X",
    category: [],
    created_at: "2024",
    description: "desc",
    expiration_date: "2025",
    image_url: "img.png",
    min_stock: 1,
    model_size: 500,
    model_type: "type",
    model_unit: ModelUnit.Units,
    is_perishable: false,
    product_id: "pid",
    barcode: "7791234567890",
    sku: "sku",
    updated_at: "2025",
    sale_type: UNIT_SALE_TYPE,
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

    it("falla si requiredStock no es múltiplo de 100 cuando sale_type es weight", () => {
    const weightData = { ...data, sale_type: WEIGHT_SALE_TYPE, model_unit: ModelUnit.Grams, stock: 500 };
    const result = validateProductForCart({ Presentation: weightData, requiredStock: 150 });
    expect(result.valid).toBe(false);
    expect(result.message).toMatch(/múltiplo de 100 gramos/);
    });

    it("pasa si requiredStock es múltiplo de 100 cuando sale_type es weight", () => {
    const weightData = { ...data, sale_type: WEIGHT_SALE_TYPE, model_unit: ModelUnit.Grams, stock: 500 };
    const result = validateProductForCart({ Presentation: weightData, requiredStock: 200 });
    expect(result.valid).toBe(true);
    });

    it("muestra el stock disponible en gramos cuando sale_type es weight", () => {
    const weightData = { ...data, sale_type: WEIGHT_SALE_TYPE, model_unit: ModelUnit.Grams, stock: 100 };
    const result = validateProductForCart({ Presentation: weightData, requiredStock: 200 });
    expect(result.valid).toBe(false);
    expect(result.message).toMatch(/stock disponible es de 100g/);
    });

    it("muestra el stock disponible en unidades cuando sale_type es unit", () => {
    const result = validateProductForCart({ Presentation: { ...data, stock: 2 }, requiredStock: 5 });
    expect(result.message).toMatch(/2 unidades/);
    });

});