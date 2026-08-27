import { describe, it, expect, vi, beforeEach } from "vitest";
import type { MonthlyReportDetail } from "@typings/stadistics/stadisticsTypes";
import { formatCurrency } from "../../../cart/helpers/formatCurrency";

const autoTable = vi.fn();
const save = vi.fn();
const text = vi.fn();
const setFontSize = vi.fn();
const addPage = vi.fn();

vi.mock("jspdf", () => ({
    default: vi.fn().mockImplementation(() => ({
        setFontSize,
        text,
        autoTable,
        addPage,
        save,
    })),
}));

vi.mock("jspdf-autotable", () => ({
    applyPlugin: vi.fn(),
}));

const { createMonthlyReportPdf } = await import("../../helpers/createMonthlyReportPdf");

const buildReport = (overrides: Partial<MonthlyReportDetail> = {}): MonthlyReportDetail => ({
    month: "2026-08-01T00:00:00.000Z",
    comparisonMonth: "2026-07-01T00:00:00.000Z",
    meta: { availableMonths: ["2026-08"], canCompare: true, daysInMonth: 31, generatedAt: "2026-09-01T09:12:00.000Z" },
    summary: { totalSales: 3214, totalRevenue: 4832000, averageTicket: 1503, ticketsPerDay: 103.7, previous: null },
    dailySales: [],
    dailySalesSummary: { avgPerDay: 155871, closedDays: 0, bestDay: null, worstDay: null, bestWeek: null },
    paymentMethods: [{ method: "cash", amount: 2512640, percentage: 52 }],
    sellers: [{ sellerId: "1", sellerName: "Lautaro Cantero", amount: 2947500, ticketsCount: 1984, participationPct: 61, changePct: 11.2, isNew: false, maxTicketAmount: 1644 }],
    sellersNote: null,
    hourlyBuckets: [],
    hourlySummary: { peakLabel: null, lowLabel: null },
    stockAlerts: { outOfStockCount: 0, outOfStockSoldInComparisonCount: 0, estimatedLostRevenue: 0, deadStockCount: 0, deadStockValue: 0, oldestDeadStock: null },
    currentAccount: { debtorsCount: 0, totalDebt: 0, collectedThisMonth: 0, newDebtThisMonth: 0, paymentsCount: 0 },
    ...overrides,
});

describe("createMonthlyReportPdf", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("arma una tabla de KPIs, una de vendedores y una de medios de pago, cada una en su página", () => {
        createMonthlyReportPdf(buildReport(), "Kiosco Calle Fleming");

        expect(autoTable).toHaveBeenCalledTimes(3);
        expect(addPage).toHaveBeenCalledTimes(2);
        expect(autoTable).toHaveBeenNthCalledWith(2, expect.objectContaining({
            body: [["Lautaro Cantero", formatCurrency(2947500), "1984"]],
        }));
    });

    it("no rompe cuando no hay vendedores ni medios de pago cargados", () => {
        expect(() => createMonthlyReportPdf(buildReport({ sellers: [], paymentMethods: [] }), "Kiosco Calle Fleming")).not.toThrow();
    });

    it("descarga el PDF con un nombre de archivo que identifica el reporte mensual", () => {
        createMonthlyReportPdf(buildReport(), "Kiosco Calle Fleming");
        expect(save).toHaveBeenCalledWith(expect.stringMatching(/^reporte_mensual_.*\.pdf$/));
    });
});
