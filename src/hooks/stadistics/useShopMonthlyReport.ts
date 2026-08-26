import { useEffect, useState } from "react";
import type { MonthlySalesReport, UseShopMonthlyReportReturn } from "@typings/stadistics/stadisticsTypes";
import { getMonthlySalesReportRequest } from "../../modules/stadistics/api/stadisticsApi";
import { useErrorParser } from "../shared/useErrorParser";

// Totales de ventas del mes en curso del kiosco activo (ver GET
// /sell/monthly-report). Es el único reporte disponible en el plan
// Standard; en Deluxe convive con el historial completo sin restricción.
export const useShopMonthlyReport = (): UseShopMonthlyReportReturn => {
    const [report, setReport] = useState<MonthlySalesReport | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { message: error, parseError, clearError } = useErrorParser();

    useEffect(() => {
        setIsLoading(true);
        clearError();

        getMonthlySalesReportRequest()
            .then((result) => setReport(result))
            .catch((err: unknown) => parseError(err, "No se pudo obtener el reporte del mes"))
            .finally(() => setIsLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { report, isLoading, error };
};

export default useShopMonthlyReport;
