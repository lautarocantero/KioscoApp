import type { TFunction } from "i18next";
import type { SellTicketType } from "@typings/sells/sellTypes";
import { formatCurrency } from "../../cart/helpers/formatCurrency";

const escapeCsvValue = (value: string): string => `"${value.replace(/"/g, '""')}"`;

const buildCsvRow = (sell: SellTicketType, t: TFunction): string => {
    const date = new Date(sell.purchase_date).toLocaleString("es-AR");
    const values = [
        date,
        sell._id,
        sell.seller_name,
        t(`paymentMethod.${sell.payment_method}`),
        t(`sells.status.${sell.status}`),
        formatCurrency(sell.total_amount, sell.currency),
    ];
    return values.map((value) => escapeCsvValue(String(value))).join(",");
};

// Exporta las filas ya filtradas (período + filtro de estado vigentes) como
// CSV, con las mismas etiquetas traducidas que ve el usuario en la tabla —
// no toda la base. Dispara la descarga vía Blob, sin librería nueva.
export const exportSellsToCsv = (sells: SellTicketType[], fileName: string, t: TFunction): void => {
    const headers = [
        t("sells.contextBand.csv.date"),
        t("sells.contextBand.csv.ticket"),
        t("sells.contextBand.csv.seller"),
        t("sells.contextBand.csv.paymentMethod"),
        t("sells.contextBand.csv.status"),
        t("sells.contextBand.csv.total"),
    ]
        .map(escapeCsvValue)
        .join(",");

    const rows = sells.map((sell) => buildCsvRow(sell, t));
    const csvContent = [headers, ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(url);
};
