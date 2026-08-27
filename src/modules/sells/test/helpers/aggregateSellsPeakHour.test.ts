import { describe, expect, it } from "vitest";
import { SellStatusEnum } from "@typings/sells/sellsEnum";
import type { SellTicketType } from "@typings/sells/sellTypes";
import { aggregateSellsPeakHour } from "../../helpers/aggregateSellsPeakHour";

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

const atHour = (hour: number, minute = 0): string => new Date(2026, 7, 15, hour, minute).toISOString();

describe("aggregateSellsPeakHour", () => {
    it("sin ventas: null", () => {
        expect(aggregateSellsPeakHour([])).toBeNull();
    });

    it("agrupa en franjas de 2 horas y devuelve la de más tickets", () => {
        const sells = [
            buildSell({ purchase_date: atHour(18, 10) }),
            buildSell({ purchase_date: atHour(18, 40) }),
            buildSell({ purchase_date: atHour(19, 20) }),
            buildSell({ purchase_date: atHour(10, 0) }),
        ];

        expect(aggregateSellsPeakHour(sells)).toEqual({ startHour: 18, endHour: 20, ticketSharePct: 75 });
    });
});
