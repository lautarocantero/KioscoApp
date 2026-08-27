// Períodos del selector de la banda de contexto de /sells (opción 3a del
// handoff). No confundir con SellFilterEnum (filtra por estado en la tabla):
// este enum filtra por rango de fechas y gobierna también la banda.
export enum SellsPeriodEnum {
    Today = "today",
    SevenDays = "sevenDays",
    ThirtyDays = "thirtyDays",
    ThisMonth = "thisMonth",
}

export const SELLS_PERIOD_VALUES = Object.values(SellsPeriodEnum);
