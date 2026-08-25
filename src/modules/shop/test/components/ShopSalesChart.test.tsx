import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { ShopSalesRange } from "@typings/shop/shopEnums";
import type { ShopSalesChartProps } from "@typings/shop/shopComponentTypes";
import ShopSalesChart from "../../components/ShopSalesChart";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";

const buildProps = (overrides: Partial<ShopSalesChartProps> = {}): ShopSalesChartProps => ({
    dailySales: [],
    periodTotal: 0,
    range: ShopSalesRange.SevenDays,
    setRange: vi.fn(),
    canChangeRange: true,
    isLoading: true,
    error: null,
    ...overrides,
});

describe("ShopSalesChart — selector de rango", () => {
    it("admin (canChangeRange=true): el selector de rango está habilitado", () => {
        renderWithTheme(<ShopSalesChart {...buildProps({ canChangeRange: true })} />);

        expect(screen.getByRole("combobox")).not.toHaveAttribute("aria-disabled", "true");
    });

    it("seller (canChangeRange=false): el selector de rango aparece disabled con tooltip", async () => {
        renderWithTheme(<ShopSalesChart {...buildProps({ canChangeRange: false })} />);

        const select = screen.getByRole("combobox");
        expect(select).toHaveAttribute("aria-disabled", "true");

        fireEvent.mouseOver(select);
        expect(await screen.findByText("Solo disponible para el administrador")).toBeInTheDocument();
    });
});
