import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthStatus } from "@typings/auth/authEnums";
import { useJoinKioscoAccess } from "../useJoinKioscoAccess";
import { PENDING_INVITE_CODE_STORAGE_KEY } from "../../../config/constants";

vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return { ...actual, useSelector: vi.fn() };
});

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return { ...actual, useNavigate: vi.fn(), useSearchParams: vi.fn() };
});

const mockedUseSelector = vi.mocked(useSelector);
const mockedUseNavigate = vi.mocked(useNavigate);
const mockedUseSearchParams = vi.mocked(useSearchParams);

const mockStatus = (status: AuthStatus) => {
    mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) =>
        selectorFn({ auth: { status } })
    );
};

describe("useJoinKioscoAccess", () => {
    const navigate = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
        mockedUseNavigate.mockReturnValue(navigate);
        mockedUseSearchParams.mockReturnValue([new URLSearchParams("code=ABC123"), vi.fn()]);
    });

    afterEach(() => {
        localStorage.clear();
    });

    it("guarda el código y redirige a /register si el usuario no está autenticado", () => {
        mockStatus(AuthStatus.NotAuthenticated);
        renderHook(() => useJoinKioscoAccess());

        expect(localStorage.getItem(PENDING_INVITE_CODE_STORAGE_KEY)).toBe("ABC123");
        expect(navigate).toHaveBeenCalledWith("/register");
    });

    it("no guarda nada si no hay código en la URL", () => {
        mockedUseSearchParams.mockReturnValue([new URLSearchParams(), vi.fn()]);
        mockStatus(AuthStatus.NotAuthenticated);
        renderHook(() => useJoinKioscoAccess());

        expect(localStorage.getItem(PENDING_INVITE_CODE_STORAGE_KEY)).toBeNull();
        expect(navigate).toHaveBeenCalledWith("/register");
    });

    it("no redirige si el usuario ya está autenticado", () => {
        mockStatus(AuthStatus.Authenticated);
        renderHook(() => useJoinKioscoAccess());

        expect(navigate).not.toHaveBeenCalled();
    });

    it("isChecking es true mientras se está verificando la sesión", () => {
        mockStatus(AuthStatus.Checking);
        const { result } = renderHook(() => useJoinKioscoAccess());

        expect(result.current.isChecking).toBe(true);
        expect(navigate).not.toHaveBeenCalled();
    });
});
