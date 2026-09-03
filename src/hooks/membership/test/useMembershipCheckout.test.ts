import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { KioscoPlanEnum, MembershipPaymentMethodEnum } from "@typings/membership/membershipEnums";
import { useMembershipCheckout } from "../useMembershipCheckout";
import { createMembershipCheckoutRequest } from "../../../modules/membership/api/membershipApi";

vi.mock("../../../modules/membership/api/membershipApi", () => ({
    createMembershipCheckoutRequest: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return { ...actual, useNavigate: vi.fn() };
});

const mockedCreateMembershipCheckoutRequest = vi.mocked(createMembershipCheckoutRequest);
const mockedUseNavigate = vi.mocked(useNavigate);

describe("useMembershipCheckout", () => {
    const originalLocation = window.location;
    const navigate = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        mockedUseNavigate.mockReturnValue(navigate);
        Object.defineProperty(window, "location", {
            configurable: true,
            value: { ...originalLocation, href: "" },
        });
    });

    afterEach(() => {
        Object.defineProperty(window, "location", { configurable: true, value: originalLocation });
    });

    describe("startCheckoutRedirect", () => {
        it("redirige a init_point cuando el checkout se crea correctamente", async () => {
            mockedCreateMembershipCheckoutRequest.mockResolvedValue({
                init_point: "https://www.mercadopago.com/checkout/123",
                preapproval_id: "preapproval-1",
            });

            const { result } = renderHook(() => useMembershipCheckout());

            await act(async () => {
                await result.current.startCheckoutRedirect(KioscoPlanEnum.Deluxe);
            });

            expect(mockedCreateMembershipCheckoutRequest).toHaveBeenCalledWith(KioscoPlanEnum.Deluxe, MembershipPaymentMethodEnum.Redirect);
            expect(window.location.href).toBe("https://www.mercadopago.com/checkout/123");
        });

        it("expone un error y deja de estar submitting si la API falla", async () => {
            mockedCreateMembershipCheckoutRequest.mockRejectedValue(new Error("This kiosco is already subscribed to this plan"));

            const { result } = renderHook(() => useMembershipCheckout());

            await act(async () => {
                await result.current.startCheckoutRedirect(KioscoPlanEnum.Standard);
            });

            await waitFor(() => expect(result.current.isSubmitting).toBe(false));
            expect(result.current.error).toBeTruthy();
        });

        it("isSubmitting es true mientras la request está en curso", async () => {
            let resolvePromise: (value: { init_point: string; preapproval_id: string }) => void = () => {};
            mockedCreateMembershipCheckoutRequest.mockReturnValue(
                new Promise((resolve) => { resolvePromise = resolve; })
            );

            const { result } = renderHook(() => useMembershipCheckout());

            act(() => {
                result.current.startCheckoutRedirect(KioscoPlanEnum.Standard);
            });

            await waitFor(() => expect(result.current.isSubmitting).toBe(true));

            await act(async () => {
                resolvePromise({ init_point: "https://www.mercadopago.com/checkout/1", preapproval_id: "p1" });
            });
        });
    });

    describe("startCheckoutWithCard", () => {
        it("crea la suscripción con el token del Brick y navega al result page", async () => {
            mockedCreateMembershipCheckoutRequest.mockResolvedValue({ preapproval_id: "preapproval-1" });

            const { result } = renderHook(() => useMembershipCheckout());

            await act(async () => {
                await result.current.startCheckoutWithCard(KioscoPlanEnum.Deluxe, { token: "card-token-123" });
            });

            expect(mockedCreateMembershipCheckoutRequest).toHaveBeenCalledWith(KioscoPlanEnum.Deluxe, MembershipPaymentMethodEnum.Card, "card-token-123");
            expect(navigate).toHaveBeenCalledWith("/membership/checkout/result");
        });

        it("rechaza (para que el Brick lo sepa) y expone el error si la API falla", async () => {
            mockedCreateMembershipCheckoutRequest.mockRejectedValue(new Error("Tu tarjeta fue rechazada."));

            const { result } = renderHook(() => useMembershipCheckout());

            let thrown: unknown;
            await act(async () => {
                try {
                    await result.current.startCheckoutWithCard(KioscoPlanEnum.Deluxe, { token: "card-token-123" });
                } catch (err) {
                    thrown = err;
                }
            });

            expect(thrown).toBeInstanceOf(Error);
            await waitFor(() => expect(result.current.isSubmitting).toBe(false));
            expect(result.current.error).toBeTruthy();
            expect(navigate).not.toHaveBeenCalled();
        });

        it("no llama a la API si el token está vacío (dato externo inválido)", async () => {
            const { result } = renderHook(() => useMembershipCheckout());

            let thrown: unknown;
            await act(async () => {
                try {
                    await result.current.startCheckoutWithCard(KioscoPlanEnum.Deluxe, { token: "" });
                } catch (err) {
                    thrown = err;
                }
            });

            expect(thrown).toBeInstanceOf(Error);
            expect(mockedCreateMembershipCheckoutRequest).not.toHaveBeenCalled();
        });
    });
});
