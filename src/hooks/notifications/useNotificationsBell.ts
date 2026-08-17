import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { UseNotificationsBellReturn } from "@typings/notifications/notificationTypes";
import { NotificationStatusEnum, NotificationTypeEnum } from "@typings/notifications/notificationEnums";
import type { AppDispatch } from "../../store/notification/notificationSlice";
import { markAllNotificationsAsReadThunk, markNotificationAsReadThunk } from "../../store/notification/notificationThunks";
import { useNotificationsData } from "./useNotificationsData";

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

    // Acción de un solo sentido: marca como leída (el back sólo expone
    // mark-as-read, no hay "volver a no leída").
    const handleToggleRead = useCallback((_id: string): void => {
        void dispatch(markNotificationAsReadThunk({ _id, status: NotificationStatusEnum.Readed }));
    }, [dispatch]);

    const handleMarkAllAsRead = useCallback((): void => {
        void dispatch(markAllNotificationsAsReadThunk(NotificationStatusEnum.Readed));
    }, [dispatch]);

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
        handleMarkAllAsRead,
        handleViewAll,
    };
};

export default useNotificationsBell;
