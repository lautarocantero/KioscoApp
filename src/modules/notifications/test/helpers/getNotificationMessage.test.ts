import { describe, expect, it } from "vitest";
import i18n from "@i18n/i18n";
import { getNotificationMessage } from "../../helpers/getNotificationMessage";
import { NotificationStatusEnum, NotificationTypeEnum } from "@typings/notifications/notificationEnums";
import type { NotificationEntity } from "@typings/notifications/notificationTypes";

describe("getNotificationMessage", () => {
    it("arma título y subtítulo para una notificación de stock bajo", () => {
        const notification: NotificationEntity = {
            _id: "1",
            type: NotificationTypeEnum.LowStock,
            status: NotificationStatusEnum.NotReadYet,
            createdAt: new Date().toISOString(),
            payload: { presentationId: "p1", productId: "prod-1", productName: "Fideo Matarazzo 500g", units: 5, minStock: 20 },
        };

        const { title, subtitle } = getNotificationMessage(notification, i18n.t);

        expect(title).toBe("Fideo Matarazzo 500g necesita reposición (5 unidades)");
        expect(subtitle).toBe("El stock actual (5) está por debajo del mínimo establecido (20).");
    });

    it("arma título y subtítulo para una notificación de venta, formateando el monto en moneda", () => {
        const notification: NotificationEntity = {
            _id: "2",
            type: NotificationTypeEnum.Sale,
            status: NotificationStatusEnum.NotReadYet,
            createdAt: new Date().toISOString(),
            payload: { sellId: "sell-1", sellerId: "s1", sellerName: "Lucas Cantero", amount: 2530, currency: "ARS" },
        };

        const { title, subtitle } = getNotificationMessage(notification, i18n.t);

        expect(title).toContain("Lucas Cantero ha realizado una venta por");
        expect(title).toContain("2.530,00");
        expect(subtitle).toBe("Venta registrada en el punto de venta.");
    });
});
