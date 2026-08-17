import type { TFunction } from "i18next";
import type {
    LowStockNotificationPayload,
    NotificationEntity,
    NotificationMessage,
    SaleNotificationPayload,
} from "@typings/notifications/notificationTypes";
import { NotificationTypeEnum } from "@typings/notifications/notificationEnums";
import { formatCurrency } from "../../cart/helpers/formatCurrency";

// Arma el título/subtítulo cortos de una notificación vía i18n. Se comparte
// entre el item del dropdown de la campana y la columna de la tabla de
// /notifications para no duplicar el armado del mensaje en dos lugares.
export const getNotificationMessage = (notification: NotificationEntity, t: TFunction): NotificationMessage => {
    if (notification.type === NotificationTypeEnum.LowStock) {
        const { productName, units, minStock } = notification.payload as LowStockNotificationPayload;
        return {
            title: t("notifications.messages.lowStock", { productName, units }),
            subtitle: t("notifications.messages.lowStockDetail", { units, minStock }),
        };
    }

    const { sellerName, amount } = notification.payload as SaleNotificationPayload;
    return {
        title: t("notifications.messages.sale", { sellerName, amount: formatCurrency(amount) }),
        subtitle: t("notifications.messages.saleDetail"),
    };
};
