import type { NotificationEntity } from "@typings/notifications/notificationTypes";
import { NotificationFilterEnum, NotificationTypeEnum } from "@typings/notifications/notificationEnums";

export const groupNotificationsByFilter = (
    items: NotificationEntity[],
    filter: NotificationFilterEnum,
): NotificationEntity[] => {
    if (filter === NotificationFilterEnum.Alerts) {
        return items.filter((item) => item.type === NotificationTypeEnum.LowStock);
    }

    if (filter === NotificationFilterEnum.News) {
        return items.filter((item) => item.type === NotificationTypeEnum.Sale);
    }

    return items;
};
