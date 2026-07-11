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

})