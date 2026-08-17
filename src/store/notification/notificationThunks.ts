import type { Dispatch } from "@reduxjs/toolkit";
import type { NotificationEntity } from "@typings/notifications/notificationTypes";
import type { NotificationStatusEnum } from "@typings/notifications/notificationEnums";
import {
    deleteAllNotificationsRequest,
    deleteNotificationRequest,
    getNotificationsRequest,
    markAllAsReadRequest,
    markAsReadRequest,
} from "../../modules/notifications/api/notificationApi";
import { handleError } from "../shared/handlerStoreError";
import {
    checkingNotifications,
    clearAllNotificationsLocal,
    removeNotificationLocal,
    setAllNotificationsStatusLocal,
    setNotificationStatusLocal,
    setNotifications,
    setNotificationsError,
} from "./notificationSlice";

// Re-sincroniza la lista contra el back cuando un update optimista falla —
// más simple que llevar un snapshot manual para hacer rollback.
const resyncNotifications = async (dispatch: Dispatch): Promise<void> => {
    try {
        const notifications: NotificationEntity[] = await getNotificationsRequest();
        dispatch(setNotifications(notifications));
    } catch {
        // el resync es best-effort: si también falla, el error original ya se propaga.
    }
};

//──────────────────────────────────────────── Get ───────────────────────────────────────────//

export const fetchNotificationsThunk = () => {
    return async (dispatch: Dispatch): Promise<NotificationEntity[] | undefined> => {
        dispatch(checkingNotifications());
        try {
            const notifications: NotificationEntity[] = await getNotificationsRequest();
            dispatch(setNotifications(notifications));
            return notifications;
        } catch (error: unknown) {
            dispatch(setNotificationsError("No se pudieron obtener las notificaciones"));
            handleError(error);
        }
    };
};

//──────────────────────────────────────────── Patch ───────────────────────────────────────────//

// Optimista: el estado cambia al toque; si el back falla, se resincroniza
// en vez de llevar un rollback manual.
export const markNotificationAsReadThunk = ({ _id, status }: { _id: string; status: NotificationStatusEnum }) => {
    return async (dispatch: Dispatch): Promise<void> => {
        dispatch(setNotificationStatusLocal({ _id, status }));
        try {
            await markAsReadRequest(_id);
        } catch (error: unknown) {
            await resyncNotifications(dispatch);
            handleError(error);
        }
    };
};

export const markAllNotificationsAsReadThunk = (readedStatus: NotificationStatusEnum) => {
    return async (dispatch: Dispatch): Promise<void> => {
        dispatch(setAllNotificationsStatusLocal(readedStatus));
        try {
            await markAllAsReadRequest();
        } catch (error: unknown) {
            await resyncNotifications(dispatch);
            handleError(error);
        }
    };
};

//──────────────────────────────────────────── Delete ───────────────────────────────────────────//

export const deleteNotificationThunk = ({ _id }: { _id: string }) => {
    return async (dispatch: Dispatch): Promise<void> => {
        dispatch(removeNotificationLocal(_id));
        try {
            await deleteNotificationRequest(_id);
        } catch (error: unknown) {
            await resyncNotifications(dispatch);
            handleError(error);
        }
    };
};

export const deleteAllNotificationsThunk = () => {
    return async (dispatch: Dispatch): Promise<void> => {
        dispatch(clearAllNotificationsLocal());
        try {
            await deleteAllNotificationsRequest();
        } catch (error: unknown) {
            await resyncNotifications(dispatch);
            handleError(error);
        }
    };
};
