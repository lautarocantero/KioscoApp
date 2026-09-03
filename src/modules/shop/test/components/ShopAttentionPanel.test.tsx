import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import type { ShopAttentionPanelProps } from "@typings/shop/shopComponentTypes";
import ShopAttentionPanel from "../../components/ShopAttentionPanel";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";

const buildProps = (overrides: Partial<ShopAttentionPanelProps> = {}): ShopAttentionPanelProps => ({
    criticalStockCount: 0,
    lowStockCount: 0,
    partialsAlert: { count: 0, totalAmount: 0, oldestDebtDays: null },
    isLoading: false,
    error: null,
    isRestockDownloadDisabled: false,
    onRestockDownload: vi.fn(),
    ...overrides,
});

describe("ShopAttentionPanel", () => {
    it("sin alertas: muestra el estado vacío, sin badge de conteo", () => {
        renderWithTheme(<ShopAttentionPanel {...buildProps()} />);
        expect(screen.getByText(/Sin pendientes urgentes/i)).toBeInTheDocument();
    });

    it("muestra la fila de stock crítico con el total de crítico + bajo", () => {
        renderWithTheme(<ShopAttentionPanel {...buildProps({ criticalStockCount: 4, lowStockCount: 11 })} />);
        expect(screen.getByText("15")).toBeInTheDocument();
    });

    it("muestra la fila de fiados sin cobrar con el monto real", () => {
        renderWithTheme(
            <ShopAttentionPanel {...buildProps({ partialsAlert: { count: 7, totalAmount: 38400, oldestDebtDays: 31 } })} />
        );
        expect(screen.getByText(/38.400|38400/)).toBeInTheDocument();
    });

    it("dispara onRestockDownload al hacer click en 'Reponer y pedir'", () => {
        const onRestockDownload = vi.fn();
        renderWithTheme(<ShopAttentionPanel {...buildProps({ onRestockDownload })} />);

        fireEvent.click(screen.getByRole("button"));
        expect(onRestockDownload).toHaveBeenCalled();
    });

    it("deshabilita el botón de reposición cuando isRestockDownloadDisabled es true", () => {
        renderWithTheme(<ShopAttentionPanel {...buildProps({ isRestockDownloadDisabled: true })} />);
        expect(screen.getByRole("button")).toBeDisabled();
    });
});
