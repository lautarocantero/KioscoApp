import type { TFunction } from "i18next";
import type { NotificationEntity } from "@typings/notifications/notificationTypes";
import { NotificationTypeEnum } from "@typings/notifications/notificationEnums";

// Etiqueta del tooltip/aria-label de la flecha "ver detalle": distinta según
// a dónde apunte (venta o presentación), en vez de un genérico "Ver detalle".
export const getGoToDetailLabel = (notification: NotificationEntity, t: TFunction): string =>
    notification.type === NotificationTypeEnum.Sale
        ? t("notifications.actions.viewSale")
        : t("notifications.actions.viewPresentation");
