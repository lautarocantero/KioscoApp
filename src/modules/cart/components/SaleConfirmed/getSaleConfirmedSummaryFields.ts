import type { TicketSummaryType } from "@typings/sells/sellTypes";
import type { SaleConfirmedSummaryFields } from "@typings/cart/cartComponentTypes";
import { formatCurrency } from "../../helpers/formatCurrency";
import i18n from "@i18n/i18n";

export const getSaleConfirmedSummaryFields = (ticketSummary: TicketSummaryType): SaleConfirmedSummaryFields => ({
    formattedTotal: formatCurrency(ticketSummary.total),
    formattedChange: formatCurrency(ticketSummary.change),
    rows: [
        { id: "ticket", label: i18n.t("cart.orderConfirmed.summary.ticketNumber"), value: ticketSummary.ticketNumber },
        { id: "date", label: i18n.t("cart.orderConfirmed.summary.date"), value: ticketSummary.date },
        { id: "seller", label: i18n.t("cart.orderConfirmed.summary.seller"), value: ticketSummary.sellerName },
    ],
});
