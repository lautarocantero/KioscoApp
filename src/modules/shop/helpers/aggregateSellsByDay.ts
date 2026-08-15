import type { DailySalesPoint } from "@typings/shop/shopTypes";
import type { SellTicketType } from "@typings/sells/sellTypes";

const DAY_LABEL_FORMAT: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short" };

// Clave por fecha LOCAL (no UTC) para que ventas cercanas a medianoche
// queden agrupadas en el mismo día que ve el usuario.
const toDateKey = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

// Arma una serie continua de los últimos `days` días (incluye días sin ventas
// con total 0) sumando `total_amount` de las ventas reales de cada día.
export const aggregateSellsByDay = (sells: SellTicketType[], days: number): DailySalesPoint[] => {
    if (days <= 0) return [];

    const totalsByDay = new Map<string, number>();
    sells.forEach((sell) => {
        const key = toDateKey(new Date(sell.purchase_date));
        totalsByDay.set(key, (totalsByDay.get(key) ?? 0) + sell.total_amount);
    });

    const today = new Date();
    const points: DailySalesPoint[] = [];

    for (let offset = days - 1; offset >= 0; offset--) {
        const day = new Date(today);
        day.setDate(today.getDate() - offset);
        const key = toDateKey(day);

        points.push({
            date: key,
            label: day.toLocaleDateString("es-AR", DAY_LABEL_FORMAT),
            total: totalsByDay.get(key) ?? 0,
        });
    }

    return points;
};
