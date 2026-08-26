import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useShopMonthlyReport } from "../useShopMonthlyReport";
import { getMonthlySalesReportRequest } from "../../../modules/stadistics/api/stadisticsApi";

vi.mock("../../../modules/stadistics/api/stadisticsApi", () => ({
    getMonthlySalesReportRequest: vi.fn(),
}));

const mockedGetMonthlySalesReportRequest = vi.mocked(getMonthlySalesReportRequest);

describe("useShopMonthlyReport", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("trae el reporte del mes en curso al montar", async () => {
        mockedGetMonthlySalesReportRequest.mockResolvedValue({
            month: "2026-03-01T00:00:00.000Z",
            totalSales: 12,
            totalRevenue: 45000,
            averageTicket: 3750,
        });

        const { result } = renderHook(() => useShopMonthlyReport());

        await waitFor(() => expect(result.current.isLoading).toBe(false));
        expect(result.current.report?.totalSales).toBe(12);
        expect(result.current.error).toBeNull();
    });

    it("expone un mensaje de error si la API falla", async () => {
        mockedGetMonthlySalesReportRequest.mockRejectedValue(new Error("Request failed with status code 500"));

        const { result } = renderHook(() => useShopMonthlyReport());

        await waitFor(() => expect(result.current.isLoading).toBe(false));
        expect(result.current.error).toBeTruthy();
        expect(result.current.report).toBeNull();
    });
});
