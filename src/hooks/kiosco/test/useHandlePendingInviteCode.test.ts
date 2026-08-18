import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { AuthStatus } from "@typings/auth/authEnums";
import { useHandlePendingInviteCode } from "../useHandlePendingInviteCode";
import { joinKioscoThunk, fetchMyKioscosThunk } from "../../../store/kiosco/kioscoThunks";
import { PENDING_INVITE_CODE_STORAGE_KEY } from "../../../config/constants";

vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return { ...actual, useDispatch: vi.fn(), useSelector: vi.fn() };
});

vi.mock("../../../store/kiosco/kioscoThunks", async (importOriginal) => {
    const actual = await importOriginal<typeof import("../../../store/kiosco/kioscoThunks")>();
    return {
        ...actual,
        joinKioscoThunk: vi.fn(actual.joinKioscoThunk),
        fetchMyKioscosThunk: vi.fn(actual.fetchMyKioscosThunk),
    };
});

const mockedUseDispatch = vi.mocked(useDispatch);
const mockedUseSelector = vi.mocked(useSelector);
const mockedJoinKioscoThunk = vi.mocked(joinKioscoThunk);
const mockedFetchMyKioscosThunk = vi.mocked(fetchMyKioscosThunk);

const mockStatus = (status: AuthStatus) => {
    mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) =>
        selectorFn({ auth: { status } })
    );
};

describe("useHandlePendingInviteCode", () => {
    const dispatch = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
        dispatch.mockResolvedValue(undefined);
        mockedUseDispatch.mockReturnValue(dispatch);
    });

    afterEach(() => {
        localStorage.clear();
    });

    it("retoma el join y borra el código guardado cuando pasa a Authenticated", async () => {
        localStorage.setItem(PENDING_INVITE_CODE_STORAGE_KEY, "ABC123");
        mockStatus(AuthStatus.Authenticated);

        renderHook(() => useHandlePendingInviteCode());
        await Promise.resolve();

        expect(mockedJoinKioscoThunk).toHaveBeenCalledWith({ invite_code: "ABC123" });
        expect(localStorage.getItem(PENDING_INVITE_CODE_STORAGE_KEY)).toBeNull();
    });

    it("refresca myKioscos después de unirse", async () => {
        localStorage.setItem(PENDING_INVITE_CODE_STORAGE_KEY, "ABC123");
        mockStatus(AuthStatus.Authenticated);

        renderHook(() => useHandlePendingInviteCode());
        await Promise.resolve();
        await Promise.resolve();

        expect(mockedFetchMyKioscosThunk).toHaveBeenCalled();
    });

    it("no hace nada si no hay código pendiente", () => {
        mockStatus(AuthStatus.Authenticated);
        renderHook(() => useHandlePendingInviteCode());

        expect(mockedJoinKioscoThunk).not.toHaveBeenCalled();
    });

    it("no hace nada si el usuario todavía no está autenticado", () => {
        localStorage.setItem(PENDING_INVITE_CODE_STORAGE_KEY, "ABC123");
        mockStatus(AuthStatus.Checking);
        renderHook(() => useHandlePendingInviteCode());

        expect(mockedJoinKioscoThunk).not.toHaveBeenCalled();
        expect(localStorage.getItem(PENDING_INVITE_CODE_STORAGE_KEY)).toBe("ABC123");
    });
});
