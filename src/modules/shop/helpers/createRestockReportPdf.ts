import jsPDF from "jspdf";
import { applyPlugin } from "jspdf-autotable";
import type { RestockReportRow } from "@typings/shop/shopTypes";
import i18n from "@i18n/i18n";

declare module "jspdf" {
    interface jsPDF {
        autoTable: (options: Record<string, unknown>) => jsPDF;
    }
}

applyPlugin(jsPDF);

// Genera y descarga la boleta de reposición: todas las presentaciones por
// debajo de su stock mínimo, con la cantidad a comprar para llegar al
// mínimo. provider1/provider2 se muestran vacíos si no hay proveedor
// asociado todavía. Misma estructura que createPdfTicket.ts (comprobante
// de venta), pero sin datos de vendedor/pago porque no es una venta.
export const createRestockReportPdf = (rows: RestockReportRow[]): void => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(i18n.t("shop.restockReportPdf.title"), 14, 20);
    doc.setFontSize(10);
    doc.text(i18n.t("shop.restockReportPdf.dateLabel", { date: new Date().toLocaleString("es-AR") }), 14, 28);
    doc.text(i18n.t("shop.restockReportPdf.belowMinStockLabel", { count: rows.length }), 14, 34);

    const tableRows = rows.map((row) => [
        row.productName,
        row.presentationName,
        String(row.currentStock),
        String(row.minStock),
        String(row.minRestock),
        row.provider1,
        row.provider2,
    ]);

    doc.autoTable({
        head: [[
            i18n.t("shop.restockReportPdf.columns.product"),
            i18n.t("shop.restockReportPdf.columns.presentation"),
            i18n.t("shop.restockReportPdf.columns.currentStock"),
            i18n.t("shop.restockReportPdf.columns.minStock"),
            i18n.t("shop.restockReportPdf.columns.minRestock"),
            i18n.t("shop.restockReportPdf.columns.provider1"),
            i18n.t("shop.restockReportPdf.columns.provider2"),
        ]],
        body: tableRows,
        startY: 42,
    });

    const time = new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }).replace(":", "h");
    doc.save(`${i18n.t("shop.restockReportPdf.fileNamePrefix")}_${time}.pdf`);
};
