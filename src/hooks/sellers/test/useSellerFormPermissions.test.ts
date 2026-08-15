// src/hooks/sellers/test/useSellerFormPermissions.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useSelector } from "react-redux";
import { AuthRoleEnum } from "@typings/auth/authEnums";
import { useSellerFormPermissions } from "../useSellerFormPermissions";

vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return { ...actual, useSelector: vi.fn() };
});

const mockedUseSelector = vi.mocked(useSelector);

const mockRole = (role: AuthRoleEnum) => {
    mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) =>
        selectorFn({ auth: { role } })
    );
};

describe("useSellerFormPermissions", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("admin: solo email queda disabled", () => {
        mockRole(AuthRoleEnum.Admin);
        const { result } = renderHook(() => useSellerFormPermissions(false));

        expect(result.current.isAdmin).toBe(true);
        expect(result.current.disabledFields).toEqual(["email"]);
    });

    it("seller: email y rol quedan disabled", () => {
        mockRole(AuthRoleEnum.Seller);
        const { result } = renderHook(() => useSellerFormPermissions(false));

        expect(result.current.isAdmin).toBe(false);
        expect(result.current.disabledFields).toEqual(["email", "rol"]);
    });

    it("muestra el badge de rol en modo Editar (isDetail=false)", () => {
        mockRole(AuthRoleEnum.Admin);
        const { result } = renderHook(() => useSellerFormPermissions(false));

        expect(result.current.showRoleBadge).toBe(true);
    });

    it("oculta el badge de rol en modo Detalle (isDetail=true), sin importar el rol", () => {
        mockRole(AuthRoleEnum.Admin);
        const { result } = renderHook(() => useSellerFormPermissions(true));

        expect(result.current.showRoleBadge).toBe(false);
    });
});
