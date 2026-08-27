import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import type { MonthlyReportSummary } from "@typings/stadistics/stadisticsTypes";
import { ReportCompareWith } from "@typings/stadistics/stadisticsEnums";
import ShopMonthlyReportKpiRow from "../../components/ShopMonthlyReportKpiRow";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";

const buildSummary = (overrides: Partial<MonthlyReportSummary> = {}): MonthlyReportSummary => ({
    totalSales: 3214,
    totalRevenue: 4832000,
    averageTicket: 1503,
    ticketsPerDay: 103.7,
    previous: { totalSales: 2987, totalRevenue: 4216900, averageTicket: 1412 },
    ...overrides,
});

describe("ShopMonthlyReportKpiRow", () => {
    it("muestra skeletons mientras carga", () => {
        renderWithTheme(<ShopMonthlyReportKpiRow summary={null} compareWith={ReportCompareWith.PreviousMonth} comparisonMonthLabel={null} isLoading error={null} />);
        expect(screen.queryByText("Ventas del mes")).not.toBeInTheDocument();
    });

    it("muestra el mensaje de error si falla", () => {
        renderWithTheme(<ShopMonthlyReportKpiRow summary={null} compareWith={ReportCompareWith.PreviousMonth} comparisonMonthLabel={null} isLoading={false} error="boom" />);
        expect(screen.getByRole("alert")).toHaveTextContent("boom");
    });

    it("con comparación: muestra la variación y el monto del mes anterior", () => {
        renderWithTheme(
            <ShopMonthlyReportKpiRow
                summary={buildSummary()}
                compareWith={ReportCompareWith.PreviousMonth}
                comparisonMonthLabel="julio de 2026"
                isLoading={false}
                error={null}
            />
        );

        expect(screen.getByText("▲ 14,6%")).toBeInTheDocument();
        expect(screen.getAllByText(/julio de 2026/).length).toBeGreaterThan(0);
        expect(screen.getByText("3.214")).toBeInTheDocument();
    });

    it("sin comparación: no muestra chips de variación", () => {
        renderWithTheme(
            <ShopMonthlyReportKpiRow
                summary={buildSummary({ previous: null })}
                compareWith={ReportCompareWith.None}
                comparisonMonthLabel={null}
                isLoading={false}
                error={null}
            />
        );

        expect(screen.queryByText(/▲/)).not.toBeInTheDocument();
        expect(screen.queryByText(/▼/)).not.toBeInTheDocument();
    });
});
