// Espejo de MonthlySalesReportType en el back (@typings/sell): totales de
// ventas del mes en curso. Para el plan Standard es el único reporte
// disponible (el historial de ventas también queda acotado al mes en
// curso, ver PlanService.getSellsDateFloor en el backend); para Deluxe es
// un resumen rápido además del historial completo sin restricción.
export type MonthlySalesReport = {
    month: string;
    totalSales: number;
    totalRevenue: number;
    averageTicket: number;
};

export interface UseShopMonthlyReportReturn {
    report: MonthlySalesReport | null;
    isLoading: boolean;
    error: string | null;
}
