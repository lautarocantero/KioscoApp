import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import type { MonthlyReportDetail } from "@typings/stadistics/stadisticsTypes";
import { useShopMonthlyReportPdf } from "../useShopMonthlyReportPdf";
import { createMonthlyReportPdf } from "../../../modules/stadistics/helpers/createMonthlyReportPdf";

vi.mock("../../../modules/stadistics/helpers/createMonthlyReportPdf");

const mockedCreateMonthlyReportPdf = vi.mocked(createMonthlyReportPdf);

const buildReport = (): MonthlyReportDetail => ({
    month: "2026-08-01T00:00:00.000Z",
    comparisonMonth: null,
    meta: { availableMonths: ["2026-08"], canCompare: false, daysInMonth: 31, generatedAt: "2026-09-01T09:12:00.000Z" },
    summary: { totalSales: 12, totalRevenue: 45000, averageTicket: 3750, ticketsPerDay: 0.4, previous: null },
    dailySales: [],
    dailySalesSummary: { avgPerDay: 0, closedDays: 0, bestDay: null, worstDay: null, bestWeek: null },
    paymentMethods: [],
    sellers: [],
    sellersNote: null,
    hourlyBuckets: [],
    hourlySummary: { peakLabel: null, lowLabel: null },
    stockAlerts: { outOfStockCount: 0, outOfStockSoldInComparisonCount: 0, estimatedLostRevenue: 0, deadStockCount: 0, deadStockValue: 0, oldestDeadStock: null },
    currentAccount: { debtorsCount: 0, totalDebt: 0, collectedThisMonth: 0, newDebtThisMonth: 0, paymentsCount: 0 },
});

describe("useShopMonthlyReportPdf", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("deshabilita la descarga mientras carga o si no hay reporte", () => {
        const { result, rerender } = renderHook(
            ({ report, isLoading }) => useShopMonthlyReportPdf(report, "Kiosco Calle Fleming", isLoading),
            { initialProps: { report: null as MonthlyReportDetail | null, isLoading: true } },
        );
        expect(result.current.isDownloadDisabled).toBe(true);

        rerender({ report: buildReport(), isLoading: false });
        expect(result.current.isDownloadDisabled).toBe(false);
    });

    it("handleDownload genera el PDF con el reporte y el nombre del kiosco actuales", () => {
        const report = buildReport();
        const { result } = renderHook(() => useShopMonthlyReportPdf(report, "Kiosco Calle Fleming", false));

        act(() => {
            result.current.handleDownload();
        });

        expect(mockedCreateMonthlyReportPdf).toHaveBeenCalledWith(report, "Kiosco Calle Fleming");
    });

    it("handleDownload no hace nada si todavía no hay reporte", () => {
        const { result } = renderHook(() => useShopMonthlyReportPdf(null, "Kiosco Calle Fleming", false));

        act(() => {
            result.current.handleDownload();
        });

        expect(mockedCreateMonthlyReportPdf).not.toHaveBeenCalled();
    });

    it("handleDownload no rompe si la generación del PDF falla", async () => {
        mockedCreateMonthlyReportPdf.mockImplementation(() => {
            throw new Error("boom");
        });
        const { result } = renderHook(() => useShopMonthlyReportPdf(buildReport(), "Kiosco Calle Fleming", false));

        await act(async () => {
            expect(() => result.current.handleDownload()).not.toThrow();
        });
    });
});
