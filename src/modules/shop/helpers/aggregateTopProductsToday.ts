import type { TopProductSummary } from "@typings/shop/shopTypes";
import type { SellTicketType } from "@typings/sells/sellTypes";

const DEFAULT_LIMIT = 5;

// `amount` = price * stock_required (mismo cálculo que ya usa
// createPdfTicket para la boleta): el ticket persistido no guarda un
// subtotal con descuento por línea, así que es el único monto real
// disponible por producto.
export const aggregateTopProductsToday = (todaySells: SellTicketType[], limit = DEFAULT_LIMIT): TopProductSummary[] => {
    const totalsByProductId = new Map<string, TopProductSummary>();

    todaySells.forEach((sell) => {
        sell.products.forEach((product) => {
            const amount = product.price * product.stock_required;
            const current = totalsByProductId.get(product._id);

            if (!current) {
                totalsByProductId.set(product._id, {
                    productId: product._id,
                    name: product.name,
                    quantity: product.stock_required,
                    amount,
                });
                return;
            }

            current.quantity += product.stock_required;
            current.amount += amount;
        });
    });

    return Array.from(totalsByProductId.values())
        .sort((a, b) => b.amount - a.amount)
        .slice(0, limit);
};
