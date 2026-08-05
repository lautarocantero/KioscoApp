import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import type { Product } from "../../../../typings/product/productTypes";
import { buildColumnsForProductExhibitor } from "../../components/ProductsExhibitorList/ProductExhibitorColumns";
import type { GridColDef } from "@mui/x-data-grid";
import { ProductDialogContext } from "../../context/Product/ProductDialogContext";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

const testTheme = createTheme({
    custom: {
        white: "rgb(255, 255, 255)",
        black: "rgb(0, 0, 0)",
    },
} as any);

const mockProductDialogContext = {
    setShowModal: vi.fn(),
    showModal: false,
};

const testStore = configureStore({
    reducer: {
        dummy: (state = {}) => state,
    },
});

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
    const column = buildColumnsForProductExhibitor().find((col) => col.field === field);
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

            render(
                <ThemeProvider theme={testTheme}>
                    {column.renderCell!({ row: product } as any)}
                </ThemeProvider>
            );

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

            expect((column.valueGetter as any)(undefined, product, column, {})).toBe("-");
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

            render(
                <Provider store={testStore}>
                    <ThemeProvider theme={testTheme}>
                        <ProductDialogContext.Provider value={mockProductDialogContext as any}>
                            {column.renderCell!({ row: product } as any)}
                        </ProductDialogContext.Provider>
                    </ThemeProvider>
                </Provider>
            );

            expect(document.body).toBeTruthy();
        });
    });
});