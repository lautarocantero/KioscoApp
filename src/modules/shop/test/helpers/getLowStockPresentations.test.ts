import { describe, it, expect } from "vitest";
import type { Presentation } from "@typings/presentation/presentationTypes";
import { StockSeverity } from "@typings/shop/shopEnums";
import { getLowStockPresentations } from "../../helpers/getLowStockPresentations";

const presentation = (id: string, name: string, stock: number, min_stock: number): Presentation => ({
    _id: id,
    brand: "",
    category: [],
    created_at: "",
    description: "",
    expiration_date: "",
    image_url: "",
    min_stock,
    model_size: 0,
    model_type: "",
    model_unit: "unit" as Presentation["model_unit"],
    name,
    price: 0,
    product_id: "p1",
    barcode: "",
    sku: "",
    stock,
    updated_at: "",
    is_perishable: false,
    sale_type: "unit" as Presentation["sale_type"],
});

describe("getLowStockPresentations", () => {
    it("excluye presentaciones con stock igual o por encima del mínimo", () => {
        const result = getLowStockPresentations([presentation("1", "Ok", 20, 10)]);
        expect(result).toEqual([]);
    });

    it("marca Crítico cuando el stock es 0", () => {
        const result = getLowStockPresentations([presentation("1", "Sin stock", 0, 10)]);
        expect(result[0].severity).toBe(StockSeverity.Critico);
    });

    it("marca Crítico cuando el stock quedó negativo (venta que sobrepasó lo disponible)", () => {
        const result = getLowStockPresentations([presentation("1", "Sobrevendido", -3, 10)]);

        expect(result[0].severity).toBe(StockSeverity.Critico);
        expect(result[0].ratio).toBe(0);
    });

    it("nunca expone un stock negativo, aunque el dato real lo sea", () => {
        const result = getLowStockPresentations([presentation("1", "Sobrevendido", -3, 10)]);

        expect(result[0].stock).toBe(0);
    });

    it("prioriza el stock más negativo dentro de los empatados en ratio 0", () => {
        const result = getLowStockPresentations([
            presentation("1", "Menos negativo", -1, 10),
            presentation("2", "Más negativo", -5, 10),
            presentation("3", "Cero", 0, 10),
        ]);

        expect(result.map((r) => r.name)).toEqual(["Más negativo", "Menos negativo", "Cero"]);
    });

    it("marca Bajo cuando queda stock pero por debajo del mínimo", () => {
        const result = getLowStockPresentations([presentation("1", "Bajo", 5, 10)]);
        expect(result[0].severity).toBe(StockSeverity.Bajo);
    });

    it("calcula el ratio stock/mínimo y ordena las más críticas primero", () => {
        const result = getLowStockPresentations([
            presentation("1", "80%", 8, 10),
            presentation("2", "20%", 2, 10),
            presentation("3", "0%", 0, 10),
        ]);

        expect(result.map((r) => r.name)).toEqual(["0%", "20%", "80%"]);
        expect(result[2].ratio).toBeCloseTo(0.8);
    });

    it("nunca cuenta como bajo si min_stock es 0 (no hay mínimo configurado)", () => {
        const result = getLowStockPresentations([presentation("1", "Sin mínimo", 0, 0)]);
        expect(result).toEqual([]);
    });
});
