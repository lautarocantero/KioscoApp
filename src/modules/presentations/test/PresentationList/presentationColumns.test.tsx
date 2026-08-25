import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import type { GridRenderCellParams } from "@mui/x-data-grid";
import type { TFunction } from "i18next";
import type { Presentation } from "@typings/presentation/presentationTypes";
import { ModelUnit } from "@typings/presentation/presentationEnum";
import { buildColumnsForPresentations } from "../../pages/PresentationList/components/presentationColumns";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";

const t = ((key: string) => key) as TFunction;

const buildPresentation = (overrides: Partial<Presentation> = {}): Presentation => ({
    _id: "presentation-1",
    brand: "Coca Cola",
    category: [],
    created_at: "2026-01-01",
    description: "Botella 1.5L",
    expiration_date: "2027-01-01",
    image_url: "",
    min_stock: 5,
    model_size: 1.5,
    model_type: "Botella",
    model_unit: ModelUnit.Liters,
    name: "Coca Cola 1.5L",
    price: 2500,
    product_id: "product-1",
    barcode: "7790895000782",
    sku: "COCA-1.5L",
    stock: 20,
    updated_at: "2026-01-01",
    is_perishable: false,
    sale_type: "unit",
    ...overrides,
});

const buildCellParams = (presentation: Presentation): GridRenderCellParams<Presentation> =>
    ({ row: presentation } as GridRenderCellParams<Presentation>);

const getActionsColumn = (isAdmin: boolean) => {
    const onDeleteRequest = vi.fn();
    const onRestockRequest = vi.fn();
    const navigate = vi.fn();
    const columns = buildColumnsForPresentations({ onDeleteRequest, onRestockRequest, navigate, t, isAdmin });
    const column = columns.find((col) => col.field === "actions");
    if (!column) throw new Error('Column "actions" not found');
    return { column, onDeleteRequest, navigate };
};

describe("buildColumnsForPresentations — columna actions", () => {
    it("admin: el botón Eliminar está habilitado y dispara onDeleteRequest", () => {
        const { column, onDeleteRequest } = getActionsColumn(true);
        const presentation = buildPresentation();

        renderWithTheme(column.renderCell!(buildCellParams(presentation)));
        const deleteButton = screen.getByRole("button", { name: "presentations.table.actions.delete" });

        expect(deleteButton).not.toBeDisabled();
        fireEvent.click(deleteButton);
        expect(onDeleteRequest).toHaveBeenCalledWith("presentation-1", "Coca Cola 1.5L");
    });

    it("seller (no admin): el botón Eliminar aparece disabled con tooltip", async () => {
        const { column, onDeleteRequest } = getActionsColumn(false);
        const presentation = buildPresentation();

        renderWithTheme(column.renderCell!(buildCellParams(presentation)));
        const deleteButton = screen.getByRole("button", { name: "presentations.table.actions.delete" });

        expect(deleteButton).toBeDisabled();
        fireEvent.click(deleteButton);
        expect(onDeleteRequest).not.toHaveBeenCalled();

        fireEvent.mouseOver(deleteButton);
        expect(await screen.findByText("permissions.adminOnly")).toBeInTheDocument();
    });
});
