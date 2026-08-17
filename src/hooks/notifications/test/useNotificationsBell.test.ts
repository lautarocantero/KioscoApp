import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useNotificationsBell from "../useNotificationsBell";
import {
    markAllNotificationsAsReadThunk,
    markNotificationAsReadThunk,
} from "../../../store/notification/notificationThunks";
import { NotificationStatusEnum, NotificationTypeEnum } from "@typings/notifications/notificationEnums";
import type { NotificationEntity } from "@typings/notifications/notificationTypes";

vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return { ...actual, useDispatch: vi.fn(), useSelector: vi.fn() };
});

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return { ...actual, useNavigate: vi.fn() };
});

vi.mock("../../../store/notification/notificationThunks", async (importOriginal) => {
    const actual = await importOriginal<typeof import("../../../store/notification/notificationThunks")>();
    return {
        ...actual,
        fetchNotificationsThunk: vi.fn(actual.fetchNotificationsThunk),
        markNotificationAsReadThunk: vi.fn(actual.markNotificationAsReadThunk),
        markAllNotificationsAsReadThunk: vi.fn(actual.markAllNotificationsAsReadThunk),
    };
});

const mockedUseDispatch = vi.mocked(useDispatch);
const mockedUseSelector = vi.mocked(useSelector);
const mockedUseNavigate = vi.mocked(useNavigate);
const mockedMarkNotificationAsReadThunk = vi.mocked(markNotificationAsReadThunk);
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
        status: NotificationStatusEnum.Readed,
        createdAt: new Date().toISOString(),
        payload: { presentationId: "p1", productName: "Fideo", units: 1, minStock: 5 },
    },
];

describe("useNotificationsBell", () => {
    const dispatch = vi.fn();
    const navigate = vi.fn();

    beforeEach(() => {
        vi.useFakeTimers();
        vi.clearAllMocks();
        mockedUseDispatch.mockReturnValue(dispatch);
        mockedUseNavigate.mockReturnValue(navigate);
        mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) =>
            selectorFn({ notification: { items: buildItems(), loading: false, errorMessage: null } })
        );
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("separa ventas en importantNotifications y stock bajo en alertNotifications", () => {
        const { result } = renderHook(() => useNotificationsBell());

        expect(result.current.importantNotifications.map((n) => n._id)).toEqual(["sale-1"]);
        expect(result.current.alertNotifications.map((n) => n._id)).toEqual(["low-stock-1"]);
    });

    it("cuenta solo las no leídas para el badge", () => {
        const { result } = renderHook(() => useNotificationsBell());
        expect(result.current.unreadCount).toBe(1);
    });

    it("abre y cierra el popover con handleOpen/handleClose", () => {
        const { result } = renderHook(() => useNotificationsBell());
        expect(result.current.open).toBe(false);

        act(() => {
            result.current.handleOpen({ currentTarget: document.createElement("button") } as unknown as React.MouseEvent<HTMLElement>);
        });
        expect(result.current.open).toBe(true);

        act(() => result.current.handleClose());
        expect(result.current.open).toBe(false);
    });

    it("handleToggleRead marca como leída (un solo sentido)", () => {
        const { result } = renderHook(() => useNotificationsBell());

        act(() => result.current.handleToggleRead("sale-1"));

        expect(mockedMarkNotificationAsReadThunk).toHaveBeenCalledWith({ _id: "sale-1", status: NotificationStatusEnum.Readed });
    });

    it("handleMarkAllAsRead dispara markAllNotificationsAsReadThunk", () => {
        const { result } = renderHook(() => useNotificationsBell());

        act(() => result.current.handleMarkAllAsRead());

        expect(mockedMarkAllNotificationsAsReadThunk).toHaveBeenCalledWith(NotificationStatusEnum.Readed);
    });

    it("handleViewAll navega a /notifications y cierra el popover", () => {
        const { result } = renderHook(() => useNotificationsBell());

        act(() => {
            result.current.handleOpen({ currentTarget: document.createElement("button") } as unknown as React.MouseEvent<HTMLElement>);
        });
        act(() => result.current.handleViewAll());

        expect(navigate).toHaveBeenCalledWith("/notifications");
        expect(result.current.open).toBe(false);
    });
});
