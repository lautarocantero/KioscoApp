import { describe, expect, it } from "vitest";
import { filterSellsByStatus } from "../../helpers/filterSellsByStatus";
import { SellFilterEnum, SellStatusEnum } from "@typings/sells/sellsEnum";
import type { SellTicketType } from "@typings/sells/sellTypes";

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
    ...overrides,
} as SellTicketType);

describe("filterSellsByStatus", () => {
    const sells: SellTicketType[] = [
        buildSell({ _id: "1", status: SellStatusEnum.Completada }),
        buildSell({ _id: "2", status: SellStatusEnum.Parcial }),
    ];

    it("devuelve todas las ventas para el filtro 'all'", () => {
        expect(filterSellsByStatus(sells, SellFilterEnum.All)).toHaveLength(2);
    });

    it("filtra por estado completada", () => {
        const result = filterSellsByStatus(sells, SellFilterEnum.Completada);
        expect(result.map((sell) => sell._id)).toEqual(["1"]);
    });

    it("filtra por estado parcial", () => {
        const result = filterSellsByStatus(sells, SellFilterEnum.Parcial);
        expect(result.map((sell) => sell._id)).toEqual(["2"]);
    });
});
