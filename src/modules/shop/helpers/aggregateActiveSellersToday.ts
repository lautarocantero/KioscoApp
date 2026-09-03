import type { ActiveSellerSummary } from "@typings/shop/shopTypes";
import type { SellTicketType } from "@typings/sells/sellTypes";
import type { Seller } from "@typings/seller/sellerTypes";
import { SellerStatus } from "@typings/seller/sellerEnums";

interface SellerTotals {
    totalAmount: number;
    ordersCount: number;
}

// "En el mostrador ahora": vendedores online en este momento (estado real
// de useSellersListData), con lo que vendieron HOY (0 si todavía no
// vendieron nada en su turno). A diferencia de aggregateTopSellers (top
// del mes, ranking), acá se listan TODOS los online, no solo los que más
// vendieron.
export const aggregateActiveSellersToday = (todaySells: SellTicketType[], sellers: Seller[]): ActiveSellerSummary[] => {
    const totalsBySellerId = new Map<string, SellerTotals>();

    todaySells.forEach((sell) => {
        const current = totalsBySellerId.get(sell.seller_id);
        if (!current) {
            totalsBySellerId.set(sell.seller_id, { totalAmount: sell.total_amount, ordersCount: 1 });
            return;
        }
        current.totalAmount += sell.total_amount;
        current.ordersCount += 1;
    });

    return sellers
        .filter((seller) => seller.user_status === SellerStatus.Online)
        .map((seller) => {
            const totals = totalsBySellerId.get(seller._id);
            return {
                sellerId: seller._id,
                sellerName: seller.name,
                status: seller.user_status,
                totalAmount: totals?.totalAmount ?? 0,
                ordersCount: totals?.ordersCount ?? 0,
            };
        })
        .sort((a, b) => b.totalAmount - a.totalAmount);
};
