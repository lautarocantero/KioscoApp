import type { SellTicketType } from "@typings/sells/sellTypes";
import type { SellsPeakHourFact } from "@typings/sells/types";

const BUCKET_SIZE_HOURS = 2;

// Agrupa los tickets del período en franjas de 2 horas (0-2, 2-4, ..., 22-24)
// y devuelve la franja con más tickets y qué proporción del total representa
// (p. ej. "18–20 h · 1 de cada 4 tickets").
export const aggregateSellsPeakHour = (sells: SellTicketType[]): SellsPeakHourFact => {
    if (sells.length === 0) return null;

    const counts = new Map<number, number>();
    sells.forEach((sell) => {
        const hour = new Date(sell.purchase_date).getHours();
        const bucketStart = Math.floor(hour / BUCKET_SIZE_HOURS) * BUCKET_SIZE_HOURS;
        counts.set(bucketStart, (counts.get(bucketStart) ?? 0) + 1);
    });

    let peakBucketStart = 0;
    let peakCount = 0;

    counts.forEach((count, bucketStart) => {
        if (count <= peakCount) return;
        peakCount = count;
        peakBucketStart = bucketStart;
    });

    return {
        startHour: peakBucketStart,
        endHour: peakBucketStart + BUCKET_SIZE_HOURS,
        ticketSharePct: (peakCount / sells.length) * 100,
    };
};
