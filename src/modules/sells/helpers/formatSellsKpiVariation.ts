import type { SellsPeriodKpi } from "@typings/sells/types";

export type SellsKpiVariationTone = "positive" | "attention" | "neutral";

const VARIATION_FORMAT: Intl.NumberFormatOptions = { minimumFractionDigits: 1, maximumFractionDigits: 1 };

// Traduce la variación calculada por aggregateSellsPeriodKpis al chip visual:
// una baja NO es un chip de error (rojo) — es neutro con flecha hacia abajo,
// mismo criterio que pide el handoff ("una baja semanal no es un error").
export const formatSellsKpiVariation = (kpi: SellsPeriodKpi): { label: string; tone: SellsKpiVariationTone } => {
    if (kpi.variationPct === null) return { label: "—", tone: "neutral" };

    const formatted = new Intl.NumberFormat("es-AR", VARIATION_FORMAT).format(Math.abs(kpi.variationPct));

    if (kpi.trend === "up") return { label: `▲ ${formatted}%`, tone: "positive" };
    if (kpi.trend === "down") return { label: `▼ ${formatted}%`, tone: "neutral" };
    return { label: `${formatted}%`, tone: "neutral" };
};
