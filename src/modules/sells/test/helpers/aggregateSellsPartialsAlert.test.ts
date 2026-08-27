import { describe, expect, it } from "vitest";
import { SellStatusEnum } from "@typings/sells/sellsEnum";
import type { SellTicketType } from "@typings/sells/sellTypes";
import { aggregateSellsPartialsAlert } from "../../helpers/aggregateSellsPartialsAlert";

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

const NOW = new Date(2026, 7, 27);

describe("aggregateSellsPartialsAlert", () => {
    it("sin parciales: count 0, sin antigüedad", () => {
        const sells = [buildSell({ status: SellStatusEnum.Completada })];
        expect(aggregateSellsPartialsAlert(sells, NOW)).toEqual({ count: 0, totalAmount: 0, oldestDebtDays: null });
    });

    it("ignora parciales ya saldadas (settled_by_sell_id no nulo)", () => {
        const sells = [
            buildSell({ status: SellStatusEnum.Parcial, settled_by_sell_id: "settlement-1", total_amount: 1000, amount_paid: 400 }),
        ];
        expect(aggregateSellsPartialsAlert(sells, NOW)).toEqual({ count: 0, totalAmount: 0, oldestDebtDays: null });
    });

    it("suma el saldo pendiente (total - pagado) de las parciales sin saldar y la antigüedad de la más vieja", () => {
        const sells = [
            buildSell({
                _id: "recent",
                status: SellStatusEnum.Parcial,
                settled_by_sell_id: null,
                total_amount: 1000,
                amount_paid: 700,
                purchase_date: new Date(2026, 7, 20).toISOString(),
            }),
            buildSell({
                _id: "oldest",
                status: SellStatusEnum.Parcial,
                settled_by_sell_id: null,
                total_amount: 500,
                amount_paid: 100,
                purchase_date: new Date(2026, 7, 4).toISOString(),
            }),
        ];

        const result = aggregateSellsPartialsAlert(sells, NOW);

        expect(result.count).toBe(2);
        expect(result.totalAmount).toBe(300 + 400);
        expect(result.oldestDebtDays).toBe(23);
    });

    it("trata amount_paid null como 0 al calcular el saldo pendiente", () => {
        const sells = [
            buildSell({ status: SellStatusEnum.Parcial, settled_by_sell_id: null, total_amount: 200, amount_paid: null }),
        ];

        expect(aggregateSellsPartialsAlert(sells, NOW).totalAmount).toBe(200);
    });
});
