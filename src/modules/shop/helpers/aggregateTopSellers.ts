import type { TopSellerSummary } from "@typings/shop/shopTypes";
import type { SellTicketType } from "@typings/sells/sellTypes";
import type { Seller } from "@typings/seller/sellerTypes";
import { SellerStatus } from "@typings/seller/sellerEnums";

const isSameMonth = (isoDate: string, reference: Date): boolean => {
    const date = new Date(isoDate);
    return date.getFullYear() === reference.getFullYear() && date.getMonth() === reference.getMonth();
};

interface SellerTotals {
    sellerName: string;
    totalAmount: number;
    ordersCount: number;
}

// Rankea vendedores por ventas del mes en curso, agregando las ventas reales
// (`sells`) por `seller_id`. `isOnline` se cruza con la lista de vendedores.
export const aggregateTopSellers = (
    sells: SellTicketType[],
    sellers: Seller[],
    limit: number,
): TopSellerSummary[] => {
    const now = new Date();
    const totalsBySellerId = new Map<string, SellerTotals>();

    sells
        .filter((sell) => isSameMonth(sell.purchase_date, now))
        .forEach((sell) => {
            const current = totalsBySellerId.get(sell.seller_id);
            if (!current) {
                totalsBySellerId.set(sell.seller_id, {
                    sellerName: sell.seller_name,
                    totalAmount: sell.total_amount,
                    ordersCount: 1,
                });
                return;
            }
            current.totalAmount += sell.total_amount;
            current.ordersCount += 1;
        });

    const statusBySellerId = new Map(sellers.map((seller) => [seller._id, seller.user_status]));

    return Array.from(totalsBySellerId.entries())
        .map(([sellerId, totals]) => ({
            sellerId,
            sellerName: totals.sellerName,
            totalAmount: totals.totalAmount,
            ordersCount: totals.ordersCount,
            status: statusBySellerId.get(sellerId) ?? SellerStatus.Offline,
        }))
        .sort((a, b) => b.totalAmount - a.totalAmount)
        .slice(0, limit);
};
