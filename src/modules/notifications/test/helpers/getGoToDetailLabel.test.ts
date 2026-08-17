import { describe, expect, it } from "vitest";
import i18n from "@i18n/i18n";
import { getGoToDetailLabel } from "../../helpers/getGoToDetailLabel";
import { NotificationStatusEnum, NotificationTypeEnum } from "@typings/notifications/notificationEnums";
import type { NotificationEntity } from "@typings/notifications/notificationTypes";

describe("getGoToDetailLabel", () => {
    it("devuelve 'Ver venta' para una notificación de venta", () => {
        const notification: NotificationEntity = {
            _id: "1",
            type: NotificationTypeEnum.Sale,
            status: NotificationStatusEnum.NotReadYet,
            createdAt: new Date().toISOString(),
            payload: { sellId: "sell-1", sellerId: "s1", sellerName: "Lucas", amount: 100, currency: "ARS" },
        };

        expect(getGoToDetailLabel(notification, i18n.t)).toBe("Ver venta");
    });

    it("devuelve 'Ver presentación' para una notificación de stock bajo", () => {
        const notification: NotificationEntity = {
            _id: "2",
            type: NotificationTypeEnum.LowStock,
            status: NotificationStatusEnum.NotReadYet,
            createdAt: new Date().toISOString(),
            payload: { presentationId: "p1", productId: "prod-1", productName: "Fideo", units: 1, minStock: 5 },
        };

        expect(getGoToDetailLabel(notification, i18n.t)).toBe("Ver presentación");
    });
});
