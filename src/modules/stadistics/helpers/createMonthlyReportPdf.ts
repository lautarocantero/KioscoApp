import jsPDF from "jspdf";
import { applyPlugin } from "jspdf-autotable";
import type { MonthlyReportDetail } from "@typings/stadistics/stadisticsTypes";
import { formatCurrency } from "../../cart/helpers/formatCurrency";
import { formatReportMonth } from "./formatReportMonth";
import i18n from "@i18n/i18n";

declare module "jspdf" {
    interface jsPDF {
        autoTable: (options: Record<string, unknown>) => jsPDF;
    }
}

applyPlugin(jsPDF);

// Genera y descarga el reporte mensual completo: KPIs, vendedores y medios
// de pago del mes, cada bloque en su propia página (evita encadenar
// doc.lastAutoTable.finalY entre tablas — más simple y no depende de un
// efecto secundario del plugin). Mismo patrón que createRestockReportPdf.ts
// (jsPDF + jspdf-autotable, i18n para textos, sin datos hardcodeados).
export const createMonthlyReportPdf = (report: MonthlyReportDetail, kioscoName: string): void => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(i18n.t("stadistics.monthlyReport.pdf.title", { month: formatReportMonth(report.month) }), 14, 20);
    doc.setFontSize(10);
    doc.text(i18n.t("stadistics.monthlyReport.pdf.kioscoLabel", { kioscoName }), 14, 28);
    doc.text(i18n.t("stadistics.monthlyReport.pdf.generatedAtLabel", { date: new Date().toLocaleString("es-AR") }), 14, 34);

    doc.autoTable({
        head: [[i18n.t("stadistics.monthlyReport.pdf.columns.metric"), i18n.t("stadistics.monthlyReport.pdf.columns.value")]],
        body: [
            [i18n.t("stadistics.monthlyReport.kpis.totalSales"), formatCurrency(report.summary.totalRevenue)],
            [i18n.t("stadistics.monthlyReport.kpis.tickets"), String(report.summary.totalSales)],
            [i18n.t("stadistics.monthlyReport.kpis.averageTicket"), formatCurrency(report.summary.averageTicket)],
        ],
        startY: 42,
    });

    doc.addPage();
    doc.setFontSize(14);
    doc.text(i18n.t("stadistics.monthlyReport.sellers.title"), 14, 20);
    doc.autoTable({
        head: [[
            i18n.t("stadistics.monthlyReport.pdf.columns.seller"),
            i18n.t("stadistics.monthlyReport.pdf.columns.amount"),
            i18n.t("stadistics.monthlyReport.pdf.columns.ticketsCount"),
        ]],
        body: report.sellers.map((seller) => [seller.sellerName, formatCurrency(seller.amount), String(seller.ticketsCount)]),
        startY: 26,
    });

    doc.addPage();
    doc.setFontSize(14);
    doc.text(i18n.t("stadistics.monthlyReport.paymentMethods.title"), 14, 20);
    doc.autoTable({
        head: [[
            i18n.t("stadistics.monthlyReport.pdf.columns.paymentMethod"),
            i18n.t("stadistics.monthlyReport.pdf.columns.amount"),
            i18n.t("stadistics.monthlyReport.pdf.columns.percentage"),
        ]],
        body: report.paymentMethods.map((method) => [
            i18n.t(`stadistics.monthlyReport.paymentMethods.methods.${method.method}`, method.method),
            formatCurrency(method.amount),
            `${method.percentage.toFixed(0)}%`,
        ]),
        startY: 26,
    });

    const time = new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }).replace(":", "h");
    doc.save(`${i18n.t("stadistics.monthlyReport.pdf.fileNamePrefix")}_${time}.pdf`);
};

export default createMonthlyReportPdf;
