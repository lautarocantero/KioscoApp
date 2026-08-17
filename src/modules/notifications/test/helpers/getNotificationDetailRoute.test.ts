import { describe, expect, it } from "vitest";
import { getNotificationDetailRoute } from "../../helpers/getNotificationDetailRoute";
import { NotificationStatusEnum, NotificationTypeEnum } from "@typings/notifications/notificationEnums";
import type { NotificationEntity } from "@typings/notifications/notificationTypes";

describe("getNotificationDetailRoute", () => {
    it("apunta al detalle de la venta para una notificación de venta", () => {
        const notification: NotificationEntity = {
            _id: "1",
            type: NotificationTypeEnum.Sale,
            status: NotificationStatusEnum.NotReadYet,
            createdAt: new Date().toISOString(),
            payload: { sellId: "sell-1", sellerId: "s1", sellerName: "Lucas", amount: 100, currency: "ARS" },
        };

        expect(getNotificationDetailRoute(notification)).toBe("/sell/sell-1");
    });

    it("apunta al detalle de la presentación para una notificación de stock bajo", () => {
        const notification: NotificationEntity = {
            _id: "2",
            type: NotificationTypeEnum.LowStock,
            status: NotificationStatusEnum.NotReadYet,
            createdAt: new Date().toISOString(),
            payload: { presentationId: "p1", productId: "prod-1", productName: "Fideo", units: 1, minStock: 5 },
        };

        expect(getNotificationDetailRoute(notification)).toBe("/products/prod-1/presentation/p1");
    });
});
