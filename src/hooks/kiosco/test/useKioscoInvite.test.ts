import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import type { InviteInfo, KioscoWithStats } from "@typings/kiosco/kioscoTypes";
import { AuthRoleEnum } from "@typings/auth/authEnums";
import { useKioscoInvite } from "../useKioscoInvite";
import { getInviteInfoRequest } from "../../../modules/kiosco/api/kioscoApi";
import { useActiveKiosco } from "../useActiveKiosco";

vi.mock("../../../modules/kiosco/api/kioscoApi", () => ({
    getInviteInfoRequest: vi.fn(),
}));

vi.mock("../useActiveKiosco", () => ({
    useActiveKiosco: vi.fn(),
}));

const mockedGetInviteInfoRequest = vi.mocked(getInviteInfoRequest);
const mockedUseActiveKiosco = vi.mocked(useActiveKiosco);

const buildKiosco = (): KioscoWithStats => ({
    _id: "kiosco-1",
    name: "Kiosco Centro",
    address: "Av. Corrientes 1234",
    owner_id: "owner-1",
    invite_code: "ABC123",
    currency: "ARS",
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
    role: AuthRoleEnum.Admin,
    sellers_count: 1,
    sells_today_total: 0,
    last_accessed_at: null,
});

const INVITE_INFO: InviteInfo = { invite_code: "ABC123", invite_link: "https://stocko.app/join-kiosco?code=ABC123" };

describe("useKioscoInvite", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockedUseActiveKiosco.mockReturnValue({ activeKiosco: buildKiosco(), isAdmin: true });
        Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } });
    });

    it("no pide el código de invitación si el modal está cerrado", () => {
        renderHook(() => useKioscoInvite(false));
        expect(mockedGetInviteInfoRequest).not.toHaveBeenCalled();
    });

    it("pide el código de invitación cuando el modal se abre", async () => {
        mockedGetInviteInfoRequest.mockResolvedValue(INVITE_INFO);
        const { result } = renderHook(() => useKioscoInvite(true));

        await waitFor(() => expect(result.current.inviteInfo).toEqual(INVITE_INFO));
        expect(mockedGetInviteInfoRequest).toHaveBeenCalledWith("kiosco-1");
        expect(result.current.loading).toBe(false);
    });

    it("setea error si falla la petición", async () => {
        mockedGetInviteInfoRequest.mockRejectedValue(new Error("network error"));
        const { result } = renderHook(() => useKioscoInvite(true));

        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.error).toBeTruthy();
    });

    it("handleCopy copia el link al portapapeles y marca copied", async () => {
        mockedGetInviteInfoRequest.mockResolvedValue(INVITE_INFO);
        const { result } = renderHook(() => useKioscoInvite(true));

        await waitFor(() => expect(result.current.inviteInfo).toEqual(INVITE_INFO));

        act(() => {
            result.current.handleCopy();
        });

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(INVITE_INFO.invite_link);
        expect(result.current.copied).toBe(true);
    });

    it("handleCopy no hace nada si todavía no hay inviteInfo", () => {
        const { result } = renderHook(() => useKioscoInvite(false));

        act(() => {
            result.current.handleCopy();
        });

        expect(navigator.clipboard.writeText).not.toHaveBeenCalled();
        expect(result.current.copied).toBe(false);
    });
});
