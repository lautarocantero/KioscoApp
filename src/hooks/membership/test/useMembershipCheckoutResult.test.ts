import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { KioscoPlanEnum, KioscoPlanStatusEnum } from "@typings/membership/membershipEnums";
import { useMembershipCheckoutResult } from "../useMembershipCheckoutResult";
import { useMembershipStatus } from "../useMembershipStatus";

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return { ...actual, useNavigate: vi.fn() };
});

vi.mock("../useMembershipStatus", () => ({
    useMembershipStatus: vi.fn(),
}));

const mockedUseNavigate = vi.mocked(useNavigate);
const mockedUseMembershipStatus = vi.mocked(useMembershipStatus);

describe("useMembershipCheckoutResult", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockedUseNavigate.mockReturnValue(vi.fn());
    });

    it("isActive es true y planName está traducido cuando el plan quedó activo", () => {
        mockedUseMembershipStatus.mockReturnValue({
            status: { plan: KioscoPlanEnum.SuperStocko, plan_status: KioscoPlanStatusEnum.Active, next_payment_date: null },
            loading: false,
            error: null,
            refetch: vi.fn(),
        });

        const { result } = renderHook(() => useMembershipCheckoutResult());

        expect(result.current.isActive).toBe(true);
        expect(result.current.isCancelled).toBe(false);
        expect(result.current.planName).toBe("Super Stocko");
    });

    it("isCancelled es true cuando la suscripción quedó cancelada", () => {
        mockedUseMembershipStatus.mockReturnValue({
            status: { plan: KioscoPlanEnum.Stocko, plan_status: KioscoPlanStatusEnum.Cancelled, next_payment_date: null },
            loading: false,
            error: null,
            refetch: vi.fn(),
        });

        const { result } = renderHook(() => useMembershipCheckoutResult());

        expect(result.current.isCancelled).toBe(true);
        expect(result.current.isActive).toBe(false);
    });

    it("ni isActive ni isCancelled mientras el pago está pendiente (esperando webhook)", () => {
        mockedUseMembershipStatus.mockReturnValue({
            status: { plan: KioscoPlanEnum.Stocko, plan_status: KioscoPlanStatusEnum.PendingPayment, next_payment_date: null },
            loading: false,
            error: null,
            refetch: vi.fn(),
        });

        const { result } = renderHook(() => useMembershipCheckoutResult());

        expect(result.current.isActive).toBe(false);
        expect(result.current.isCancelled).toBe(false);
    });

    it("planName es un string vacío mientras no hay status todavía", () => {
        mockedUseMembershipStatus.mockReturnValue({ status: null, loading: true, error: null, refetch: vi.fn() });

        const { result } = renderHook(() => useMembershipCheckoutResult());

        expect(result.current.planName).toBe("");
    });

    it("goToShop navega a /shop", () => {
        const navigate = vi.fn();
        mockedUseNavigate.mockReturnValue(navigate);
        mockedUseMembershipStatus.mockReturnValue({ status: null, loading: false, error: null, refetch: vi.fn() });

        const { result } = renderHook(() => useMembershipCheckoutResult());
        result.current.goToShop();

        expect(navigate).toHaveBeenCalledWith("/shop");
    });
});
