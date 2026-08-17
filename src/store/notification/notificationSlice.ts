import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { store } from '../store';
import type { NotificationEntity, NotificationState } from '@typings/notifications/notificationTypes';
import type { NotificationStatusEnum } from '@typings/notifications/notificationEnums';

const initialState: NotificationState = {
    items:        [],
    loading:      false,
    errorMessage: null,
};

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {

        checkingNotifications: (state: NotificationState) => {
            state.loading      = true;
            state.errorMessage = null;
        },

        setNotifications: (state: NotificationState, action: PayloadAction<NotificationEntity[]>) => {
            state.items        = action.payload;
            state.loading      = false;
            state.errorMessage = null;
        },

        setNotificationsError: (state: NotificationState, action: PayloadAction<string>) => {
            state.loading      = false;
            state.errorMessage = action.payload;
        },

        setNotificationStatusLocal: (
            state: NotificationState,
            action: PayloadAction<{ _id: string; status: NotificationStatusEnum }>,
        ) => {
            const notification = state.items.find((item) => item._id === action.payload._id);
            if (!notification) return;
            notification.status = action.payload.status;
        },

        setAllNotificationsStatusLocal: (state: NotificationState, action: PayloadAction<NotificationStatusEnum>) => {
            state.items.forEach((item) => { item.status = action.payload; });
        },

        removeNotificationLocal: (state: NotificationState, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item._id !== action.payload);
        },

        clearAllNotificationsLocal: (state: NotificationState) => {
            state.items = [];
        },
    },
});

export const {
    checkingNotifications,
    setNotifications,
    setNotificationsError,
    setNotificationStatusLocal,
    setAllNotificationsStatusLocal,
    removeNotificationLocal,
    clearAllNotificationsLocal,
} = notificationSlice.actions;

export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default notificationSlice.reducer;
