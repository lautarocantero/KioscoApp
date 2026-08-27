import { describe, it, expect } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import type { StockAlerts } from "@typings/stadistics/stadisticsTypes";
import ShopMonthlyReportStockAlerts from "../../components/ShopMonthlyReportStockAlerts";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";

const buildStockAlerts = (overrides: Partial<StockAlerts> = {}): StockAlerts => ({
    outOfStockCount: 118,
    outOfStockSoldInComparisonCount: 46,
    estimatedLostRevenue: 214000,
    deadStockCount: 47,
    deadStockValue: 186400,
    oldestDeadStock: { name: "Lucky Origen convertible", days: 92 },
    ...overrides,
});

describe("ShopMonthlyReportStockAlerts", () => {
    it("muestra los quiebres y el stock muerto del mes", () => {
        renderWithTheme(
            <MemoryRouter>
                <ShopMonthlyReportStockAlerts stockAlerts={buildStockAlerts()} isLoading={false} error={null} />
            </MemoryRouter>
        );

        expect(screen.getByText("118")).toBeInTheDocument();
        expect(screen.getByText("47")).toBeInTheDocument();
        expect(screen.getByText(/Lucky Origen convertible, 92 días/)).toBeInTheDocument();
    });

    it("sin stock muerto: no menciona ningún producto viejo", () => {
        renderWithTheme(
            <MemoryRouter>
                <ShopMonthlyReportStockAlerts stockAlerts={buildStockAlerts({ deadStockCount: 0, deadStockValue: 0, oldestDeadStock: null })} isLoading={false} error={null} />
            </MemoryRouter>
        );

        expect(screen.queryByText(/El más viejo/)).not.toBeInTheDocument();
    });

    it("el botón de reposición no rompe al hacer click", () => {
        renderWithTheme(
            <MemoryRouter>
                <ShopMonthlyReportStockAlerts stockAlerts={buildStockAlerts()} isLoading={false} error={null} />
            </MemoryRouter>
        );

        expect(() => fireEvent.click(screen.getByRole("button", { name: /Armar boleta de reposición/i }))).not.toThrow();
    });
});
