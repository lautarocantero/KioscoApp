import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { KioscoPlanEnum, KioscoPlanStatusEnum } from "@typings/membership/membershipEnums";
import { useMembershipStatus } from "../useMembershipStatus";
import { getMembershipStatusRequest } from "../../../modules/membership/api/membershipApi";

vi.mock("../../../modules/membership/api/membershipApi", () => ({
    getMembershipStatusRequest: vi.fn(),
}));

const mockedGetMembershipStatusRequest = vi.mocked(getMembershipStatusRequest);

describe("useMembershipStatus", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("trae el status de la cuenta autenticada al montar", async () => {
        mockedGetMembershipStatusRequest.mockResolvedValue({
            plan: KioscoPlanEnum.Deluxe,
            plan_status: KioscoPlanStatusEnum.Active,
            next_payment_date: "2026-02-01T00:00:00.000Z",
        });

        const { result } = renderHook(() => useMembershipStatus());

        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.status?.plan).toBe(KioscoPlanEnum.Deluxe);
        expect(result.current.error).toBeNull();
    });

    it("expone un mensaje de error si la API falla", async () => {
        mockedGetMembershipStatusRequest.mockRejectedValue(new Error("Request failed with status code 500"));

        const { result } = renderHook(() => useMembershipStatus());

        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.error).toBeTruthy();
        expect(result.current.status).toBeNull();
    });

    it("refetch vuelve a pedir el status", async () => {
        mockedGetMembershipStatusRequest.mockResolvedValue({
            plan: KioscoPlanEnum.Standard,
            plan_status: KioscoPlanStatusEnum.Active,
            next_payment_date: null,
        });

        const { result } = renderHook(() => useMembershipStatus());
        await waitFor(() => expect(result.current.loading).toBe(false));

        mockedGetMembershipStatusRequest.mockClear();
        act(() => result.current.refetch());

        await waitFor(() => expect(mockedGetMembershipStatusRequest).toHaveBeenCalledTimes(1));
    });
});
