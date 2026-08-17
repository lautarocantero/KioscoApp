import type {
    LowStockNotificationPayload,
    NotificationEntity,
    SaleNotificationPayload,
} from "@typings/notifications/notificationTypes";
import { NotificationTypeEnum } from "@typings/notifications/notificationEnums";

// Ruta de detalle a la que apunta la flecha de cada notificación: la venta
// que la generó, o la presentación cuyo stock quedó por debajo del mínimo.
export const getNotificationDetailRoute = (notification: NotificationEntity): string => {
    if (notification.type === NotificationTypeEnum.Sale) {
        const { sellId } = notification.payload as SaleNotificationPayload;
        return `/sell/${sellId}`;
    }

    const { productId, presentationId } = notification.payload as LowStockNotificationPayload;
    return `/products/${productId}/presentation/${presentationId}`;
};
