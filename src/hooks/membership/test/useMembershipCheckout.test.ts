import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { KioscoPlanEnum } from "@typings/membership/membershipEnums";
import { useMembershipCheckout } from "../useMembershipCheckout";
import { createMembershipCheckoutRequest } from "../../../modules/membership/api/membershipApi";

vi.mock("../../../modules/membership/api/membershipApi", () => ({
    createMembershipCheckoutRequest: vi.fn(),
}));

const mockedCreateMembershipCheckoutRequest = vi.mocked(createMembershipCheckoutRequest);

describe("useMembershipCheckout", () => {
    const originalLocation = window.location;

    beforeEach(() => {
        vi.clearAllMocks();
        Object.defineProperty(window, "location", {
            configurable: true,
            value: { ...originalLocation, href: "" },
        });
    });

    afterEach(() => {
        Object.defineProperty(window, "location", { configurable: true, value: originalLocation });
    });

    it("redirige a init_point cuando el checkout se crea correctamente", async () => {
        mockedCreateMembershipCheckoutRequest.mockResolvedValue({
            init_point: "https://www.mercadopago.com/checkout/123",
            preapproval_id: "preapproval-1",
        });

        const { result } = renderHook(() => useMembershipCheckout());

        await act(async () => {
            await result.current.startCheckout(KioscoPlanEnum.Deluxe);
        });

        expect(mockedCreateMembershipCheckoutRequest).toHaveBeenCalledWith(KioscoPlanEnum.Deluxe);
        expect(window.location.href).toBe("https://www.mercadopago.com/checkout/123");
    });

    it("expone un error y deja de estar submitting si la API falla", async () => {
        mockedCreateMembershipCheckoutRequest.mockRejectedValue(new Error("This kiosco is already subscribed to this plan"));

        const { result } = renderHook(() => useMembershipCheckout());

        await act(async () => {
            await result.current.startCheckout(KioscoPlanEnum.Standard);
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
            result.current.startCheckout(KioscoPlanEnum.Standard);
        });

        await waitFor(() => expect(result.current.isSubmitting).toBe(true));

        await act(async () => {
            resolvePromise({ init_point: "https://www.mercadopago.com/checkout/1", preapproval_id: "p1" });
        });
    });
});
