import { describe, it, expect } from "vitest";
import type { SellTicketType } from "@typings/sells/sellTypes";
import { aggregateSellsByDay } from "../../helpers/aggregateSellsByDay";

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
});

// Ancla a mediodía local de hoy (no "ahora - N horas") para que restar
// minutos nunca cruce la medianoche y el test sea flaky según la hora
// en que corra la suite.
const isoToday = (minutesAgo = 0): string => {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setMinutes(date.getMinutes() - minutesAgo);
    return date.toISOString();
};

describe("aggregateSellsByDay", () => {
    it("devuelve un array vacío si days es 0 o negativo", () => {
        expect(aggregateSellsByDay([], 0)).toEqual([]);
        expect(aggregateSellsByDay([], -3)).toEqual([]);
    });

    it("arma una serie continua de N días aunque no haya ventas", () => {
        const points = aggregateSellsByDay([], 7);

        expect(points).toHaveLength(7);
        expect(points.every((point) => point.total === 0)).toBe(true);
    });

    it("suma total_amount de las ventas reales en el día correspondiente (hoy)", () => {
        const sells = [sell(isoToday(1), 1000), sell(isoToday(2), 500)];
        const points = aggregateSellsByDay(sells, 7);

        const today = points[points.length - 1];
        expect(today.total).toBe(1500);
    });

    it("no mezcla ventas de días distintos", () => {
        const eightDaysAgo = new Date();
        eightDaysAgo.setDate(eightDaysAgo.getDate() - 8);

        const sells = [sell(eightDaysAgo.toISOString(), 9999), sell(isoToday(), 100)];
        const points = aggregateSellsByDay(sells, 7);

        const totalInRange = points.reduce((sum, p) => sum + p.total, 0);
        expect(totalInRange).toBe(100);
    });
});
