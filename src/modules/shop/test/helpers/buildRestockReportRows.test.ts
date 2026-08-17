import { describe, it, expect } from "vitest";
import type { Presentation } from "@typings/presentation/presentationTypes";
import type { Product } from "@typings/product/productTypes";
import { buildRestockReportRows } from "../../helpers/buildRestockReportRows";

const presentation = (
    id: string,
    name: string,
    stock: number,
    min_stock: number,
    product_id = "p1"
): Presentation => ({
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
    product_id,
    barcode: "",
    sku: "",
    stock,
    updated_at: "",
    is_perishable: false,
    sale_type: "unit" as Presentation["sale_type"],
});

const product = (id: string, name: string): Product => ({
    _id: id,
    name,
    description: "",
    brand: "",
    image_url: "",
    created_at: "",
    updated_at: "",
    presentations: [],
});

describe("buildRestockReportRows", () => {
    it("excluye presentaciones con stock igual o por encima del mínimo", () => {
        const rows = buildRestockReportRows([presentation("1", "Ok", 20, 10)], [product("p1", "Fideos")]);
        expect(rows).toEqual([]);
    });

    it("resuelve el nombre del producto padre vía product_id", () => {
        const rows = buildRestockReportRows(
            [presentation("1", "500g", 2, 10, "p1")],
            [product("p1", "Fideos Matarazzo"), product("p2", "Aceite")]
        );

        expect(rows[0].productName).toBe("Fideos Matarazzo");
        expect(rows[0].presentationName).toBe("500g");
    });

    it("deja el nombre de producto vacío si no encuentra el product_id en el catálogo", () => {
        const rows = buildRestockReportRows([presentation("1", "500g", 2, 10, "missing")], []);
        expect(rows[0].productName).toBe("");
    });

    it("calcula la reposición mínima como min_stock - stock", () => {
        const rows = buildRestockReportRows([presentation("1", "500g", 3, 10)], [product("p1", "Fideos")]);
        expect(rows[0].minRestock).toBe(7);
        expect(rows[0].currentStock).toBe(3);
        expect(rows[0].minStock).toBe(10);
    });

    it("suma el faltante hasta el mínimo aunque el stock esté sobrevendido (negativo)", () => {
        const rows = buildRestockReportRows([presentation("1", "500g", -5, 10)], [product("p1", "Fideos")]);
        expect(rows[0].minRestock).toBe(15);
    });

    it("deja provider1 y provider2 vacíos (todavía no hay proveedores por presentación)", () => {
        const rows = buildRestockReportRows([presentation("1", "500g", 2, 10)], [product("p1", "Fideos")]);
        expect(rows[0].provider1).toBe("");
        expect(rows[0].provider2).toBe("");
    });

    it("ordena las más críticas primero, igual que getLowStockPresentations", () => {
        const rows = buildRestockReportRows(
            [
                presentation("1", "80%", 8, 10),
                presentation("2", "20%", 2, 10),
                presentation("3", "0%", 0, 10),
            ],
            [product("p1", "Fideos")]
        );

        expect(rows.map((r) => r.presentationName)).toEqual(["0%", "20%", "80%"]);
    });

    it("nunca cuenta como bajo si min_stock es 0 (no hay mínimo configurado)", () => {
        const rows = buildRestockReportRows([presentation("1", "Sin mínimo", 0, 0)], [product("p1", "Fideos")]);
        expect(rows).toEqual([]);
    });
});
