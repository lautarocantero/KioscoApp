import type { NotificationEntity } from "./notificationTypes";
import type { NotificationFilterEnum, NotificationStatusEnum } from "./notificationEnums";

export interface NotificationsDropdownProps {
    anchorEl:                 HTMLElement | null;
    open:                     boolean;
    importantNotifications:   NotificationEntity[];
    alertNotifications:       NotificationEntity[];
    unreadCount:              number;
    loading:                  boolean;
    onClose:                  () => void;
    onToggleRead:             (_id: string, currentStatus: NotificationStatusEnum) => void;
    onGoToDetail:             (notification: NotificationEntity) => void;
    onMarkAllAsRead:          () => void;
    onViewAll:                () => void;
}

export interface NotificationsDropdownSectionProps {
    title:         string;
    emptyMessage:  string;
    notifications: NotificationEntity[];
    onToggleRead:  (_id: string, currentStatus: NotificationStatusEnum) => void;
    onGoToDetail:  (notification: NotificationEntity) => void;
}

export interface NotificationListItemProps {
    notification: NotificationEntity;
    onToggleRead: (_id: string, currentStatus: NotificationStatusEnum) => void;
    onGoToDetail: (notification: NotificationEntity) => void;
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
