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

const KIOSCO_ID = "kiosco-1";
const CURRENT_USER_ID = "user-1";

const mockRole = (role: AuthRoleEnum, currentUserId: string | null = CURRENT_USER_ID) => {
    mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) =>
        selectorFn({
            kiosco: {
                activeKioscoId: KIOSCO_ID,
                myKioscos: [{ _id: KIOSCO_ID, role }],
            },
            auth: {
                _id: currentUserId,
            },
        })
    );
};

describe("useSellerFormPermissions", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("admin: solo email queda disabled (puede editar nombre de cualquiera)", () => {
        mockRole(AuthRoleEnum.Admin);
        const { result } = renderHook(() => useSellerFormPermissions(false, "otro-vendedor-id"));

        expect(result.current.isAdmin).toBe(true);
        expect(result.current.disabledFields).toEqual(["email"]);
        expect(result.current.disabledFieldsTooltip).toEqual({});
    });

    it("seller editando su propio perfil: email y rol quedan disabled, nombre editable", () => {
        mockRole(AuthRoleEnum.Seller);
        const { result } = renderHook(() => useSellerFormPermissions(false, CURRENT_USER_ID));

        expect(result.current.isAdmin).toBe(false);
        expect(result.current.disabledFields).toEqual(["email", "rol"]);
        expect(result.current.disabledFieldsTooltip).toEqual({});
    });

    it("seller editando el perfil de otro vendedor: además queda disabled el nombre, con tooltip", () => {
        mockRole(AuthRoleEnum.Seller);
        const { result } = renderHook(() => useSellerFormPermissions(false, "otro-vendedor-id"));

        expect(result.current.isAdmin).toBe(false);
        expect(result.current.disabledFields).toEqual(["email", "rol", "name"]);
        expect(result.current.disabledFieldsTooltip).toEqual({
            name: "Solo disponible para el administrador",
        });
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
