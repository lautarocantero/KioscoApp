import { describe, expect, it } from "vitest";
import { SellStatusEnum } from "@typings/sells/sellsEnum";
import type { SellTicketType } from "@typings/sells/sellTypes";
import { filterSellsByPeriodRange } from "../../helpers/filterSellsByPeriodRange";

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

describe("filterSellsByPeriodRange", () => {
    const from = new Date(2026, 7, 10);
    const to = new Date(2026, 7, 15, 23, 59, 59, 999);

    it("incluye ventas dentro del rango (bordes inclusive)", () => {
        const sells = [
            buildSell({ _id: "in-start", purchase_date: new Date(2026, 7, 10, 0, 0).toISOString() }),
            buildSell({ _id: "in-end", purchase_date: new Date(2026, 7, 15, 23, 0).toISOString() }),
        ];

        expect(filterSellsByPeriodRange(sells, from, to).map((s) => s._id)).toEqual(["in-start", "in-end"]);
    });

    it("excluye ventas fuera del rango", () => {
        const sells = [
            buildSell({ _id: "before", purchase_date: new Date(2026, 7, 9, 23, 59).toISOString() }),
            buildSell({ _id: "after", purchase_date: new Date(2026, 7, 16, 0, 1).toISOString() }),
        ];

        expect(filterSellsByPeriodRange(sells, from, to)).toEqual([]);
    });
});
