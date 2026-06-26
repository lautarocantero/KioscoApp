import ProductDialogValidationSchema from "../../../../helpers/ProductDialog/Getters/getProductDialogValidationSchema";
import { describe, expect, it } from "vitest";


describe("Helper: getProductDialogValidationSchema", () => {

    it("debería fallar si falta PresentationId", async () => { 
        const data = { PresentationId: "", requiredStock: 1, totalPrice: 100 }; 
        await expect(ProductDialogValidationSchema.validate(data)) 
            .rejects.toThrow("Campo requerido"); 
    });

    it("deberia fallar si el stock <= 0", async () => {
        const data = { PresentationId: "123", requiredStock: 0, totalPrice: 100};
        await expect(ProductDialogValidationSchema.validate(data))
            .rejects.toThrow("El stock requerido debe ser mayor a 0");
    });

    it("debería fallar si gallery_urls contiene un valor inválido", async () => { 
        const data = { 
            PresentationId: "123", 
            Presentation: { 
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
            }, 
            requiredStock: 1, 
            totalPrice: 100, 
        }; 
        await expect(ProductDialogValidationSchema.validate(data)) 
            .rejects.toThrow("Debe ser una URL válida"); });

})