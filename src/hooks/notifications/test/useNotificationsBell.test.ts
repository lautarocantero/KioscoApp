import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useNotificationsBell from "../useNotificationsBell";
import {
    markAllNotificationsAsReadThunk,
    setNotificationReadStatusThunk,
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
        setNotificationReadStatusThunk: vi.fn(actual.setNotificationReadStatusThunk),
        markAllNotificationsAsReadThunk: vi.fn(actual.markAllNotificationsAsReadThunk),
    };
});

const mockedUseDispatch = vi.mocked(useDispatch);
const mockedUseSelector = vi.mocked(useSelector);
const mockedUseNavigate = vi.mocked(useNavigate);
const mockedSetNotificationReadStatusThunk = vi.mocked(setNotificationReadStatusThunk);
const mockedMarkAllNotificationsAsReadThunk = vi.mocked(markAllNotificationsAsReadThunk);

const buildItems = (): NotificationEntity[] => [
    {
        _id: "sale-1",
        type: NotificationTypeEnum.Sale,
        status: NotificationStatusEnum.NotReadYet,
        createdAt: new Date().toISOString(),
        payload: { sellId: "sell-1", sellerId: "s1", sellerName: "Lucas", amount: 100, currency: "ARS" },
    },
    {
        _id: "low-stock-1",
        type: NotificationTypeEnum.LowStock,
        status: NotificationStatusEnum.Readed,
        createdAt: new Date().toISOString(),
        payload: { presentationId: "p1", productId: "prod-1", productName: "Fideo", units: 1, minStock: 5 },
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

    it("handleToggleRead pasa de no leída a leída", () => {
        const { result } = renderHook(() => useNotificationsBell());

        act(() => result.current.handleToggleRead("sale-1", NotificationStatusEnum.NotReadYet));

        expect(mockedSetNotificationReadStatusThunk).toHaveBeenCalledWith({ _id: "sale-1", status: NotificationStatusEnum.Readed });
    });

    it("handleToggleRead pasa de leída a no leída (bidireccional)", () => {
        const { result } = renderHook(() => useNotificationsBell());

        act(() => result.current.handleToggleRead("low-stock-1", NotificationStatusEnum.Readed));

        expect(mockedSetNotificationReadStatusThunk).toHaveBeenCalledWith({ _id: "low-stock-1", status: NotificationStatusEnum.NotReadYet });
    });

    it("handleMarkAllAsRead dispara markAllNotificationsAsReadThunk", () => {
        const { result } = renderHook(() => useNotificationsBell());

        act(() => result.current.handleMarkAllAsRead());

        expect(mockedMarkAllNotificationsAsReadThunk).toHaveBeenCalledWith(NotificationStatusEnum.Readed);
    });

    it("handleGoToDetail navega al detalle de la venta y cierra el popover", () => {
        const { result } = renderHook(() => useNotificationsBell());

        act(() => {
            result.current.handleOpen({ currentTarget: document.createElement("button") } as unknown as React.MouseEvent<HTMLElement>);
        });
        act(() => result.current.handleGoToDetail(result.current.importantNotifications[0]));

        expect(navigate).toHaveBeenCalledWith("/sell/sell-1");
        expect(result.current.open).toBe(false);
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
