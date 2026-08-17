import { describe, expect, it } from "vitest";
import { getNotificationFilterCounts } from "../../helpers/getNotificationFilterCounts";
import { NotificationFilterEnum, NotificationStatusEnum, NotificationTypeEnum } from "@typings/notifications/notificationEnums";
import type { NotificationEntity } from "@typings/notifications/notificationTypes";

const buildNotification = (overrides: Partial<NotificationEntity>): NotificationEntity => ({
    _id: "1",
    type: NotificationTypeEnum.Sale,
    status: NotificationStatusEnum.NotReadYet,
    createdAt: new Date().toISOString(),
    payload: { sellId: "sell-1", sellerId: "s1", sellerName: "Lucas", amount: 100, currency: "ARS" },
    ...overrides,
});

describe("getNotificationFilterCounts", () => {
    it("cuenta correctamente cada categoría", () => {
        const items: NotificationEntity[] = [
            buildNotification({ _id: "1", type: NotificationTypeEnum.Sale }),
            buildNotification({ _id: "2", type: NotificationTypeEnum.Sale }),
            buildNotification({ _id: "3", type: NotificationTypeEnum.LowStock, payload: { presentationId: "p1", productId: "prod-1", productName: "Fideo", units: 1, minStock: 5 } }),
        ];

        const counts = getNotificationFilterCounts(items);

        expect(counts[NotificationFilterEnum.All]).toBe(3);
        expect(counts[NotificationFilterEnum.News]).toBe(2);
        expect(counts[NotificationFilterEnum.Alerts]).toBe(1);
    });

    it("devuelve ceros para una lista vacía", () => {
        const counts = getNotificationFilterCounts([]);

        expect(counts[NotificationFilterEnum.All]).toBe(0);
        expect(counts[NotificationFilterEnum.News]).toBe(0);
        expect(counts[NotificationFilterEnum.Alerts]).toBe(0);
    });
});
