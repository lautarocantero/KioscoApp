import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useShopMonthlyReportDetail } from "../useShopMonthlyReportDetail";
import { getMonthlySalesReportDetailRequest } from "../../../modules/stadistics/api/stadisticsApi";
import { ReportCompareWith } from "@typings/stadistics/stadisticsEnums";
import type { MonthlyReportDetail } from "@typings/stadistics/stadisticsTypes";

vi.mock("../../../modules/stadistics/api/stadisticsApi", () => ({
    getMonthlySalesReportDetailRequest: vi.fn(),
}));

const mockedRequest = vi.mocked(getMonthlySalesReportDetailRequest);

const buildReport = (): MonthlyReportDetail => ({
    month: "2026-08-01T00:00:00.000Z",
    comparisonMonth: "2026-07-01T00:00:00.000Z",
    meta: { availableMonths: ["2026-08"], canCompare: true, daysInMonth: 31, generatedAt: "2026-09-01T09:12:00.000Z" },
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

describe("useShopMonthlyReportDetail", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("trae el detalle del mes y la comparación pedidos al montar", async () => {
        mockedRequest.mockResolvedValue(buildReport());

        const { result } = renderHook(() => useShopMonthlyReportDetail("2026-08", ReportCompareWith.PreviousMonth));

        await waitFor(() => expect(result.current.isLoading).toBe(false));
        expect(mockedRequest).toHaveBeenCalledWith("2026-08", ReportCompareWith.PreviousMonth);
        expect(result.current.report?.summary.totalSales).toBe(12);
        expect(result.current.error).toBeNull();
    });

    it("refetchea cuando cambia el mes o la comparación", async () => {
        mockedRequest.mockResolvedValue(buildReport());

        const { rerender } = renderHook(
            ({ month, compareWith }) => useShopMonthlyReportDetail(month, compareWith),
            { initialProps: { month: "2026-08", compareWith: ReportCompareWith.PreviousMonth } },
        );

        await waitFor(() => expect(mockedRequest).toHaveBeenCalledTimes(1));

        rerender({ month: "2026-07", compareWith: ReportCompareWith.None });

        await waitFor(() => expect(mockedRequest).toHaveBeenCalledTimes(2));
        expect(mockedRequest).toHaveBeenLastCalledWith("2026-07", ReportCompareWith.None);
    });

    it("expone un mensaje de error si la API falla", async () => {
        mockedRequest.mockRejectedValue(new Error("Request failed with status code 500"));

        const { result } = renderHook(() => useShopMonthlyReportDetail("2026-08", ReportCompareWith.PreviousMonth));

        await waitFor(() => expect(result.current.isLoading).toBe(false));
        expect(result.current.error).toBeTruthy();
        expect(result.current.report).toBeNull();
    });
});
