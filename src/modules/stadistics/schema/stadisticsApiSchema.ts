import { z } from "zod";

// Valida la respuesta de GET /sell/monthly-report antes de confiar en ella
// (rule 9): viene de la red, no del tipado estático de TS.
export const MonthlySalesReportSchema = z.object({
    month: z.string(),
    totalSales: z.number(),
    totalRevenue: z.number(),
    averageTicket: z.number(),
});
