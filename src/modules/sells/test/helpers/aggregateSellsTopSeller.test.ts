import { describe, expect, it } from "vitest";
import { SellStatusEnum } from "@typings/sells/sellsEnum";
import type { SellTicketType } from "@typings/sells/sellTypes";
import { aggregateSellsTopSeller } from "../../helpers/aggregateSellsTopSeller";

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

describe("aggregateSellsTopSeller", () => {
    it("sin ventas: null", () => {
        expect(aggregateSellsTopSeller([])).toBeNull();
    });

    it("devuelve el vendedor con más MONTO vendido, no más tickets", () => {
        const sells = [
            buildSell({ seller_name: "Ana", total_amount: 100 }),
            buildSell({ seller_name: "Ana", total_amount: 100 }),
            buildSell({ seller_name: "Ana", total_amount: 100 }),
            buildSell({ seller_name: "Beto", total_amount: 500 }),
        ];

        expect(aggregateSellsTopSeller(sells)).toEqual({ sellerName: "Beto", totalAmount: 500 });
    });
});
