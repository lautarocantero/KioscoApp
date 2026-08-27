import { API_URL } from "../../../config/api";
import { createHttpClient } from "../../shared/api/httpClient";
import type { MonthlyReportDetail, MonthlySalesReport } from "@typings/stadistics/stadisticsTypes";
import type { ReportCompareWith } from "@typings/stadistics/stadisticsEnums";
import { MonthlyReportDetailSchema, MonthlySalesReportSchema } from "../schema/stadisticsApiSchema";

const baseUrl = createHttpClient(`${API_URL}/sell`);

/*══════════════════════════════════════════════════════════════════════════╗
║ 📥 GET                                                                    ║
╚══════════════════════════════════════════════════════════════════════════╝*/

export const getMonthlySalesReportRequest = async (): Promise<MonthlySalesReport> => {
    const response = await baseUrl.get("/monthly-report");
    return MonthlySalesReportSchema.parse(response.data);
};

export const getMonthlySalesReportDetailRequest = async (
    month: string,
    compareWith: ReportCompareWith,
): Promise<MonthlyReportDetail> => {
    const response = await baseUrl.get("/monthly-report/detail", { params: { month, compareWith } });
    return MonthlyReportDetailSchema.parse(response.data);
};
