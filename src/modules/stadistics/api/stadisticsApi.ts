import { API_URL } from "../../../config/api";
import { createHttpClient } from "../../shared/api/httpClient";
import type { MonthlySalesReport } from "@typings/stadistics/stadisticsTypes";
import { MonthlySalesReportSchema } from "../schema/stadisticsApiSchema";

const baseUrl = createHttpClient(`${API_URL}/sell`);

/*══════════════════════════════════════════════════════════════════════════╗
║ 📥 GET                                                                    ║
╚══════════════════════════════════════════════════════════════════════════╝*/

export const getMonthlySalesReportRequest = async (): Promise<MonthlySalesReport> => {
    const response = await baseUrl.get("/monthly-report");
    return MonthlySalesReportSchema.parse(response.data);
};
