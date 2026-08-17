import { NotificationFilterEnum } from "@typings/notifications/notificationEnums";

export const NOTIFICATION_FILTER_OPTIONS: NotificationFilterEnum[] = [
    NotificationFilterEnum.All,
    NotificationFilterEnum.Alerts,
    NotificationFilterEnum.News,
];

export const NOTIFICATION_FILTER_LABEL_KEYS: Record<NotificationFilterEnum, string> = {
    [NotificationFilterEnum.All]: "notifications.filters.all",
    [NotificationFilterEnum.Alerts]: "notifications.filters.alerts",
    [NotificationFilterEnum.News]: "notifications.filters.news",
};
