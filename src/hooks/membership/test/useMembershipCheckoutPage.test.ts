import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { KioscoPlanEnum } from "@typings/membership/membershipEnums";
import type { MembershipPlanWithFeatures } from "@typings/membership/membershipTypes";
import { useMembershipCheckoutPage } from "../useMembershipCheckoutPage";
import { useMembershipCheckoutPlan } from "../useMembershipCheckoutPlan";
import { useMembershipCheckout } from "../useMembershipCheckout";

vi.mock("../useMembershipCheckoutPlan", () => ({
    useMembershipCheckoutPlan: vi.fn(),
}));

vi.mock("../useMembershipCheckout", () => ({
    useMembershipCheckout: vi.fn(),
}));

const mockedUseMembershipCheckoutPlan = vi.mocked(useMembershipCheckoutPlan);
const mockedUseMembershipCheckout = vi.mocked(useMembershipCheckout);

const buildPlan = (): MembershipPlanWithFeatures => ({
    id: KioscoPlanEnum.Deluxe,
    name: "Stocko Deluxe",
    price: 15000,
    currency_id: "ARS",
    featureKeys: [],
    isPopular: true,
});

describe("useMembershipCheckoutPage", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("pay() dispara startCheckout con el id del plan resuelto", () => {
        const startCheckout = vi.fn();
        mockedUseMembershipCheckoutPlan.mockReturnValue({ plan: KioscoPlanEnum.Deluxe, planDefinition: buildPlan(), loading: false, error: null });
        mockedUseMembershipCheckout.mockReturnValue({ isSubmitting: false, error: null, startCheckout });

        const { result } = renderHook(() => useMembershipCheckoutPage("deluxe"));
        result.current.pay();

        expect(startCheckout).toHaveBeenCalledWith(KioscoPlanEnum.Deluxe);
    });

    it("pay() no hace nada si todavía no hay planDefinition (loading o plan inválido)", () => {
        const startCheckout = vi.fn();
        mockedUseMembershipCheckoutPlan.mockReturnValue({ plan: null, planDefinition: null, loading: false, error: null });
        mockedUseMembershipCheckout.mockReturnValue({ isSubmitting: false, error: null, startCheckout });

        const { result } = renderHook(() => useMembershipCheckoutPage("not-a-plan"));
        result.current.pay();

        expect(startCheckout).not.toHaveBeenCalled();
    });

    it("expone isSubmitting/checkoutError del hook de checkout", () => {
        mockedUseMembershipCheckoutPlan.mockReturnValue({ plan: KioscoPlanEnum.Standard, planDefinition: buildPlan(), loading: false, error: null });
        mockedUseMembershipCheckout.mockReturnValue({ isSubmitting: true, error: "No se pudo iniciar el pago", startCheckout: vi.fn() });

        const { result } = renderHook(() => useMembershipCheckoutPage("standard"));

        expect(result.current.isSubmitting).toBe(true);
        expect(result.current.checkoutError).toBe("No se pudo iniciar el pago");
    });
});
