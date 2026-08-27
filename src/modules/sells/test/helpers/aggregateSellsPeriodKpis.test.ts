import { describe, expect, it } from "vitest";
import { SellStatusEnum } from "@typings/sells/sellsEnum";
import type { SellTicketType } from "@typings/sells/sellTypes";
import type { SellsPeriodRange } from "@typings/sells/types";
import { aggregateSellsPeriodKpis } from "../../helpers/aggregateSellsPeriodKpis";

const buildSell = (overrides: Partial<SellTicketType>): SellTicketType => ({
    _id: "1",
    currency: "ars",
    iva: 0,
    modification_date: null,
    payment_method: "cash",
    products: [],
    purchase_date: new Date().toISOString(),
    seller_id: "seller-1",
    seller_name: "Lucas",
    sub_total: 100,
    total_amount: 100,
    status: SellStatusEnum.Completada,
    amount_paid: null,
    debtor_name: null,
    settles_sell_id: null,
    settled_by_sell_id: null,
    ...overrides,
} as SellTicketType);

const range: SellsPeriodRange = {
    from: new Date(2026, 7, 9),
    to: new Date(2026, 7, 15, 23, 59, 59, 999),
    compareFrom: new Date(2026, 7, 2),
    compareTo: new Date(2026, 7, 8, 23, 59, 59, 999),
};

describe("aggregateSellsPeriodKpis", () => {
    it("sin ventas: todos los KPIs en 0, sin variación (previousValue 0 y value 0 => 0%)", () => {
        const kpis = aggregateSellsPeriodKpis([], range);

        expect(kpis.sales).toEqual({ value: 0, previousValue: 0, variationPct: 0, trend: "flat" });
        expect(kpis.ticketsCount.value).toBe(0);
        expect(kpis.productsPerTicket).toBe(0);
    });

    it("suma ventas del período actual y calcula variación contra el período de comparación", () => {
        const sells = [
            buildSell({ _id: "cur-1", purchase_date: new Date(2026, 7, 12).toISOString(), total_amount: 600 }),
            buildSell({ _id: "cur-2", purchase_date: new Date(2026, 7, 13).toISOString(), total_amount: 400 }),
            buildSell({ _id: "prev-1", purchase_date: new Date(2026, 7, 5).toISOString(), total_amount: 500 }),
        ];

        const kpis = aggregateSellsPeriodKpis(sells, range);

        expect(kpis.sales.value).toBe(1000);
        expect(kpis.sales.previousValue).toBe(500);
        expect(kpis.sales.variationPct).toBe(100);
        expect(kpis.sales.trend).toBe("up");
        expect(kpis.ticketsCount.value).toBe(2);
        expect(kpis.averageTicket.value).toBe(500);
    });

    it("ventas actuales sin ventas previas: variación null (no hay base de comparación)", () => {
        const sells = [buildSell({ purchase_date: new Date(2026, 7, 12).toISOString(), total_amount: 300 })];

        const kpis = aggregateSellsPeriodKpis(sells, range);

        expect(kpis.sales.variationPct).toBeNull();
        expect(kpis.sales.trend).toBe("up");
    });

    it("productsPerTicket promedia las unidades vendidas (stock_required) por ticket", () => {
        const sells = [
            buildSell({
                purchase_date: new Date(2026, 7, 12).toISOString(),
                products: [
                    { stock_required: 2 } as SellTicketType["products"][number],
                    { stock_required: 3 } as SellTicketType["products"][number],
                ],
            }),
            buildSell({
                purchase_date: new Date(2026, 7, 13).toISOString(),
                products: [{ stock_required: 1 } as SellTicketType["products"][number]],
            }),
        ];

        const kpis = aggregateSellsPeriodKpis(sells, range);

        expect(kpis.productsPerTicket).toBe(3);
    });
});
