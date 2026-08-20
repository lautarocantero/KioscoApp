import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { AuthRoleEnum } from "@typings/auth/authEnums";
import { KioscoPlanEnum, KioscoPlanStatusEnum } from "@typings/membership/membershipEnums";
import type { KioscoWithStats } from "@typings/kiosco/kioscoTypes";
import { useMembershipStatus } from "../useMembershipStatus";
import { getMembershipStatusRequest } from "../../../modules/membership/api/membershipApi";
import { useActiveKiosco } from "../../kiosco/useActiveKiosco";

vi.mock("../../../modules/membership/api/membershipApi", () => ({
    getMembershipStatusRequest: vi.fn(),
}));

vi.mock("../../kiosco/useActiveKiosco", () => ({
    useActiveKiosco: vi.fn(),
}));

const mockedGetMembershipStatusRequest = vi.mocked(getMembershipStatusRequest);
const mockedUseActiveKiosco = vi.mocked(useActiveKiosco);

const buildKiosco = (): KioscoWithStats => ({
    _id: "kiosco-1",
    name: "Kiosco Centro",
    address: "Av. Corrientes 1234",
    owner_id: "owner-1",
    invite_code: "ABC123",
    currency: "ARS",
    plan: KioscoPlanEnum.Stocko,
    plan_status: KioscoPlanStatusEnum.Active,
    mp_preapproval_id: null,
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
    role: AuthRoleEnum.Admin,
    sellers_count: 1,
    sells_today_total: 0,
    last_accessed_at: null,
});

describe("useMembershipStatus", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("no llama a la API si no hay kiosco activo", () => {
        mockedUseActiveKiosco.mockReturnValue({ activeKiosco: null, isAdmin: false });

        const { result } = renderHook(() => useMembershipStatus());

        expect(result.current.loading).toBe(false);
        expect(mockedGetMembershipStatusRequest).not.toHaveBeenCalled();
    });

    it("trae el status del kiosco activo", async () => {
        mockedUseActiveKiosco.mockReturnValue({ activeKiosco: buildKiosco(), isAdmin: true });
        mockedGetMembershipStatusRequest.mockResolvedValue({
            plan: KioscoPlanEnum.SuperStocko,
            plan_status: KioscoPlanStatusEnum.Active,
            next_payment_date: "2026-02-01T00:00:00.000Z",
        });

        const { result } = renderHook(() => useMembershipStatus());

        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.status?.plan).toBe(KioscoPlanEnum.SuperStocko);
        expect(result.current.error).toBeNull();
    });

    it("expone un mensaje de error si la API falla", async () => {
        mockedUseActiveKiosco.mockReturnValue({ activeKiosco: buildKiosco(), isAdmin: true });
        mockedGetMembershipStatusRequest.mockRejectedValue(new Error("Request failed with status code 500"));

        const { result } = renderHook(() => useMembershipStatus());

        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.error).toBeTruthy();
        expect(result.current.status).toBeNull();
    });

    it("refetch vuelve a pedir el status", async () => {
        mockedUseActiveKiosco.mockReturnValue({ activeKiosco: buildKiosco(), isAdmin: true });
        mockedGetMembershipStatusRequest.mockResolvedValue({
            plan: KioscoPlanEnum.Stocko,
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
