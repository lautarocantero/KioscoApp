import { describe, expect, it } from "vitest";
import { filterNotificationsBySearch } from "../../helpers/filterNotificationsBySearch";
import { NotificationStatusEnum, NotificationTypeEnum } from "@typings/notifications/notificationEnums";
import type { NotificationEntity } from "@typings/notifications/notificationTypes";

const t = ((key: string, options?: Record<string, unknown>) => {
    if (key === "notifications.messages.sale") return `${options?.sellerName} realizó una venta`;
    if (key === "notifications.messages.saleDetail") return "Venta registrada en el punto de venta.";
    if (key === "notifications.messages.lowStock") return `${options?.productName} necesita reposición`;
    if (key === "notifications.messages.lowStockDetail") return "Stock por debajo del mínimo.";
    return key;
}) as unknown as Parameters<typeof filterNotificationsBySearch>[2];

const buildNotification = (overrides: Partial<NotificationEntity>): NotificationEntity => ({
    _id: "1",
    type: NotificationTypeEnum.Sale,
    status: NotificationStatusEnum.NotReadYet,
    createdAt: new Date().toISOString(),
    payload: { sellId: "sell-1", sellerId: "s1", sellerName: "Lucas", amount: 100, currency: "ARS" },
    ...overrides,
});

describe("filterNotificationsBySearch", () => {
    const items: NotificationEntity[] = [
        buildNotification({ _id: "1", payload: { sellId: "sell-1", sellerId: "s1", sellerName: "Lucas", amount: 100, currency: "ARS" } }),
        buildNotification({
            _id: "2",
            type: NotificationTypeEnum.LowStock,
            payload: { presentationId: "p1", productId: "prod-1", productName: "Fideo", units: 1, minStock: 5 },
        }),
    ];

    it("devuelve todos los items cuando el término de búsqueda está vacío", () => {
        expect(filterNotificationsBySearch(items, "  ", t)).toHaveLength(2);
    });

    it("filtra por coincidencia parcial y sin distinguir mayúsculas", () => {
        const result = filterNotificationsBySearch(items, "lucas", t);
        expect(result.map((item) => item._id)).toEqual(["1"]);
    });

    it("no devuelve resultados si ningún item coincide", () => {
        expect(filterNotificationsBySearch(items, "inexistente", t)).toHaveLength(0);
    });
});
