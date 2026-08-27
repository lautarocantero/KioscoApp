// Opciones del selector de comparación del reporte mensual — valores
// enviados tal cual como query param `compareWith` a GET
// /sell/monthly-report/detail (ver stadisticsApi.ts).
export enum ReportCompareWith {
    PreviousMonth = "previous_month",
    PreviousYear = "previous_year",
    None = "none",
}

export const REPORT_COMPARE_WITH_VALUES = Object.values(ReportCompareWith);
