import { describe, it, expect, vi, beforeEach } from "vitest";
import type { RestockReportRow } from "@typings/shop/shopTypes";

const autoTable = vi.fn();
const save = vi.fn();
const text = vi.fn();
const setFontSize = vi.fn();

vi.mock("jspdf", () => ({
    default: vi.fn().mockImplementation(() => ({
        setFontSize,
        text,
        autoTable,
        save,
    })),
}));

vi.mock("jspdf-autotable", () => ({
    applyPlugin: vi.fn(),
}));

const { createRestockReportPdf } = await import("../../helpers/createRestockReportPdf");

const row = (overrides: Partial<RestockReportRow> = {}): RestockReportRow => ({
    productName: "Fideos Matarazzo",
    presentationName: "500g",
    currentStock: 2,
    minStock: 10,
    minRestock: 8,
    provider1: "",
    provider2: "",
    ...overrides,
});

describe("createRestockReportPdf", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("arma la tabla con una fila por presentación, en el orden recibido", () => {
        createRestockReportPdf([row(), row({ presentationName: "1kg", currentStock: 0, minRestock: 10 })]);

        expect(autoTable).toHaveBeenCalledWith(
            expect.objectContaining({
                head: [["Producto", "Presentación", "Stock actual", "Stock mínimo", "Reposición mínima", "Proveedor 1", "Proveedor 2"]],
                body: [
                    ["Fideos Matarazzo", "500g", "2", "10", "8", "", ""],
                    ["Fideos Matarazzo", "1kg", "0", "10", "10", "", ""],
                ],
            })
        );
    });

    it("no rompe con una lista vacía (nada por reponer)", () => {
        expect(() => createRestockReportPdf([])).not.toThrow();
        expect(autoTable).toHaveBeenCalledWith(expect.objectContaining({ body: [] }));
    });

    it("descarga el PDF con un nombre de archivo que identifica que es la boleta de reposición", () => {
        createRestockReportPdf([row()]);
        expect(save).toHaveBeenCalledWith(expect.stringMatching(/^boleta_reposicion_.*\.pdf$/));
    });
});
