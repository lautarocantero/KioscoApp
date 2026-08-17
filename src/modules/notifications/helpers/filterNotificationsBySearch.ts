import type { TFunction } from "i18next";
import type { NotificationEntity } from "@typings/notifications/notificationTypes";
import { getNotificationMessage } from "./getNotificationMessage";

export const filterNotificationsBySearch = (
    items: NotificationEntity[],
    searchTerm: string,
    t: TFunction,
): NotificationEntity[] => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return items;

    return items.filter((item) => {
        const { title, subtitle } = getNotificationMessage(item, t);
        return title.toLowerCase().includes(term) || subtitle.toLowerCase().includes(term);
    });
};
