import type { SellTicketType } from "@typings/sells/sellTypes";
import { SellStatusEnum } from "@typings/sells/sellsEnum";
import type { SellsPartialsAlertSummary } from "@typings/sells/types";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

// Ventas parciales sin saldar, en TODO el historial (no sólo el período
// elegido): una deuda no deja de existir porque quedó fuera del rango de
// fechas de la banda. "settled_by_sell_id" null = todavía no se saldó.
export const aggregateSellsPartialsAlert = (sells: SellTicketType[], now: Date): SellsPartialsAlertSummary => {
    const unsettledPartials = sells.filter(
        (sell) => sell.status === SellStatusEnum.Parcial && sell.settled_by_sell_id === null
    );

    if (unsettledPartials.length === 0) {
        return { count: 0, totalAmount: 0, oldestDebtDays: null };
    }

    const totalAmount = unsettledPartials.reduce((sum, sell) => sum + (sell.total_amount - (sell.amount_paid ?? 0)), 0);
    const oldestPurchaseTime = Math.min(...unsettledPartials.map((sell) => new Date(sell.purchase_date).getTime()));
    const oldestDebtDays = Math.floor((now.getTime() - oldestPurchaseTime) / MS_PER_DAY);

    return { count: unsettledPartials.length, totalAmount, oldestDebtDays };
};
