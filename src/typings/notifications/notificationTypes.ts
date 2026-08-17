import type { GridColDef } from "@mui/x-data-grid";
import type { TFunction } from "i18next";
import type { NotificationFilterEnum, NotificationStatusEnum, NotificationTypeEnum } from "./notificationEnums";
import type { DeleteDialogState } from "@typings/ui/dialog.types";

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🔒 BASE PRINCIPAL 🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒                     ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface LowStockNotificationPayload {
    presentationId: string;
    productId:      string;
    productName:    string;
    units:          number;
    minStock:       number;
}

export interface SaleNotificationPayload {
    sellId:     string;
    sellerId:   string;
    sellerName: string;
    amount:     number;
    currency:   string;
}

export type NotificationPayload = LowStockNotificationPayload | SaleNotificationPayload;

export interface NotificationEntity {
    _id:       string;
    type:      NotificationTypeEnum;
    payload:   NotificationPayload;
    status:    NotificationStatusEnum;
    createdAt: string;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🍕 SLICE  🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface NotificationState {
    items:        NotificationEntity[];
    loading:      boolean;
    errorMessage: string | null;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🪝 HOOKS  🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface UseNotificationsDataReturn {
    items:   NotificationEntity[];
    loading: boolean;
    error:   string | null;
}

export interface UseNotificationsBellReturn {
    anchorEl:                HTMLElement | null;
    open:                    boolean;
    unreadCount:             number;
    importantNotifications:  NotificationEntity[];
    alertNotifications:      NotificationEntity[];
    loading:                 boolean;
    handleOpen:              (event: React.MouseEvent<HTMLElement>) => void;
    handleClose:             () => void;
    handleToggleRead:        (_id: string, currentStatus: NotificationStatusEnum) => void;
    handleGoToDetail:        (notification: NotificationEntity) => void;
    handleMarkAllAsRead:     () => void;
    handleViewAll:           () => void;
}

export interface UseNotificationsPageReturn {
    loading:                 boolean;
    error:                   string | null;
    clearError:              () => void;
    filter:                  NotificationFilterEnum;
    setFilter:               (filter: NotificationFilterEnum) => void;
    counts:                  Record<NotificationFilterEnum, number>;
    searchTerm:              string;
    setSearchTerm:           (searchTerm: string) => void;
    rows:                    NotificationEntity[];
    columns:                 GridColDef<NotificationEntity>[];
    deleteDialog:             DeleteDialogState;
    handleDeleteCancel:      () => void;
    handleDeleteConfirm:     () => Promise<void>;
    deleteAllDialogOpen:     boolean;
    handleDeleteAllRequest:  () => void;
    handleDeleteAllCancel:   () => void;
    handleDeleteAllConfirm:  () => Promise<void>;
    handleMarkAllAsRead:     () => void;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🗂️ COLUMNAS / MENSAJES  🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️           ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface NotificationMessage {
    title:    string;
    subtitle: string;
}

export interface BuildNotificationColumnsArgs {
    onDeleteRequest:   (id: string, name: string) => void;
    onToggleRead:      (id: string, currentStatus: NotificationStatusEnum) => void;
    onGoToDetail:      (notification: NotificationEntity) => void;
    t:                 TFunction;
}
