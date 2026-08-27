import type { MonthOption } from "@typings/stadistics/stadisticsComponentTypes";
import { monthKeyToLabel } from "./monthKeyToLabel";

// Arma las opciones del selector de mes a partir de meta.availableMonths
// ("YYYY-MM", ya resuelto server-side según el plan del kiosco — ver
// MonthlyReportService.buildMeta).
export const buildMonthOptions = (availableMonths: string[]): MonthOption[] =>
    availableMonths.map((monthKey) => ({ value: monthKey, label: monthKeyToLabel(monthKey) }));

export default buildMonthOptions;
