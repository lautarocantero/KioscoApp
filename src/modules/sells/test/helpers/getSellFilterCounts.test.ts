import { describe, expect, it } from "vitest";
import { getSellFilterCounts } from "../../helpers/getSellFilterCounts";
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

describe("getSellFilterCounts", () => {
    const sells: SellTicketType[] = [
        buildSell({ _id: "1", status: SellStatusEnum.Completada }),
        buildSell({ _id: "2", status: SellStatusEnum.Completada }),
        buildSell({ _id: "3", status: SellStatusEnum.Parcial }),
    ];

    it("cuenta el total de ventas para 'all'", () => {
        expect(getSellFilterCounts(sells)[SellFilterEnum.All]).toBe(3);
    });

    it("cuenta las ventas completadas", () => {
        expect(getSellFilterCounts(sells)[SellFilterEnum.Completada]).toBe(2);
    });

    it("cuenta las ventas parciales", () => {
        expect(getSellFilterCounts(sells)[SellFilterEnum.Parcial]).toBe(1);
    });
});
