// El back devuelve el primer día del mes en curso (ISO) como identificador
// del período del reporte — acá se traduce a "marzo de 2026" para el
// subtítulo. timeZone: "UTC" es necesario: sin esto, un usuario en un huso
// horario negativo (ej. Argentina, UTC-3) vería el mes anterior, porque
// medianoche UTC del día 1 cae en la noche del día 28/30/31 en su horario local.
export const formatReportMonth = (monthIso: string): string =>
    new Date(monthIso).toLocaleDateString("es-AR", { month: "long", year: "numeric", timeZone: "UTC" });
