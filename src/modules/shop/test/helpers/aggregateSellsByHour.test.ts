import { describe, it, expect } from "vitest";
import type { SellTicketType } from "@typings/sells/sellTypes";
import { aggregateSellsByHour } from "../../helpers/aggregateSellsByHour";

const sell = (purchase_date: string, total_amount: number): SellTicketType => ({
    _id: purchase_date + total_amount,
    currency: "ars",
    iva: 0,
    modification_date: null,
    payment_method: "cash" as SellTicketType["payment_method"],
    products: [],
    purchase_date,
    seller_id: "s1",
    seller_name: "Vendedor",
    sub_total: total_amount,
    total_amount,
    status: "completada" as SellTicketType["status"],
    amount_paid: null,
    debtor_name: null,
    settles_sell_id: null,
    settled_by_sell_id: null,
});

const atHour = (hour: number): string => {
    const date = new Date();
    date.setHours(hour, 0, 0, 0);
    return date.toISOString();
};

describe("aggregateSellsByHour", () => {
    it("arma una franja continua hasta la hora actual, con 0 en las horas sin ventas", () => {
        const now = new Date();
        now.setHours(10, 30, 0, 0);

        const points = aggregateSellsByHour([], now);

        expect(points[points.length - 1].hour).toBe(10);
        expect(points.every((point) => point.total === 0)).toBe(true);
    });

    it("suma total_amount de las ventas reales en su hora correspondiente", () => {
        const now = new Date();
        now.setHours(12, 15, 0, 0);

        const sells = [sell(atHour(10), 1000), sell(atHour(10), 500), sell(atHour(11), 300)];
        const points = aggregateSellsByHour(sells, now);

        expect(points.find((p) => p.hour === 10)?.total).toBe(1500);
        expect(points.find((p) => p.hour === 11)?.total).toBe(300);
        expect(points.find((p) => p.hour === 12)?.total).toBe(0);
    });

    it("no devuelve horas negativas cerca de la medianoche", () => {
        const now = new Date();
        now.setHours(1, 0, 0, 0);

        const points = aggregateSellsByHour([], now);

        expect(points.every((point) => point.hour >= 0)).toBe(true);
        expect(points[0].hour).toBe(0);
        expect(points[points.length - 1].hour).toBe(1);
    });
});
