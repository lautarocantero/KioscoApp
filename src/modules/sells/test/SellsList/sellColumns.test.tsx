import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import type { GridRenderCellParams } from "@mui/x-data-grid";
import type { TFunction } from "i18next";
import type { SellTicketType } from "@typings/sells/sellTypes";
import { SellStatusEnum } from "@typings/sells/sellsEnum";
import { PaymentMethod } from "@typings/sells/sellsEnum";
import { buildColumnsForSells } from "../../pages/SellsList/components/sellColumns";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";

const t = ((key: string) => key) as TFunction;

const buildSell = (overrides: Partial<SellTicketType> = {}): SellTicketType => ({
    _id: "sell-1",
    currency: "ARS",
    iva: 0,
    modification_date: "2026-01-01",
    payment_method: PaymentMethod.Cash,
    products: [],
    purchase_date: "2026-01-01",
    seller_id: "seller-1",
    seller_name: "Ana",
    sub_total: 1000,
    total_amount: 1000,
    status: SellStatusEnum.Completada,
    amount_paid: 1000,
    debtor_name: null,
    settles_sell_id: null,
    settled_by_sell_id: null,
    ...overrides,
});

const buildCellParams = (sell: SellTicketType): GridRenderCellParams<SellTicketType> =>
    ({ row: sell } as GridRenderCellParams<SellTicketType>);

const getActionsColumn = (isAdmin: boolean) => {
    const onDeleteRequest = vi.fn();
    const onSettleDebtRequest = vi.fn();
    const navigate = vi.fn();
    const columns = buildColumnsForSells({ onDeleteRequest, onSettleDebtRequest, navigate, t, isAdmin });
    const column = columns.find((col) => col.field === "actions");
    if (!column) throw new Error('Column "actions" not found');
    return { column, onDeleteRequest, navigate };
};

describe("buildColumnsForSells — columna actions", () => {
    it("admin: el botón Eliminar está habilitado y dispara onDeleteRequest", () => {
        const { column, onDeleteRequest } = getActionsColumn(true);
        const sell = buildSell();

        renderWithTheme(column.renderCell!(buildCellParams(sell)));
        const deleteButton = screen.getByRole("button", { name: "sells.table.actions.delete" });

        expect(deleteButton).not.toBeDisabled();
        fireEvent.click(deleteButton);
        expect(onDeleteRequest).toHaveBeenCalledWith("sell-1", "sell-1");
    });

    it("seller (no admin): el botón Eliminar aparece disabled con tooltip", async () => {
        const { column, onDeleteRequest } = getActionsColumn(false);
        const sell = buildSell();

        renderWithTheme(column.renderCell!(buildCellParams(sell)));
        const deleteButton = screen.getByRole("button", { name: "sells.table.actions.delete" });

        expect(deleteButton).toBeDisabled();
        fireEvent.click(deleteButton);
        expect(onDeleteRequest).not.toHaveBeenCalled();

        fireEvent.mouseOver(deleteButton);
        expect(await screen.findByText("permissions.adminOnly")).toBeInTheDocument();
    });
});
