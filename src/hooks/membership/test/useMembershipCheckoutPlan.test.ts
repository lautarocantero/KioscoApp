import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { KioscoPlanEnum } from "@typings/membership/membershipEnums";
import type { MembershipPlanWithFeatures } from "@typings/membership/membershipTypes";
import { useMembershipCheckoutPlan } from "../useMembershipCheckoutPlan";
import { useMembershipPlans } from "../useMembershipPlans";

vi.mock("../useMembershipPlans", () => ({
    useMembershipPlans: vi.fn(),
}));

const mockedUseMembershipPlans = vi.mocked(useMembershipPlans);

const buildPlan = (id: KioscoPlanEnum): MembershipPlanWithFeatures => ({
    id,
    name: id,
    price: 9999,
    currency_id: "ARS",
    featureKeys: [],
    isPopular: false,
});

describe("useMembershipCheckoutPlan", () => {
    it("plan es null si el param de la URL no es un tier válido", () => {
        mockedUseMembershipPlans.mockReturnValue({ plans: [], loading: false, error: null });

        const { result } = renderHook(() => useMembershipCheckoutPlan("not-a-plan"));

        expect(result.current.plan).toBeNull();
        expect(result.current.planDefinition).toBeNull();
    });

    it("resuelve planDefinition cuando el tier existe en la lista de planes", () => {
        mockedUseMembershipPlans.mockReturnValue({
            plans: [buildPlan(KioscoPlanEnum.Standard), buildPlan(KioscoPlanEnum.Deluxe)],
            loading: false,
            error: null,
        });

        const { result } = renderHook(() => useMembershipCheckoutPlan("deluxe"));

        expect(result.current.plan).toBe(KioscoPlanEnum.Deluxe);
        expect(result.current.planDefinition?.id).toBe(KioscoPlanEnum.Deluxe);
    });

    it("planDefinition es null mientras los planes todavía están cargando", () => {
        mockedUseMembershipPlans.mockReturnValue({ plans: [], loading: true, error: null });

        const { result } = renderHook(() => useMembershipCheckoutPlan("standard"));

        expect(result.current.plan).toBe(KioscoPlanEnum.Standard);
        expect(result.current.planDefinition).toBeNull();
        expect(result.current.loading).toBe(true);
    });
});
