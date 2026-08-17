import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { NotificationEntity, UseNotificationsPageReturn } from "@typings/notifications/notificationTypes";
import { NotificationFilterEnum, NotificationStatusEnum } from "@typings/notifications/notificationEnums";
import type { DeleteDialogState } from "@typings/ui/dialog.types";
import { CLOSED_DIALOG } from "../../config/constants";
import type { AppDispatch } from "../../store/notification/notificationSlice";
import {
    deleteAllNotificationsThunk,
    deleteNotificationThunk,
    markAllNotificationsAsReadThunk,
    setNotificationReadStatusThunk,
} from "../../store/notification/notificationThunks";
import { useNotificationsData } from "./useNotificationsData";
import { groupNotificationsByFilter } from "../../modules/notifications/helpers/groupNotificationsByFilter";
import { getNotificationFilterCounts } from "../../modules/notifications/helpers/getNotificationFilterCounts";
import { getNotificationDetailRoute } from "../../modules/notifications/helpers/getNotificationDetailRoute";
import { buildColumnsForNotifications } from "../../modules/notifications/pages/NotificationsPage/components/notificationColumns";

export const useNotificationsPage = (): UseNotificationsPageReturn => {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { items, loading, error } = useNotificationsData();

    const [filter, setFilter] = useState<NotificationFilterEnum>(NotificationFilterEnum.All);
    const [deleteDialog, setDeleteDialog] = useState<DeleteDialogState>(CLOSED_DIALOG);
    const [deleteAllDialogOpen, setDeleteAllDialogOpen] = useState(false);

    const counts = useMemo(() => getNotificationFilterCounts(items), [items]);
    const rows = useMemo(() => groupNotificationsByFilter(items, filter), [items, filter]);

    const handleToggleRead = useCallback((_id: string, currentStatus: NotificationStatusEnum): void => {
        const nextStatus = currentStatus === NotificationStatusEnum.NotReadYet
            ? NotificationStatusEnum.Readed
            : NotificationStatusEnum.NotReadYet;

        void dispatch(setNotificationReadStatusThunk({ _id, status: nextStatus }));
    }, [dispatch]);

    const handleGoToDetail = useCallback((notification: NotificationEntity): void => {
        navigate(getNotificationDetailRoute(notification));
    }, [navigate]);

    const handleDeleteRequest = useCallback((id: string, name: string): void => {
        setDeleteDialog({ open: true, id, name });
    }, []);

    const handleDeleteCancel = useCallback((): void => setDeleteDialog(CLOSED_DIALOG), []);

    const handleDeleteConfirm = useCallback(async (): Promise<void> => {
        await dispatch(deleteNotificationThunk({ _id: deleteDialog.id }));
        setDeleteDialog(CLOSED_DIALOG);
    }, [dispatch, deleteDialog.id]);

    const handleDeleteAllRequest = useCallback((): void => setDeleteAllDialogOpen(true), []);

    const handleDeleteAllCancel = useCallback((): void => setDeleteAllDialogOpen(false), []);

    const handleDeleteAllConfirm = useCallback(async (): Promise<void> => {
        await dispatch(deleteAllNotificationsThunk());
        setDeleteAllDialogOpen(false);
    }, [dispatch]);

    const handleMarkAllAsRead = useCallback((): void => {
        void dispatch(markAllNotificationsAsReadThunk(NotificationStatusEnum.Readed));
    }, [dispatch]);

    const columns = useMemo(
        () => buildColumnsForNotifications({
            onDeleteRequest: handleDeleteRequest,
            onToggleRead: handleToggleRead,
            onGoToDetail: handleGoToDetail,
            t,
        }),
        [handleDeleteRequest, handleToggleRead, handleGoToDetail, t],
    );

    return {
        loading,
        error,
        clearError: () => {},
        filter,
        setFilter,
        counts,
        rows,
        columns,
        deleteDialog,
        handleDeleteCancel,
        handleDeleteConfirm,
        deleteAllDialogOpen,
        handleDeleteAllRequest,
        handleDeleteAllCancel,
        handleDeleteAllConfirm,
        handleMarkAllAsRead,
    };
};

export default useNotificationsPage;
