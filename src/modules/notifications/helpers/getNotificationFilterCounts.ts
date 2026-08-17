import type { NotificationEntity } from "@typings/notifications/notificationTypes";
import { NotificationFilterEnum, NotificationTypeEnum } from "@typings/notifications/notificationEnums";

export const getNotificationFilterCounts = (items: NotificationEntity[]): Record<NotificationFilterEnum, number> => ({
    [NotificationFilterEnum.All]: items.length,
    [NotificationFilterEnum.Alerts]: items.filter((item) => item.type === NotificationTypeEnum.LowStock).length,
    [NotificationFilterEnum.News]: items.filter((item) => item.type === NotificationTypeEnum.Sale).length,
});
