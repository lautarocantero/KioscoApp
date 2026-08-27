import { SellsPeriodEnum, SELLS_PERIOD_VALUES } from "@typings/sells/enums";
import type { SellsPeriodOptionsAvailability } from "@typings/sells/types";
import { buildSellsPeriodRange } from "./buildSellsPeriodRange";

type SellsPeriodOptionAvailabilityArgs = {
    isAdmin: boolean;
    isDeluxe: boolean;
    now: Date;
};

const crossesPreviousMonth = (from: Date, now: Date): boolean =>
    from.getFullYear() < now.getFullYear() || (from.getFullYear() === now.getFullYear() && from.getMonth() < now.getMonth());

// Mismo criterio que getCompareAvailability (stadistics): el rol manda
// primero — cambiar el período es admin-only, igual que dashboard.changeRange
// en rolesPermissionsMatrix — y sólo si el rol lo permite se evalúa el plan.
// El plan Standard no puede ver "meses anteriores" (misma regla que ya
// aplica al reporte mensual, ShopMonthlyReportHeader.canChangeMonth). Como
// "Hoy" y "Este mes" nunca salen del mes en curso, sólo 7 días/30 días
// pueden quedar bloqueadas, y sólo cuando su rango realmente cruza al mes
// anterior según la fecha de hoy (p. ej. los primeros días del mes).
export const getSellsPeriodOptionAvailability = ({
    isAdmin,
    isDeluxe,
    now,
}: SellsPeriodOptionAvailabilityArgs): SellsPeriodOptionsAvailability => {
    const result = {} as SellsPeriodOptionsAvailability;

    SELLS_PERIOD_VALUES.forEach((period) => {
        if (!isAdmin) {
            result[period as SellsPeriodEnum] = { canSelect: false, disabledReason: "admin" };
            return;
        }

        const { from } = buildSellsPeriodRange(period as SellsPeriodEnum, now);
        if (!isDeluxe && crossesPreviousMonth(from, now)) {
            result[period as SellsPeriodEnum] = { canSelect: false, disabledReason: "plan" };
            return;
        }

        result[period as SellsPeriodEnum] = { canSelect: true, disabledReason: null };
    });

    return result;
};
