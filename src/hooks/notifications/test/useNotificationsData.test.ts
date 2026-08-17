import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import useNotificationsData from "../useNotificationsData";
import { fetchNotificationsThunk } from "../../../store/notification/notificationThunks";

vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return { ...actual, useDispatch: vi.fn(), useSelector: vi.fn() };
});

vi.mock("../../../store/notification/notificationThunks", async (importOriginal) => {
    const actual = await importOriginal<typeof import("../../../store/notification/notificationThunks")>();
    return { ...actual, fetchNotificationsThunk: vi.fn(actual.fetchNotificationsThunk) };
});

const mockedUseDispatch = vi.mocked(useDispatch);
const mockedUseSelector = vi.mocked(useSelector);
const mockedFetchNotificationsThunk = vi.mocked(fetchNotificationsThunk);

describe("useNotificationsData", () => {
    const dispatch = vi.fn();

    const mockNotificationState = (items: unknown[] = []) => {
        mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) =>
            selectorFn({ notification: { items, loading: false, errorMessage: null } })
        );
    };

    beforeEach(() => {
        vi.useFakeTimers();
        vi.clearAllMocks();
        mockedUseDispatch.mockReturnValue(dispatch);
        mockNotificationState();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("dispara fetchNotificationsThunk al montar", () => {
        renderHook(() => useNotificationsData());
        expect(mockedFetchNotificationsThunk).toHaveBeenCalledTimes(1);
    });

    it("vuelve a disparar fetchNotificationsThunk cada POLL_INTERVAL_MS", () => {
        renderHook(() => useNotificationsData());
        expect(mockedFetchNotificationsThunk).toHaveBeenCalledTimes(1);

        vi.advanceTimersByTime(45_000);
        expect(mockedFetchNotificationsThunk).toHaveBeenCalledTimes(2);
    });

    it("devuelve items/loading/error tal cual vienen del store", () => {
        mockNotificationState([{ _id: "1" }]);
        const { result } = renderHook(() => useNotificationsData());

        expect(result.current.items).toHaveLength(1);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
    });
});
