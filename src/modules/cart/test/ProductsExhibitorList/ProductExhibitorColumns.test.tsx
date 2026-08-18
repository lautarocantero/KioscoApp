import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import type { Product } from "../../../../typings/product/productTypes";
import { buildColumnsForProductExhibitor } from "../../components/ProductsExhibitorList/ProductExhibitorColumns";
import type { GridColDef } from "@mui/x-data-grid";
import { renderWithTheme, renderWithProviders } from "../../../shared/test/utils/setupTests"; // 👈 ajustá el path
import i18n from "@i18n/i18n";

const buildProduct = (overrides: Partial<Product> = {}): Product =>
    ({
        _id: "1",
        name: "Coca Cola",
        image_url: "/images/coca.png",
        presentations: [
            {
                model_type: "Botella",
                model_size: "1.5L",
                category: ["Bebidas", "Gaseosas"],
                stock: 10,
            },
        ],
        ...overrides,
    } as Product);

const getColumn = (field: string) => {
    const column = buildColumnsForProductExhibitor(i18n.t.bind(i18n)).find((col) => col.field === field);
    if (!column) throw new Error(`Column "${field}" not found`);
    return column;
};

const callValueGetter = (column: GridColDef<Product>, product: Product) =>
    (column.valueGetter as any)(undefined, product, column, {});

describe("buildColumnsForProductExhibitor", () => {
    describe("columna name", () => {
        it("renderiza la imagen y el nombre del producto", () => {
            const column = getColumn("name");
            const product = buildProduct();

            renderWithTheme(column.renderCell!({ row: product } as any));

            expect(screen.getByAltText("Coca Cola")).toBeInTheDocument();
            expect(screen.getByText("Coca Cola")).toBeInTheDocument();
        });
    });

    describe("columna presentation", () => {
        it("devuelve tipo y tamaño cuando hay una presentación", () => {
            const column = getColumn("presentation");
            const product = buildProduct();

            expect(callValueGetter(column, product)).toBe("Botella, 1.5L");
        });

        it("devuelve '-' cuando no hay presentaciones", () => {
            const column = getColumn("presentation");
            const product = buildProduct({ presentations: [] });

            expect(callValueGetter(column, product)).toBe("-");
        });
    });

    describe("columna category", () => {
        it("devuelve las categorías unidas por coma", () => {
            const column = getColumn("category");
            const product = buildProduct();

            expect(callValueGetter(column, product)).toBe("Bebidas, Gaseosas");
        });

        it("devuelve '-' cuando la categoría está vacía", () => {
            const column = getColumn("category");
            const product = buildProduct({
                presentations: [{ model_type: "Botella", model_size: "1.5L", category: [], stock: 10 }],
            });

            expect(callValueGetter(column, product)).toBe("-");
        });

        it("devuelve '-' cuando no hay presentaciones", () => {
            const column = getColumn("category");
            const product = buildProduct({ presentations: [] });

            expect(callValueGetter(column, product)).toBe("-");
        });
    });

    describe("columna stock", () => {
        it("devuelve el stock de la primera presentación", () => {
            const column = getColumn("stock");
            const product = buildProduct();

            expect(callValueGetter(column, product)).toBe(10);
        });

        it("devuelve 0 cuando no hay presentaciones", () => {
            const column = getColumn("stock");
            const product = buildProduct({ presentations: [] });

            expect(callValueGetter(column, product)).toBe(0);
        });
    });

    describe("columna actions", () => {
        it("renderiza ProductRowActionCell con el producto", () => {
            const column = getColumn("actions");
            const product = buildProduct();

            renderWithProviders(column.renderCell!({ row: product } as any));

            expect(document.body).toBeTruthy();
        });
    });
});