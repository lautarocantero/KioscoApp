import dayjs from "dayjs";
import { SellsPeriodEnum } from "@typings/sells/enums";
import type { SellsPeriodRange } from "@typings/sells/types";

// Arma el rango [from, to] del período elegido y su rango de comparación
// (mismo largo, inmediatamente anterior). "Este mes" compara contra el mes
// calendario anterior completo, no contra "los mismos N días antes", porque
// los meses no tienen todos el mismo largo.
export const buildSellsPeriodRange = (period: SellsPeriodEnum, now: Date): SellsPeriodRange => {
    const today = dayjs(now);
    const to = today.endOf("day");

    if (period === SellsPeriodEnum.Today) {
        const from = today.startOf("day");
        const yesterday = today.subtract(1, "day");
        return {
            from: from.toDate(),
            to: to.toDate(),
            compareFrom: yesterday.startOf("day").toDate(),
            compareTo: yesterday.endOf("day").toDate(),
        };
    }

    if (period === SellsPeriodEnum.ThirtyDays) {
        const from = today.subtract(29, "day").startOf("day");
        const compareTo = from.subtract(1, "day").endOf("day");
        const compareFrom = compareTo.subtract(29, "day").startOf("day");
        return { from: from.toDate(), to: to.toDate(), compareFrom: compareFrom.toDate(), compareTo: compareTo.toDate() };
    }

    if (period === SellsPeriodEnum.ThisMonth) {
        const from = today.startOf("month");
        const compareTo = from.subtract(1, "day").endOf("day");
        const compareFrom = compareTo.startOf("month");
        return { from: from.toDate(), to: to.toDate(), compareFrom: compareFrom.toDate(), compareTo: compareTo.toDate() };
    }

    const from = today.subtract(6, "day").startOf("day");
    const compareTo = from.subtract(1, "day").endOf("day");
    const compareFrom = compareTo.subtract(6, "day").startOf("day");
    return { from: from.toDate(), to: to.toDate(), compareFrom: compareFrom.toDate(), compareTo: compareTo.toDate() };
};
