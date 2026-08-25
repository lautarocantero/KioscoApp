import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import type { GridRenderCellParams } from "@mui/x-data-grid";
import type { TFunction } from "i18next";
import type { Product } from "@typings/product/productTypes";
import { buildColumnsForProducts } from "../../pages/ProductsList/components/productColumns";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";

const t = ((key: string) => key) as TFunction;

const buildProduct = (overrides: Partial<Product> = {}): Product => ({
    _id: "product-1",
    name: "Coca Cola",
    description: "Gaseosa",
    brand: "Coca Cola Co.",
    image_url: "",
    created_at: "2026-01-01",
    updated_at: "2026-01-01",
    presentations: [],
    ...overrides,
});

const buildCellParams = (product: Product): GridRenderCellParams<Product> =>
    ({ row: product } as GridRenderCellParams<Product>);

const getActionsColumn = (isAdmin: boolean) => {
    const onDeleteRequest = vi.fn();
    const navigate = vi.fn();
    const columns = buildColumnsForProducts({ onDeleteRequest, navigate, t, isAdmin });
    const column = columns.find((col) => col.field === "actions");
    if (!column) throw new Error('Column "actions" not found');
    return { column, onDeleteRequest, navigate };
};

describe("buildColumnsForProducts — columna actions", () => {
    it("admin: el botón Eliminar está habilitado y dispara onDeleteRequest", () => {
        const { column, onDeleteRequest } = getActionsColumn(true);
        const product = buildProduct();

        renderWithTheme(column.renderCell!(buildCellParams(product)));
        const deleteButton = screen.getByRole("button", { name: "Eliminar" });

        expect(deleteButton).not.toBeDisabled();
        fireEvent.click(deleteButton);
        expect(onDeleteRequest).toHaveBeenCalledWith("product-1", "Coca Cola");
    });

    it("seller (no admin): el botón Eliminar aparece disabled con tooltip", async () => {
        const { column, onDeleteRequest } = getActionsColumn(false);
        const product = buildProduct();

        renderWithTheme(column.renderCell!(buildCellParams(product)));
        const deleteButton = screen.getByRole("button", { name: "Eliminar" });

        expect(deleteButton).toBeDisabled();
        fireEvent.click(deleteButton);
        expect(onDeleteRequest).not.toHaveBeenCalled();

        fireEvent.mouseOver(deleteButton);
        expect(await screen.findByText("permissions.adminOnly")).toBeInTheDocument();
    });
});
