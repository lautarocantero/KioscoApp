import type { SellTicketType } from "@typings/sells/sellTypes";
import type { SellsTopSellerFact } from "@typings/sells/types";

// Vendedor con más monto vendido en el período (no cantidad de tickets).
export const aggregateSellsTopSeller = (sells: SellTicketType[]): SellsTopSellerFact => {
    if (sells.length === 0) return null;

    const totalsByName = new Map<string, number>();
    sells.forEach((sell) => totalsByName.set(sell.seller_name, (totalsByName.get(sell.seller_name) ?? 0) + sell.total_amount));

    let topName = sells[0].seller_name;
    let topAmount = 0;

    totalsByName.forEach((amount, name) => {
        if (amount <= topAmount) return;
        topAmount = amount;
        topName = name;
    });

    return { sellerName: topName, totalAmount: topAmount };
};
