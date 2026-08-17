import { describe, expect, it } from "vitest";
import { groupNotificationsByFilter } from "../../helpers/groupNotificationsByFilter";
import { NotificationFilterEnum, NotificationStatusEnum, NotificationTypeEnum } from "@typings/notifications/notificationEnums";
import type { NotificationEntity } from "@typings/notifications/notificationTypes";

const buildNotification = (overrides: Partial<NotificationEntity>): NotificationEntity => ({
    _id: "1",
    type: NotificationTypeEnum.Sale,
    status: NotificationStatusEnum.NotReadYet,
    createdAt: new Date().toISOString(),
    payload: { sellerId: "s1", sellerName: "Lucas", amount: 100, currency: "ARS" },
    ...overrides,
});

describe("groupNotificationsByFilter", () => {
    const items: NotificationEntity[] = [
        buildNotification({ _id: "1", type: NotificationTypeEnum.Sale }),
        buildNotification({ _id: "2", type: NotificationTypeEnum.LowStock, payload: { presentationId: "p1", productName: "Fideo", units: 1, minStock: 5 } }),
        buildNotification({ _id: "3", type: NotificationTypeEnum.LowStock, payload: { presentationId: "p2", productName: "Aceite", units: 2, minStock: 10 } }),
    ];

    it("devuelve todas las notificaciones para el filtro 'all'", () => {
        expect(groupNotificationsByFilter(items, NotificationFilterEnum.All)).toHaveLength(3);
    });

    it("devuelve solo las de venta para el filtro 'news'", () => {
        const result = groupNotificationsByFilter(items, NotificationFilterEnum.News);
        expect(result.map((item) => item._id)).toEqual(["1"]);
    });

    it("devuelve solo las de stock bajo para el filtro 'alerts'", () => {
        const result = groupNotificationsByFilter(items, NotificationFilterEnum.Alerts);
        expect(result.map((item) => item._id)).toEqual(["2", "3"]);
    });
});
