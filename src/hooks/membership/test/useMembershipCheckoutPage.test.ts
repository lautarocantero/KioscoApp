import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSelector } from "react-redux";
import { KioscoPlanEnum, MembershipPaymentMethodEnum } from "@typings/membership/membershipEnums";
import type { MembershipPlanWithFeatures } from "@typings/membership/membershipTypes";
import { useMembershipCheckoutPage } from "../useMembershipCheckoutPage";
import { useMembershipCheckoutPlan } from "../useMembershipCheckoutPlan";
import { useMembershipCheckout } from "../useMembershipCheckout";

vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return { ...actual, useSelector: vi.fn() };
});

vi.mock("../useMembershipCheckoutPlan", () => ({
    useMembershipCheckoutPlan: vi.fn(),
}));

vi.mock("../useMembershipCheckout", () => ({
    useMembershipCheckout: vi.fn(),
}));

const mockedUseSelector = vi.mocked(useSelector);
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
        mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) =>
            selectorFn({ auth: { email: "user@stocko.com" } })
        );
    });

    it("pay() dispara startCheckoutRedirect con el id del plan resuelto", () => {
        const startCheckoutRedirect = vi.fn();
        mockedUseMembershipCheckoutPlan.mockReturnValue({ plan: KioscoPlanEnum.Deluxe, planDefinition: buildPlan(), loading: false, error: null });
        mockedUseMembershipCheckout.mockReturnValue({ isSubmitting: false, error: null, startCheckoutRedirect, startCheckoutWithCard: vi.fn() });

        const { result } = renderHook(() => useMembershipCheckoutPage("deluxe"));
        result.current.pay();

        expect(startCheckoutRedirect).toHaveBeenCalledWith(KioscoPlanEnum.Deluxe);
    });

    it("pay() no hace nada si todavía no hay planDefinition (loading o plan inválido)", () => {
        const startCheckoutRedirect = vi.fn();
        mockedUseMembershipCheckoutPlan.mockReturnValue({ plan: null, planDefinition: null, loading: false, error: null });
        mockedUseMembershipCheckout.mockReturnValue({ isSubmitting: false, error: null, startCheckoutRedirect, startCheckoutWithCard: vi.fn() });

        const { result } = renderHook(() => useMembershipCheckoutPage("not-a-plan"));
        result.current.pay();

        expect(startCheckoutRedirect).not.toHaveBeenCalled();
    });

    it("expone isSubmitting/checkoutError del hook de checkout", () => {
        mockedUseMembershipCheckoutPlan.mockReturnValue({ plan: KioscoPlanEnum.Standard, planDefinition: buildPlan(), loading: false, error: null });
        mockedUseMembershipCheckout.mockReturnValue({ isSubmitting: true, error: "No se pudo iniciar el pago", startCheckoutRedirect: vi.fn(), startCheckoutWithCard: vi.fn() });

        const { result } = renderHook(() => useMembershipCheckoutPage("standard"));

        expect(result.current.isSubmitting).toBe(true);
        expect(result.current.checkoutError).toBe("No se pudo iniciar el pago");
    });

    it("selectPaymentMethod cambia el método de pago elegido (default: redirect)", () => {
        mockedUseMembershipCheckoutPlan.mockReturnValue({ plan: KioscoPlanEnum.Deluxe, planDefinition: buildPlan(), loading: false, error: null });
        mockedUseMembershipCheckout.mockReturnValue({ isSubmitting: false, error: null, startCheckoutRedirect: vi.fn(), startCheckoutWithCard: vi.fn() });

        const { result } = renderHook(() => useMembershipCheckoutPage("deluxe"));
        expect(result.current.paymentMethod).toBe(MembershipPaymentMethodEnum.Redirect);

        act(() => result.current.selectPaymentMethod(MembershipPaymentMethodEnum.Card));

        expect(result.current.paymentMethod).toBe(MembershipPaymentMethodEnum.Card);
    });

    it("payWithCardToken() dispara startCheckoutWithCard con el id del plan y el token", async () => {
        const startCheckoutWithCard = vi.fn().mockResolvedValue(undefined);
        mockedUseMembershipCheckoutPlan.mockReturnValue({ plan: KioscoPlanEnum.Deluxe, planDefinition: buildPlan(), loading: false, error: null });
        mockedUseMembershipCheckout.mockReturnValue({ isSubmitting: false, error: null, startCheckoutRedirect: vi.fn(), startCheckoutWithCard });

        const { result } = renderHook(() => useMembershipCheckoutPage("deluxe"));
        await act(async () => {
            await result.current.payWithCardToken({ token: "card-token-123" });
        });

        expect(startCheckoutWithCard).toHaveBeenCalledWith(KioscoPlanEnum.Deluxe, { token: "card-token-123" });
    });

    it("handleCardBrickError solo muestra un mensaje ante un error critical del Brick", () => {
        mockedUseMembershipCheckoutPlan.mockReturnValue({ plan: KioscoPlanEnum.Deluxe, planDefinition: buildPlan(), loading: false, error: null });
        mockedUseMembershipCheckout.mockReturnValue({ isSubmitting: false, error: null, startCheckoutRedirect: vi.fn(), startCheckoutWithCard: vi.fn() });

        const { result } = renderHook(() => useMembershipCheckoutPage("deluxe"));

        act(() => result.current.handleCardBrickError({ type: "non_critical" }));
        expect(result.current.checkoutError).toBeNull();

        act(() => result.current.handleCardBrickError({ type: "critical" }));
        expect(result.current.checkoutError).toBeTruthy();
    });

    it("expone el email de la cuenta autenticada para prellenar el Brick", () => {
        mockedUseMembershipCheckoutPlan.mockReturnValue({ plan: KioscoPlanEnum.Deluxe, planDefinition: buildPlan(), loading: false, error: null });
        mockedUseMembershipCheckout.mockReturnValue({ isSubmitting: false, error: null, startCheckoutRedirect: vi.fn(), startCheckoutWithCard: vi.fn() });

        const { result } = renderHook(() => useMembershipCheckoutPage("deluxe"));

        expect(result.current.payerEmail).toBe("user@stocko.com");
    });
});
