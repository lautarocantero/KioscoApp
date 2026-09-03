import type { HourlySalesPoint } from "@typings/shop/shopTypes";
import type { SellTicketType } from "@typings/sells/sellTypes";

// Ancho fijo del gráfico "Ventas por hora" de /shop (ver mockup de
// referencia): las últimas WINDOW_HOURS horas transcurridas del día,
// terminando en la hora actual. Evita inventar un horario comercial fijo
// (el negocio real puede abrir distinto cada día) y evita un gráfico
// enorme con horas de madrugada en 0 cuando recién empezó el día.
const WINDOW_HOURS = 11;

// Agrupa las ventas de HOY (ya filtradas por el caller) en franjas de 1
// hora, sumando `total_amount`. Incluye horas sin ventas (total 0) para
// que el gráfico no salte franjas.
export const aggregateSellsByHour = (todaySells: SellTicketType[], now: Date): HourlySalesPoint[] => {
    const totalsByHour = new Map<number, number>();
    todaySells.forEach((sell) => {
        const hour = new Date(sell.purchase_date).getHours();
        totalsByHour.set(hour, (totalsByHour.get(hour) ?? 0) + sell.total_amount);
    });

    const currentHour = now.getHours();
    const startHour = Math.max(0, currentHour - (WINDOW_HOURS - 1));

    const points: HourlySalesPoint[] = [];
    for (let hour = startHour; hour <= currentHour; hour++) {
        points.push({
            hour,
            label: String(hour).padStart(2, "0"),
            total: totalsByHour.get(hour) ?? 0,
        });
    }

    return points;
};
