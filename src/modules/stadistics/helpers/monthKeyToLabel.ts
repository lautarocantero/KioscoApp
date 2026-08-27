// Convierte una clave de mes "YYYY-MM" (formato de meta.availableMonths y
// del estado local de mes de la página) a su nombre legible, ej. "agosto
// 2026". Mismo criterio que formatReportMonth: timeZone "UTC" evita que un
// huso horario negativo corra el mes mostrado un día para atrás.
export const monthKeyToLabel = (monthKey: string): string =>
    new Date(`${monthKey}-01`).toLocaleDateString("es-AR", { month: "long", year: "numeric", timeZone: "UTC" });

export default monthKeyToLabel;
