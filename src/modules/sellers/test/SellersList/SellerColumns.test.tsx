import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import type { GridRenderCellParams } from "@mui/x-data-grid";
import type { Seller } from "@typings/seller/sellerTypes";
import { SellerStatus } from "@typings/seller/sellerEnums";
import { buildColumnsForSellers } from "../../pages/SellersList/components/SellerColumns";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";

const buildSeller = (overrides: Partial<Seller> = {}): Seller => ({
    _id: "seller-1",
    name: "Ana",
    profilePhoto: null,
    created_at: "2026-01-01",
    user_status: SellerStatus.Online,
    ...overrides,
});

const buildCellParams = (seller: Seller): GridRenderCellParams<Seller> =>
    ({ row: seller } as GridRenderCellParams<Seller>);

const getActionsColumn = (isAdmin: boolean) => {
    const onDeleteRequest = vi.fn();
    const onEditRequest = vi.fn();
    const navigate = vi.fn();
    const columns = buildColumnsForSellers({ onDeleteRequest, onEditRequest, navigate, isAdmin });
    const column = columns.find((col) => col.field === "actions");
    if (!column) throw new Error('Column "actions" not found');
    return { column, onDeleteRequest, navigate };
};

describe("buildColumnsForSellers — columna actions", () => {
    it("admin: el botón Eliminar está habilitado y dispara onDeleteRequest", () => {
        const { column, onDeleteRequest } = getActionsColumn(true);
        const seller = buildSeller();

        renderWithTheme(column.renderCell!(buildCellParams(seller)));
        const deleteButton = screen.getByRole("button", { name: "Eliminar" });

        expect(deleteButton).not.toBeDisabled();
        fireEvent.click(deleteButton);
        expect(onDeleteRequest).toHaveBeenCalledWith("seller-1", "Ana");
    });

    it("seller (no admin): el botón Eliminar aparece disabled con tooltip", async () => {
        const { column, onDeleteRequest } = getActionsColumn(false);
        const seller = buildSeller();

        renderWithTheme(column.renderCell!(buildCellParams(seller)));
        const deleteButton = screen.getByRole("button", { name: "Eliminar" });

        expect(deleteButton).toBeDisabled();
        fireEvent.click(deleteButton);
        expect(onDeleteRequest).not.toHaveBeenCalled();

        fireEvent.mouseOver(deleteButton);
        expect(await screen.findByText("Solo disponible para el administrador")).toBeInTheDocument();
    });
});
