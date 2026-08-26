import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ShopStadisticsPage from "../ShopStadisticsPage";
import { useShopMonthlyReport } from "../../../hooks/stadistics/useShopMonthlyReport";
import { renderWithTheme } from "../../shared/test/utils/setupTests";

vi.mock("../../../hooks/stadistics/useShopMonthlyReport", () => ({
    useShopMonthlyReport: vi.fn(),
}));

const mockedUseShopMonthlyReport = vi.mocked(useShopMonthlyReport);

describe("ShopStadisticsPage", () => {
    it("muestra los skeletons mientras carga", () => {
        mockedUseShopMonthlyReport.mockReturnValue({ report: null, isLoading: true, error: null });

        renderWithTheme(
            <MemoryRouter>
                <ShopStadisticsPage />
            </MemoryRouter>
        );

        expect(screen.getByText("Reporte mensual")).toBeInTheDocument();
        expect(screen.queryByText("Ventas del mes")).not.toBeInTheDocument();
    });

    it("muestra los totales del reporte una vez cargado", () => {
        mockedUseShopMonthlyReport.mockReturnValue({
            report: { month: "2026-03-01T00:00:00.000Z", totalSales: 12, totalRevenue: 45000, averageTicket: 3750 },
            isLoading: false,
            error: null,
        });

        renderWithTheme(
            <MemoryRouter>
                <ShopStadisticsPage />
            </MemoryRouter>
        );

        expect(screen.getByText("Ventas del mes")).toBeInTheDocument();
        expect(screen.getByText("12")).toBeInTheDocument();
    });

    it("muestra el mensaje de error si el reporte falla", () => {
        mockedUseShopMonthlyReport.mockReturnValue({ report: null, isLoading: false, error: "No se pudo obtener el reporte del mes" });

        renderWithTheme(
            <MemoryRouter>
                <ShopStadisticsPage />
            </MemoryRouter>
        );

        expect(screen.getByRole("alert")).toHaveTextContent("No se pudo obtener el reporte del mes");
    });
});
