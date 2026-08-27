import type { SellTicketType } from "@typings/sells/sellTypes";
import type { PaymentMethod } from "@typings/sells/sellsEnum";
import type { SellsDominantPaymentMethodFact } from "@typings/sells/types";

// Medio de pago con más ventas del período, y qué porción del total
// representa (p. ej. "Efectivo · 52% de las ventas").
export const aggregateSellsDominantPaymentMethod = (sells: SellTicketType[]): SellsDominantPaymentMethodFact => {
    if (sells.length === 0) return null;

    const counts = new Map<PaymentMethod, number>();
    sells.forEach((sell) => counts.set(sell.payment_method, (counts.get(sell.payment_method) ?? 0) + 1));

    let dominantMethod: PaymentMethod = sells[0].payment_method;
    let dominantCount = 0;

    counts.forEach((count, method) => {
        if (count <= dominantCount) return;
        dominantCount = count;
        dominantMethod = method;
    });

    return { method: dominantMethod, sharePct: (dominantCount / sells.length) * 100 };
};
