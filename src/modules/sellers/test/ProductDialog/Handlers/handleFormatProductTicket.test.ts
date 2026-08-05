// src/modules/sells/test/helpers/ProductDialog/Handlers/handleFormatProductTicket.test.ts
import { describe, it, expect } from "vitest";
import formatProductTicket from "../../../helpers/ProductDialog/Handlers/handleFormatProductTicket";
import { SALE_TYPE_LABELS } from "@typings/presentation/presentationCategoryLabels";
import { SALE_TYPE_VALUES, type SaleType } from "@typings/presentation/presentationEnum";

const UNIT_SALE_TYPE: SaleType = SALE_TYPE_VALUES[0]; // "unit"

const mockedData = {
    _id: "1",
    brand: "X",
    category: [],
    created_at: "2024",
    description: "desc",
    expiration_date: "2025",
    image_url: "img.png",
    min_stock: 1,
    model_size: "M",
    model_type: "type",
    name: "Test",
    price: 10,
    product_id: "pid",
    barcode: "7791234567890",
    sku: "sku",
    stock: 5,
    updated_at: "2025",
    sale_type: UNIT_SALE_TYPE,
};

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
      const result = formatProductTicket({ Presentation: mockedData, requiredStock: 2 });

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

    it("calcula stock_required sin dividir cuando sale_type es 'unit'", () => {
      const unitData = { ...mockedData, sale_type: UNIT_SALE_TYPE };
      const result = formatProductTicket({ Presentation: unitData, requiredStock: 8 });
      expect(result?.stock_required).toBe(8);
    });

    // NOTA: el helper compara `sale_type` contra SALE_TYPE_LABELS.weight ("Por peso"),
    // no contra el literal "weight". Este test documenta el comportamiento ACTUAL
    // del helper, que es conocido y pendiente de revisión (ver conversación).
    it("calcula stock_required dividiendo entre 100 cuando sale_type coincide con el label de weight", () => {
      const weightData = {
        ...mockedData,
        sale_type: SALE_TYPE_LABELS.weight as SaleType,
      };
      const result = formatProductTicket({ Presentation: weightData, requiredStock: 250 });
      expect(result?.stock_required).toBe(2.5);
    });

    it("no incluye campos que no pertenecen al ticket (created_at, updated_at, min_stock, category, barcode)", () => {
      const result = formatProductTicket({ Presentation: mockedData, requiredStock: 5 });
      expect(result).not.toHaveProperty("created_at");
      expect(result).not.toHaveProperty("updated_at");
      expect(result).not.toHaveProperty("min_stock");
      expect(result).not.toHaveProperty("category");
      expect(result).not.toHaveProperty("barcode");
    });

});