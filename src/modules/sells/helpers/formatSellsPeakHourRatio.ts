// Convierte el % de tickets de la franja pico a la forma "1 de cada N" que
// pide el handoff ("18–20 h · 1 de cada 4 tickets").
export const formatSellsPeakHourRatio = (ticketSharePct: number): number => {
    if (ticketSharePct <= 0) return 0;
    return Math.round(100 / ticketSharePct);
};
