import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { KioscoPlanEnum, KioscoPlanStatusEnum } from "@typings/membership/membershipEnums";
import type { MembershipPlanWithFeatures } from "@typings/membership/membershipTypes";
import { useMembershipPlansPage } from "../useMembershipPlansPage";
import { useMembershipStatus } from "../useMembershipStatus";
import { useMembershipPlans } from "../useMembershipPlans";

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return { ...actual, useNavigate: vi.fn() };
});

vi.mock("../useMembershipStatus", () => ({
    useMembershipStatus: vi.fn(),
}));

vi.mock("../useMembershipPlans", () => ({
    useMembershipPlans: vi.fn(),
}));

const mockedUseNavigate = vi.mocked(useNavigate);
const mockedUseMembershipStatus = vi.mocked(useMembershipStatus);
const mockedUseMembershipPlans = vi.mocked(useMembershipPlans);

const buildPlan = (id: KioscoPlanEnum): MembershipPlanWithFeatures => ({
    id,
    name: id,
    price: 9999,
    currency_id: "ARS",
    featureKeys: [],
    isPopular: false,
});

describe("useMembershipPlansPage", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockedUseMembershipPlans.mockReturnValue({
            plans: [buildPlan(KioscoPlanEnum.Standard), buildPlan(KioscoPlanEnum.Deluxe)],
            loading: false,
            error: null,
        });
    });

    it("selectPlan navega al checkout del plan elegido", () => {
        const navigate = vi.fn();
        mockedUseNavigate.mockReturnValue(navigate);
        mockedUseMembershipStatus.mockReturnValue({
            status: { plan: KioscoPlanEnum.Standard, plan_status: KioscoPlanStatusEnum.Active, next_payment_date: null },
            loading: false,
            error: null,
            refetch: vi.fn(),
        });

        const { result } = renderHook(() => useMembershipPlansPage());
        result.current.selectPlan(KioscoPlanEnum.Deluxe);

        expect(navigate).toHaveBeenCalledWith("/membership/checkout/deluxe");
    });

    it("isPlanCurrent es true solo para el plan activo del kiosco", () => {
        mockedUseNavigate.mockReturnValue(vi.fn());
        mockedUseMembershipStatus.mockReturnValue({
            status: { plan: KioscoPlanEnum.Deluxe, plan_status: KioscoPlanStatusEnum.Active, next_payment_date: null },
            loading: false,
            error: null,
            refetch: vi.fn(),
        });

        const { result } = renderHook(() => useMembershipPlansPage());

        expect(result.current.isPlanCurrent(KioscoPlanEnum.Deluxe)).toBe(true);
        expect(result.current.isPlanCurrent(KioscoPlanEnum.Standard)).toBe(false);
    });

    it("expone plans/status con sus loading y error tal como los devuelven los hooks base", () => {
        mockedUseNavigate.mockReturnValue(vi.fn());
        mockedUseMembershipStatus.mockReturnValue({ status: null, loading: true, error: null, refetch: vi.fn() });

        const { result } = renderHook(() => useMembershipPlansPage());

        expect(result.current.statusLoading).toBe(true);
        expect(result.current.plans).toHaveLength(2);
    });
});
