import { describe, expect, it } from "vitest";
import { PaymentMethod, SellStatusEnum } from "@typings/sells/sellsEnum";
import type { SellTicketType } from "@typings/sells/sellTypes";
import { aggregateSellsDominantPaymentMethod } from "../../helpers/aggregateSellsDominantPaymentMethod";

const buildSell = (overrides: Partial<SellTicketType>): SellTicketType => ({
    _id: "1",
    currency: "ars",
    iva: 0,
    modification_date: null,
    payment_method: PaymentMethod.Cash,
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

describe("aggregateSellsDominantPaymentMethod", () => {
    it("sin ventas: null", () => {
        expect(aggregateSellsDominantPaymentMethod([])).toBeNull();
    });

    it("devuelve el medio con más ventas y su porcentaje del total", () => {
        const sells = [
            buildSell({ payment_method: PaymentMethod.Cash }),
            buildSell({ payment_method: PaymentMethod.Cash }),
            buildSell({ payment_method: PaymentMethod.Credit }),
        ];

        expect(aggregateSellsDominantPaymentMethod(sells)).toEqual({
            method: PaymentMethod.Cash,
            sharePct: (2 / 3) * 100,
        });
    });
});
