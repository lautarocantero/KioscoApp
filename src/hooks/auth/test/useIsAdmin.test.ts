// src/hooks/auth/test/useIsAdmin.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useSelector } from "react-redux";
import { AuthRoleEnum } from "@typings/auth/authEnums";
import { useIsAdmin } from "../useIsAdmin";

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

describe("useIsAdmin", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("es true cuando el rol logueado es Admin", () => {
        mockRole(AuthRoleEnum.Admin);
        const { result } = renderHook(() => useIsAdmin());

        expect(result.current).toBe(true);
    });

    it("es false cuando el rol logueado es Seller", () => {
        mockRole(AuthRoleEnum.Seller);
        const { result } = renderHook(() => useIsAdmin());

        expect(result.current).toBe(false);
    });
});
