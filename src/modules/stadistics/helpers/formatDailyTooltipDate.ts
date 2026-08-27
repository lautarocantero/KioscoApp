// Fecha completa para el tooltip del gráfico de ventas por día (ej. "Viernes,
// 21 de agosto de 2026") — a diferencia del label del eje X, que solo
// muestra el número de día por espacio. timeZone "UTC" evita que un huso
// horario negativo corra el día mostrado hacia atrás (mismo criterio que
// formatReportMonth/monthKeyToLabel).
export const formatDailyTooltipDate = (isoDate: string): string => {
    const formatted = new Date(isoDate).toLocaleDateString("es-AR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
    });
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

export default formatDailyTooltipDate;
