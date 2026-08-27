import { useEffect, useState } from "react";
import type { MonthlyReportDetail, UseShopMonthlyReportDetailReturn } from "@typings/stadistics/stadisticsTypes";
import type { ReportCompareWith } from "@typings/stadistics/stadisticsEnums";
import { getMonthlySalesReportDetailRequest } from "../../modules/stadistics/api/stadisticsApi";
import { useErrorParser } from "../shared/useErrorParser";

// Detalle del reporte mensual (ventas por día, medios de pago, vendedores,
// franjas horarias, stock y cuenta corriente) del kiosco activo para un mes
// y una comparación dados — ver GET /sell/monthly-report/detail. La página
// es dueña de `month`/`compareWith`; acá solo se refetchea cuando cambian.
export const useShopMonthlyReportDetail = (
    month: string,
    compareWith: ReportCompareWith,
): UseShopMonthlyReportDetailReturn => {
    const [report, setReport] = useState<MonthlyReportDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { message: error, parseError, clearError } = useErrorParser();

    useEffect(() => {
        setIsLoading(true);
        clearError();

        getMonthlySalesReportDetailRequest(month, compareWith)
            .then((result) => setReport(result))
            .catch((err: unknown) => parseError(err, "No se pudo obtener el detalle del reporte del mes"))
            .finally(() => setIsLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [month, compareWith]);

    return { report, isLoading, error };
};

export default useShopMonthlyReportDetail;
