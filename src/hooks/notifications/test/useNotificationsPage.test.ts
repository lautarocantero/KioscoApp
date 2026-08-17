import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import useNotificationsPage from "../useNotificationsPage";
import {
    deleteAllNotificationsThunk,
    markAllNotificationsAsReadThunk,
} from "../../../store/notification/notificationThunks";
import { NotificationFilterEnum, NotificationStatusEnum, NotificationTypeEnum } from "@typings/notifications/notificationEnums";
import type { NotificationEntity } from "@typings/notifications/notificationTypes";

vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return { ...actual, useDispatch: vi.fn(), useSelector: vi.fn() };
});

vi.mock("../../../store/notification/notificationThunks", async (importOriginal) => {
    const actual = await importOriginal<typeof import("../../../store/notification/notificationThunks")>();
    return {
        ...actual,
        fetchNotificationsThunk: vi.fn(actual.fetchNotificationsThunk),
        deleteAllNotificationsThunk: vi.fn(actual.deleteAllNotificationsThunk),
        markAllNotificationsAsReadThunk: vi.fn(actual.markAllNotificationsAsReadThunk),
    };
});

const mockedUseDispatch = vi.mocked(useDispatch);
const mockedUseSelector = vi.mocked(useSelector);
const mockedDeleteAllNotificationsThunk = vi.mocked(deleteAllNotificationsThunk);
const mockedMarkAllNotificationsAsReadThunk = vi.mocked(markAllNotificationsAsReadThunk);

const buildItems = (): NotificationEntity[] => [
    {
        _id: "sale-1",
        type: NotificationTypeEnum.Sale,
        status: NotificationStatusEnum.NotReadYet,
        createdAt: new Date().toISOString(),
        payload: { sellerId: "s1", sellerName: "Lucas", amount: 100, currency: "ARS" },
    },
    {
        _id: "low-stock-1",
        type: NotificationTypeEnum.LowStock,
        status: NotificationStatusEnum.NotReadYet,
        createdAt: new Date().toISOString(),
        payload: { presentationId: "p1", productName: "Fideo", units: 1, minStock: 5 },
    },
];

describe("useNotificationsPage", () => {
    const dispatch = vi.fn().mockResolvedValue(undefined);

    beforeEach(() => {
        vi.useFakeTimers();
        vi.clearAllMocks();
        dispatch.mockResolvedValue(undefined);
        mockedUseDispatch.mockReturnValue(dispatch);
        mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) =>
            selectorFn({ notification: { items: buildItems(), loading: false, errorMessage: null } })
        );
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("arranca en el filtro 'all' con los contadores correctos", () => {
        const { result } = renderHook(() => useNotificationsPage());

        expect(result.current.filter).toBe(NotificationFilterEnum.All);
        expect(result.current.rows).toHaveLength(2);
        expect(result.current.counts[NotificationFilterEnum.All]).toBe(2);
        expect(result.current.counts[NotificationFilterEnum.News]).toBe(1);
        expect(result.current.counts[NotificationFilterEnum.Alerts]).toBe(1);
    });

    it("filtra las filas al cambiar de tab", () => {
        const { result } = renderHook(() => useNotificationsPage());

        act(() => result.current.setFilter(NotificationFilterEnum.News));

        expect(result.current.rows.map((r) => r._id)).toEqual(["sale-1"]);
    });

    it("handleMarkAllAsRead dispara markAllNotificationsAsReadThunk", () => {
        const { result } = renderHook(() => useNotificationsPage());

        act(() => result.current.handleMarkAllAsRead());

        expect(mockedMarkAllNotificationsAsReadThunk).toHaveBeenCalledWith(NotificationStatusEnum.Readed);
    });

    it("el diálogo de borrar todas abre, cierra y confirma", async () => {
        const { result } = renderHook(() => useNotificationsPage());

        expect(result.current.deleteAllDialogOpen).toBe(false);

        act(() => result.current.handleDeleteAllRequest());
        expect(result.current.deleteAllDialogOpen).toBe(true);

        act(() => result.current.handleDeleteAllCancel());
        expect(result.current.deleteAllDialogOpen).toBe(false);

        act(() => result.current.handleDeleteAllRequest());
        await act(async () => {
            await result.current.handleDeleteAllConfirm();
        });

        expect(mockedDeleteAllNotificationsThunk).toHaveBeenCalled();
        expect(result.current.deleteAllDialogOpen).toBe(false);
    });
});
