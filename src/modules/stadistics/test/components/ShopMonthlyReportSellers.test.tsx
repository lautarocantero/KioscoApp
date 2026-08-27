import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import type { SellerReportRow } from "@typings/stadistics/stadisticsTypes";
import ShopMonthlyReportSellers from "../../components/ShopMonthlyReportSellers";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";

const seller = (overrides: Partial<SellerReportRow> = {}): SellerReportRow => ({
    sellerId: "1",
    sellerName: "Lautaro Cantero",
    amount: 2947500,
    ticketsCount: 1984,
    participationPct: 61,
    changePct: 11.2,
    isNew: false,
    maxTicketAmount: 1644,
    ...overrides,
});

const renderSellers = (props: Partial<React.ComponentProps<typeof ShopMonthlyReportSellers>> = {}) =>
    renderWithTheme(
        <MemoryRouter>
            <ShopMonthlyReportSellers
                sellers={[seller()]}
                sellersNote={null}
                canViewAmounts
                isLoading={false}
                error={null}
                {...props}
            />
        </MemoryRouter>
    );

describe("ShopMonthlyReportSellers", () => {
    it("admin: muestra el nombre y los tickets de cada vendedor", () => {
        renderSellers();

        expect(screen.getByText("Lautaro Cantero")).toBeInTheDocument();
        expect(screen.getByText("1984 tickets")).toBeInTheDocument();
        expect(screen.getByText("▲ 11,2%")).toBeInTheDocument();
    });

    it("vendedor sin permisos (canViewAmounts=false): oculta los montos y muestra el aviso", () => {
        renderSellers({ canViewAmounts: false });

        expect(screen.queryByText("Lautaro Cantero")).not.toBeInTheDocument();
        expect(screen.getByText("Solo disponible para el administrador")).toBeInTheDocument();
    });

    it("sin ventas de vendedores: muestra el mensaje vacío en vez de una lista en cero", () => {
        renderSellers({ sellers: [] });
        expect(screen.getByText("Todavía no hay ventas de vendedores este mes.")).toBeInTheDocument();
    });

    it("vendedor nuevo (isNew=true): muestra 'primer mes' en vez de una variación", () => {
        renderSellers({ sellers: [seller({ isNew: true, changePct: null })] });

        expect(screen.getByText(/primer mes/)).toBeInTheDocument();
        expect(screen.queryByText(/▲|▼/)).not.toBeInTheDocument();
    });
});
