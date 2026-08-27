import { describe, expect, it } from "vitest";
import { formatSellsKpiVariation } from "../../helpers/formatSellsKpiVariation";

describe("formatSellsKpiVariation", () => {
    it("variación positiva: chip verde con flecha hacia arriba", () => {
        const result = formatSellsKpiVariation({ value: 108, previousValue: 100, variationPct: 8, trend: "up" });
        expect(result).toEqual({ label: "▲ 8,0%", tone: "positive" });
    });

    it("variación negativa: chip NEUTRO (no rojo) con flecha hacia abajo — una baja no es un error", () => {
        const result = formatSellsKpiVariation({ value: 90, previousValue: 100, variationPct: -10, trend: "down" });
        expect(result).toEqual({ label: "▼ 10,0%", tone: "neutral" });
    });

    it("sin variación (0%): chip neutro sin flecha", () => {
        const result = formatSellsKpiVariation({ value: 100, previousValue: 100, variationPct: 0, trend: "flat" });
        expect(result).toEqual({ label: "0,0%", tone: "neutral" });
    });

    it("sin base de comparación (variationPct null): guion neutro", () => {
        const result = formatSellsKpiVariation({ value: 100, previousValue: 0, variationPct: null, trend: "up" });
        expect(result).toEqual({ label: "—", tone: "neutral" });
    });
});
