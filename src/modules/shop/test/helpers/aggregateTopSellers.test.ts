import { describe, it, expect } from "vitest";
import type { SellTicketType } from "@typings/sells/sellTypes";
import type { Seller } from "@typings/seller/sellerTypes";
import { SellerStatus } from "@typings/seller/sellerEnums";
import { aggregateTopSellers } from "../../helpers/aggregateTopSellers";

const sell = (sellerId: string, sellerName: string, total: number, monthsAgo = 0): SellTicketType => {
    const date = new Date();
    date.setMonth(date.getMonth() - monthsAgo);

    return {
        _id: `${sellerId}-${total}-${monthsAgo}`,
        currency: "ars",
        iva: 0,
        modification_date: null,
        payment_method: "cash" as SellTicketType["payment_method"],
        products: [],
        purchase_date: date.toISOString(),
        seller_id: sellerId,
        seller_name: sellerName,
        sub_total: total,
        total_amount: total,
        status: "completada" as SellTicketType["status"],
        amount_paid: null,
        debtor_name: null,
    };
};

const seller = (id: string, user_status: SellerStatus): Seller => ({
    _id: id,
    name: `Vendedor ${id}`,
    profilePhoto: null,
    created_at: new Date().toISOString(),
    user_status,
});

describe("aggregateTopSellers", () => {
    it("agrupa ventas del mes en curso por vendedor y suma montos/pedidos", () => {
        const sells = [
            sell("1", "Ana", 1000),
            sell("1", "Ana", 500),
            sell("2", "Beto", 200),
        ];
        const sellers = [seller("1", SellerStatus.Online), seller("2", SellerStatus.Offline)];

        const result = aggregateTopSellers(sells, sellers, 5);

        expect(result).toEqual([
            { sellerId: "1", sellerName: "Ana", totalAmount: 1500, ordersCount: 2, status: SellerStatus.Online },
            { sellerId: "2", sellerName: "Beto", totalAmount: 200, ordersCount: 1, status: SellerStatus.Offline },
        ]);
    });

    it("excluye ventas de meses anteriores", () => {
        const sells = [sell("1", "Ana", 1000, 1)];
        const result = aggregateTopSellers(sells, [seller("1", SellerStatus.Online)], 5);

        expect(result).toEqual([]);
    });

    it("ordena de mayor a menor monto y respeta el límite", () => {
        const sells = [sell("1", "Ana", 100), sell("2", "Beto", 900), sell("3", "Caro", 500)];
        const result = aggregateTopSellers(sells, [], 2);

        expect(result.map((r) => r.sellerId)).toEqual(["2", "3"]);
    });

    it("usa Offline por defecto si el vendedor ya no está en la lista", () => {
        const result = aggregateTopSellers([sell("1", "Ana", 100)], [], 5);

        expect(result[0].status).toBe(SellerStatus.Offline);
    });
});
