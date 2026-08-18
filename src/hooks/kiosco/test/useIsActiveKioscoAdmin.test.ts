import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useSelector } from "react-redux";
import { AuthRoleEnum } from "@typings/auth/authEnums";
import { useIsActiveKioscoAdmin } from "../useIsActiveKioscoAdmin";

vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return { ...actual, useSelector: vi.fn() };
});

const mockedUseSelector = vi.mocked(useSelector);

const mockRole = (role: AuthRoleEnum) => {
    mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) =>
        selectorFn({
            kiosco: {
                activeKioscoId: "kiosco-1",
                myKioscos: [{ _id: "kiosco-1", role }],
            },
        })
    );
};

describe("useIsActiveKioscoAdmin", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("devuelve true para un admin del kiosco activo", () => {
        mockRole(AuthRoleEnum.Admin);
        const { result } = renderHook(() => useIsActiveKioscoAdmin());
        expect(result.current).toBe(true);
    });

    it("devuelve false para un vendedor del kiosco activo", () => {
        mockRole(AuthRoleEnum.Seller);
        const { result } = renderHook(() => useIsActiveKioscoAdmin());
        expect(result.current).toBe(false);
    });
});
