import { describe, it, expect } from "vitest";
import type { SellTicketType } from "@typings/sells/sellTypes";
import type { Seller } from "@typings/seller/sellerTypes";
import { SellerStatus } from "@typings/seller/sellerEnums";
import { aggregateActiveSellersToday } from "../../helpers/aggregateActiveSellersToday";

const seller = (id: string, name: string, status: SellerStatus): Seller => ({
    _id: id,
    name,
    profilePhoto: null,
    created_at: new Date().toISOString(),
    user_status: status,
});

const sell = (seller_id: string, total_amount: number): SellTicketType => ({
    _id: seller_id + total_amount,
    currency: "ars",
    iva: 0,
    modification_date: null,
    payment_method: "cash" as SellTicketType["payment_method"],
    products: [],
    purchase_date: new Date().toISOString(),
    seller_id,
    seller_name: "Vendedor",
    sub_total: total_amount,
    total_amount,
    status: "completada" as SellTicketType["status"],
    amount_paid: null,
    debtor_name: null,
    settles_sell_id: null,
    settled_by_sell_id: null,
});

describe("aggregateActiveSellersToday", () => {
    it("solo incluye vendedores online", () => {
        const sellers = [seller("s1", "Ana", SellerStatus.Online), seller("s2", "Beto", SellerStatus.Offline)];

        const result = aggregateActiveSellersToday([], sellers);

        expect(result).toHaveLength(1);
        expect(result[0].sellerId).toBe("s1");
    });

    it("suma las ventas de hoy de cada vendedor online (0 si todavía no vendió)", () => {
        const sellers = [seller("s1", "Ana", SellerStatus.Online), seller("s2", "Beto", SellerStatus.Online)];
        const sells = [sell("s1", 500), sell("s1", 300)];

        const result = aggregateActiveSellersToday(sells, sellers);

        const ana = result.find((s) => s.sellerId === "s1");
        const beto = result.find((s) => s.sellerId === "s2");

        expect(ana).toMatchObject({ totalAmount: 800, ordersCount: 2 });
        expect(beto).toMatchObject({ totalAmount: 0, ordersCount: 0 });
    });

    it("ordena de mayor a menor monto vendido hoy", () => {
        const sellers = [seller("s1", "Ana", SellerStatus.Online), seller("s2", "Beto", SellerStatus.Online)];
        const sells = [sell("s1", 100), sell("s2", 900)];

        const result = aggregateActiveSellersToday(sells, sellers);

        expect(result.map((s) => s.sellerId)).toEqual(["s2", "s1"]);
    });
});
