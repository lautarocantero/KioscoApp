import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { SellsPeriodEnum } from "@typings/sells/enums";
import { PaymentMethod, SellStatusEnum } from "@typings/sells/sellsEnum";
import { KioscoPlanEnum, KioscoPlanStatusEnum } from "@typings/membership/membershipEnums";
import type { SellTicketType } from "@typings/sells/sellTypes";
import { useSellsContextBand } from "../useSellsContextBand";
import { useMembershipStatus } from "../../membership/useMembershipStatus";

vi.mock("../../membership/useMembershipStatus", () => ({ useMembershipStatus: vi.fn() }));

const mockedUseMembershipStatus = vi.mocked(useMembershipStatus);

const buildSell = (overrides: Partial<SellTicketType>): SellTicketType => ({
    _id: "1",
    currency: "ars",
    iva: 0,
    modification_date: null,
    payment_method: PaymentMethod.Cash,
    products: [],
    purchase_date: new Date().toISOString(),
    seller_id: "seller-1",
    seller_name: "Lucas",
    sub_total: 100,
    total_amount: 100,
    status: SellStatusEnum.Completada,
    amount_paid: null,
    debtor_name: null,
    settles_sell_id: null,
    settled_by_sell_id: null,
    ...overrides,
} as SellTicketType);

const mockPlan = (plan: KioscoPlanEnum) =>
    mockedUseMembershipStatus.mockReturnValue({
        status: { plan, plan_status: KioscoPlanStatusEnum.Active, next_payment_date: null },
        loading: false,
        error: null,
        refetch: vi.fn(),
    });

describe("useSellsContextBand", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockPlan(KioscoPlanEnum.Deluxe);
    });

    it("arranca en 7 días y agrega las ventas del período elegido", () => {
        const today = new Date().toISOString();
        const sells = [buildSell({ _id: "1", purchase_date: today, total_amount: 500 })];

        const { result } = renderHook(() => useSellsContextBand(sells, true));

        expect(result.current.period).toBe(SellsPeriodEnum.SevenDays);
        expect(result.current.kpis.sales.value).toBe(500);
        expect(result.current.hasSellsInPeriod).toBe(true);
        expect(result.current.sparkline).toHaveLength(14);
    });

    it("admin + Deluxe: todas las opciones de período disponibles", () => {
        const { result } = renderHook(() => useSellsContextBand([], true));

        Object.values(SellsPeriodEnum).forEach((period) => {
            expect(result.current.periodAvailability[period].canSelect).toBe(true);
        });
    });

    it("seller: todas las opciones bloqueadas por rol y setPeriod es no-op", () => {
        const { result } = renderHook(() => useSellsContextBand([], false));

        Object.values(SellsPeriodEnum).forEach((period) => {
            expect(result.current.periodAvailability[period]).toEqual({ canSelect: false, disabledReason: "admin" });
        });

        act(() => result.current.setPeriod(SellsPeriodEnum.ThirtyDays));
        expect(result.current.period).toBe(SellsPeriodEnum.SevenDays);
    });

    it("admin + Standard a principios de mes: bloquea 30 días por plan, Este mes sigue disponible", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date(2026, 7, 3));
        mockPlan(KioscoPlanEnum.Standard);

        const { result } = renderHook(() => useSellsContextBand([], true));

        expect(result.current.periodAvailability[SellsPeriodEnum.ThirtyDays].disabledReason).toBe("plan");
        expect(result.current.periodAvailability[SellsPeriodEnum.ThisMonth].canSelect).toBe(true);

        vi.useRealTimers();
    });

    it("la alerta de parciales se calcula sobre TODO el historial, no sólo el período elegido", () => {
        const oldDate = new Date();
        oldDate.setDate(oldDate.getDate() - 40);

        const sells = [
            buildSell({
                _id: "old-partial",
                purchase_date: oldDate.toISOString(),
                status: SellStatusEnum.Parcial,
                total_amount: 1000,
                amount_paid: 400,
                settled_by_sell_id: null,
            }),
        ];

        const { result } = renderHook(() => useSellsContextBand(sells, true));

        expect(result.current.hasSellsInPeriod).toBe(false);
        expect(result.current.partialsAlert.count).toBe(1);
        expect(result.current.partialsAlert.totalAmount).toBe(600);
    });
});
