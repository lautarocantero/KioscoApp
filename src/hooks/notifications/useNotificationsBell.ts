import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { NotificationEntity, UseNotificationsBellReturn } from "@typings/notifications/notificationTypes";
import { NotificationStatusEnum, NotificationTypeEnum } from "@typings/notifications/notificationEnums";
import type { AppDispatch } from "../../store/notification/notificationSlice";
import { markAllNotificationsAsReadThunk, setNotificationReadStatusThunk } from "../../store/notification/notificationThunks";
import { useNotificationsData } from "./useNotificationsData";
import { getNotificationDetailRoute } from "../../modules/notifications/helpers/getNotificationDetailRoute";

export const useNotificationsBell = (): UseNotificationsBellReturn => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { items, loading } = useNotificationsData();

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handleOpen = useCallback((event: React.MouseEvent<HTMLElement>): void => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleClose = useCallback((): void => {
        setAnchorEl(null);
    }, []);

    const importantNotifications = useMemo(
        () => items.filter((item) => item.type === NotificationTypeEnum.Sale),
        [items],
    );

    const alertNotifications = useMemo(
        () => items.filter((item) => item.type === NotificationTypeEnum.LowStock),
        [items],
    );

    const unreadCount = useMemo(
        () => items.filter((item) => item.status === NotificationStatusEnum.NotReadYet).length,
        [items],
    );

    const handleToggleRead = useCallback((_id: string, currentStatus: NotificationStatusEnum): void => {
        const nextStatus = currentStatus === NotificationStatusEnum.NotReadYet
            ? NotificationStatusEnum.Readed
            : NotificationStatusEnum.NotReadYet;

        void dispatch(setNotificationReadStatusThunk({ _id, status: nextStatus }));
    }, [dispatch]);

    const handleMarkAllAsRead = useCallback((): void => {
        void dispatch(markAllNotificationsAsReadThunk(NotificationStatusEnum.Readed));
    }, [dispatch]);

    const handleGoToDetail = useCallback((notification: NotificationEntity): void => {
        handleClose();
        navigate(getNotificationDetailRoute(notification));
    }, [handleClose, navigate]);

    const handleViewAll = useCallback((): void => {
        handleClose();
        navigate("/notifications");
    }, [handleClose, navigate]);

    return {
        anchorEl,
        open,
        unreadCount,
        importantNotifications,
        alertNotifications,
        loading,
        handleOpen,
        handleClose,
        handleToggleRead,
        handleGoToDetail,
        handleMarkAllAsRead,
        handleViewAll,
    };
};

export default useNotificationsBell;
