import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useSelector } from "react-redux";
import { AuthRoleEnum } from "@typings/auth/authEnums";
import type { KioscoWithStats } from "@typings/kiosco/kioscoTypes";
import { useActiveKiosco } from "../useActiveKiosco";

vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return { ...actual, useSelector: vi.fn() };
});

const mockedUseSelector = vi.mocked(useSelector);

const buildKiosco = (overrides: Partial<KioscoWithStats> = {}): KioscoWithStats => ({
    _id: "kiosco-1",
    name: "Kiosco Centro",
    address: "Av. Corrientes 1234",
    owner_id: "owner-1",
    invite_code: "ABC123",
    currency: "ARS",
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
    role: AuthRoleEnum.Seller,
    sellers_count: 1,
    sells_today_total: 0,
    last_accessed_at: null,
    ...overrides,
});

const mockKioscoState = (myKioscos: KioscoWithStats[], activeKioscoId: string | null) => {
    mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) =>
        selectorFn({ kiosco: { myKioscos, activeKioscoId } })
    );
};

describe("useActiveKiosco", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("devuelve null cuando no hay ningún kiosco activo", () => {
        mockKioscoState([], null);
        const { result } = renderHook(() => useActiveKiosco());

        expect(result.current.activeKiosco).toBeNull();
        expect(result.current.isAdmin).toBe(false);
    });

    it("resuelve el kiosco activo por id contra myKioscos", () => {
        const kiosco = buildKiosco({ _id: "kiosco-2", name: "Kiosco Norte" });
        mockKioscoState([buildKiosco(), kiosco], "kiosco-2");

        const { result } = renderHook(() => useActiveKiosco());

        expect(result.current.activeKiosco?.name).toBe("Kiosco Norte");
    });

    it("isAdmin es true cuando el rol del kiosco activo es admin", () => {
        mockKioscoState([buildKiosco({ role: AuthRoleEnum.Admin })], "kiosco-1");

        const { result } = renderHook(() => useActiveKiosco());

        expect(result.current.isAdmin).toBe(true);
    });

    it("isAdmin es false cuando el rol del kiosco activo es seller", () => {
        mockKioscoState([buildKiosco({ role: AuthRoleEnum.Seller })], "kiosco-1");

        const { result } = renderHook(() => useActiveKiosco());

        expect(result.current.isAdmin).toBe(false);
    });

    it("devuelve null si activeKioscoId no matchea ningún kiosco de la lista (stale)", () => {
        mockKioscoState([buildKiosco({ _id: "kiosco-1" })], "kiosco-borrado");

        const { result } = renderHook(() => useActiveKiosco());

        expect(result.current.activeKiosco).toBeNull();
        expect(result.current.isAdmin).toBe(false);
    });
});
