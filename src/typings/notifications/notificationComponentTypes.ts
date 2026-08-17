import type { NotificationEntity } from "./notificationTypes";
import type { NotificationFilterEnum } from "./notificationEnums";

export interface NotificationsDropdownProps {
    anchorEl:                 HTMLElement | null;
    open:                     boolean;
    importantNotifications:   NotificationEntity[];
    alertNotifications:       NotificationEntity[];
    loading:                  boolean;
    onClose:                  () => void;
    onToggleRead:             (_id: string) => void;
    onMarkAllAsRead:          () => void;
    onViewAll:                () => void;
}

export interface NotificationsDropdownSectionProps {
    title:         string;
    emptyMessage:  string;
    notifications: NotificationEntity[];
    onToggleRead:  (_id: string) => void;
}

export interface NotificationListItemProps {
    notification: NotificationEntity;
    onToggleRead: (_id: string) => void;
}

export interface NotificationsFilterTabsProps {
    filter:  NotificationFilterEnum;
    counts:  Record<NotificationFilterEnum, number>;
    onChange: (filter: NotificationFilterEnum) => void;
}

export interface NotificationsPageActionsProps {
    onMarkAllAsRead: () => void;
    onDeleteAll:     () => void;
    disabled:        boolean;
}
