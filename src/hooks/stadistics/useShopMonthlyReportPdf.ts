import { useCallback, useContext } from "react";
import type { MonthlyReportDetail, UseShopMonthlyReportPdfReturn } from "@typings/stadistics/stadisticsTypes";
import { createMonthlyReportPdf } from "../../modules/stadistics/helpers/createMonthlyReportPdf";
import { SnackBarContext } from "../../modules/shared/components/SnackBar/SnackBarContext";
import { useErrorParser } from "../shared/useErrorParser";
import { AlertColor } from "@typings/ui/ui";

// Descarga el PDF del reporte mensual — mismo patrón que
// useShopRestockReport.ts (jsPDF + jspdf-autotable, error mostrado por
// snackbar). Deshabilitado mientras el reporte está cargando o no existe.
export const useShopMonthlyReportPdf = (
    report: MonthlyReportDetail | null,
    kioscoName: string,
    isLoading: boolean,
): UseShopMonthlyReportPdfReturn => {
    const snackBarContext = useContext(SnackBarContext);
    const { parseError } = useErrorParser("No se pudo generar el PDF del reporte mensual.");

    const handleDownload = useCallback((): void => {
        if (!report) return;

        try {
            createMonthlyReportPdf(report, kioscoName);
        } catch (err) {
            void parseError(err, "No se pudo generar el PDF del reporte mensual.").then((message) => {
                snackBarContext?.showSnackBar(message, AlertColor.Error);
            });
        }
    }, [report, kioscoName, parseError, snackBarContext]);

    return {
        isDownloadDisabled: isLoading || !report,
        handleDownload,
    };
};

export default useShopMonthlyReportPdf;
