import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ShopStadisticsPage from "../ShopStadisticsPage";
import { useShopMonthlyReportDetail } from "../../../hooks/stadistics/useShopMonthlyReportDetail";
import { useShopMonthlyReportPdf } from "../../../hooks/stadistics/useShopMonthlyReportPdf";
import { useActiveKiosco } from "../../../hooks/kiosco/useActiveKiosco";
import { useIsActiveKioscoAdmin } from "../../../hooks/kiosco/useIsActiveKioscoAdmin";
import type { MonthlyReportDetail } from "@typings/stadistics/stadisticsTypes";
import { renderWithTheme } from "../../shared/test/utils/setupTests";

vi.mock("../../../hooks/stadistics/useShopMonthlyReportDetail", () => ({
    useShopMonthlyReportDetail: vi.fn(),
}));
vi.mock("../../../hooks/stadistics/useShopMonthlyReportPdf", () => ({
    useShopMonthlyReportPdf: vi.fn(),
}));
vi.mock("../../../hooks/kiosco/useActiveKiosco", () => ({
    useActiveKiosco: vi.fn(),
}));
vi.mock("../../../hooks/kiosco/useIsActiveKioscoAdmin", () => ({
    useIsActiveKioscoAdmin: vi.fn(),
}));

const mockedUseShopMonthlyReportDetail = vi.mocked(useShopMonthlyReportDetail);
const mockedUseShopMonthlyReportPdf = vi.mocked(useShopMonthlyReportPdf);
const mockedUseActiveKiosco = vi.mocked(useActiveKiosco);
const mockedUseIsActiveKioscoAdmin = vi.mocked(useIsActiveKioscoAdmin);

const buildReport = (overrides: Partial<MonthlyReportDetail> = {}): MonthlyReportDetail => ({
    month: "2026-08-01T00:00:00.000Z",
    comparisonMonth: "2026-07-01T00:00:00.000Z",
    meta: { availableMonths: ["2026-08", "2026-07"], canCompare: true, daysInMonth: 31, generatedAt: "2026-09-01T09:12:00.000Z" },
    summary: { totalSales: 3214, totalRevenue: 4832000, averageTicket: 1503, ticketsPerDay: 103.7, previous: { totalSales: 2987, totalRevenue: 4216900, averageTicket: 1412 } },
    dailySales: [],
    dailySalesSummary: { avgPerDay: 155871, closedDays: 0, bestDay: null, worstDay: null, bestWeek: null },
    paymentMethods: [],
    sellers: [],
    sellersNote: null,
    hourlyBuckets: [],
    hourlySummary: { peakLabel: null, lowLabel: null },
    stockAlerts: { outOfStockCount: 0, outOfStockSoldInComparisonCount: 0, estimatedLostRevenue: 0, deadStockCount: 0, deadStockValue: 0, oldestDeadStock: null },
    currentAccount: { debtorsCount: 0, totalDebt: 0, collectedThisMonth: 0, newDebtThisMonth: 0, paymentsCount: 0 },
    ...overrides,
});

const renderPage = () => renderWithTheme(<MemoryRouter><ShopStadisticsPage /></MemoryRouter>);

describe("ShopStadisticsPage", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockedUseActiveKiosco.mockReturnValue({ activeKiosco: { _id: "k1", name: "Kiosco Calle Fleming" } as never, isAdmin: true });
        mockedUseIsActiveKioscoAdmin.mockReturnValue(true);
        mockedUseShopMonthlyReportPdf.mockReturnValue({ isDownloadDisabled: false, handleDownload: vi.fn() });
    });

    it("muestra el encabezado con el kiosco activo mientras carga", () => {
        mockedUseShopMonthlyReportDetail.mockReturnValue({ report: null, isLoading: true, error: null });

        renderPage();

        expect(screen.getByText(/Kiosco Calle Fleming/)).toBeInTheDocument();
        expect(screen.queryByText("Ventas del mes")).not.toBeInTheDocument();
    });

    it("muestra los KPIs una vez cargado el reporte", () => {
        mockedUseShopMonthlyReportDetail.mockReturnValue({ report: buildReport(), isLoading: false, error: null });

        renderPage();

        expect(screen.getByText("Ventas del mes")).toBeInTheDocument();
        expect(screen.getByText("3.214")).toBeInTheDocument();
    });

    it("muestra el mensaje de error si el reporte falla", () => {
        mockedUseShopMonthlyReportDetail.mockReturnValue({ report: null, isLoading: false, error: "No se pudo obtener el detalle del reporte del mes" });

        renderPage();

        expect(screen.getAllByRole("alert")[0]).toHaveTextContent("No se pudo obtener el detalle del reporte del mes");
    });

    it("vendedor (no admin): la sección de vendedores queda oculta detrás del aviso de permisos", () => {
        mockedUseIsActiveKioscoAdmin.mockReturnValue(false);
        mockedUseShopMonthlyReportDetail.mockReturnValue({ report: buildReport(), isLoading: false, error: null });

        renderPage();

        expect(screen.getByText("Solo disponible para el administrador")).toBeInTheDocument();
    });
});
