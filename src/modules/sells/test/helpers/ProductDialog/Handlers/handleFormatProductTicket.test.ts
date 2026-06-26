import { describe, it, expect } from "vitest";
import formatProductTicket from "../../../../helpers/ProductDialog/Handlers/handleFormatProductTicket";

const mockedData = {
    _id: "1", 
    brand: "X", 
    created_at: "2024", 
    description: "desc", 
    expiration_date: "2025", 
    gallery_urls: ["not-a-url"], 
    image_url: "img.png", 
    min_stock: 1, 
    model_size: "M", 
    model_type: "type", 
    name: "Test", 
    price: 10, 
    product_id: "pid", 
    sku: "sku", 
    stock: 5, 
    updated_at: "2025" 
}

describe("formatProductTicket", () => {

    it("lanza error si Presentation no está definido", () => {
      expect(() => {
        // @ts-expect-error probando caso inválido
        formatProductTicket({ Presentation: undefined, requiredStock: 1 });
      }).toThrow("No se ha encontrado el producto");
    });

    it("devuelve un objeto ProductTicketType válido", () => {
      const result = formatProductTicket({ Presentation: mockedData, requiredStock: 5 });

      expect(result).toBeDefined();
      expect(result?._id).toBe("1");
      expect(result?.name).toBe("Test");
      expect(result?.stock_required).toBe(5);
    });

    it("incluye todos los campos principales del Presentation", () => {
      const result = formatProductTicket({ Presentation: mockedData!, requiredStock: 2 });

      expect(result).toMatchObject({
        _id: "1", 
        brand: "X", 
        description: "desc", 
        expiration_date: "2025", 
        image_url: "img.png", 
        model_size: "M", 
        model_type: "type", 
        name: "Test", 
        price: 10, 
        product_id: "pid", 
        sku: "sku", 
        stock_required: 2, 
      });
    });

});
