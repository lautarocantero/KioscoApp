import { describe, expect, it } from "vitest";
import { SellsPeriodEnum } from "@typings/sells/enums";
import { buildSellsPeriodRange } from "../../helpers/buildSellsPeriodRange";

// 15 de agosto de 2026 (mitad de mes, sin ambigüedad de límites de mes).
const NOW = new Date(2026, 7, 15, 10, 30);

describe("buildSellsPeriodRange", () => {
    it("Hoy: from/to son el mismo día, compara contra ayer", () => {
        const range = buildSellsPeriodRange(SellsPeriodEnum.Today, NOW);

        expect(range.from.toDateString()).toBe(new Date(2026, 7, 15).toDateString());
        expect(range.to.toDateString()).toBe(new Date(2026, 7, 15).toDateString());
        expect(range.compareFrom.toDateString()).toBe(new Date(2026, 7, 14).toDateString());
        expect(range.compareTo.toDateString()).toBe(new Date(2026, 7, 14).toDateString());
    });

    it("7 días: incluye hoy + 6 días previos, compara contra los 7 días anteriores", () => {
        const range = buildSellsPeriodRange(SellsPeriodEnum.SevenDays, NOW);

        expect(range.from.toDateString()).toBe(new Date(2026, 7, 9).toDateString());
        expect(range.to.toDateString()).toBe(new Date(2026, 7, 15).toDateString());
        expect(range.compareFrom.toDateString()).toBe(new Date(2026, 7, 2).toDateString());
        expect(range.compareTo.toDateString()).toBe(new Date(2026, 7, 8).toDateString());
    });

    it("30 días: incluye hoy + 29 días previos, compara contra los 30 días anteriores", () => {
        const range = buildSellsPeriodRange(SellsPeriodEnum.ThirtyDays, NOW);

        expect(range.from.toDateString()).toBe(new Date(2026, 6, 17).toDateString());
        expect(range.to.toDateString()).toBe(new Date(2026, 7, 15).toDateString());
        expect(range.compareFrom.toDateString()).toBe(new Date(2026, 5, 17).toDateString());
        expect(range.compareTo.toDateString()).toBe(new Date(2026, 6, 16).toDateString());
    });

    it("Este mes: desde el día 1, compara contra el mes calendario anterior completo", () => {
        const range = buildSellsPeriodRange(SellsPeriodEnum.ThisMonth, NOW);

        expect(range.from.toDateString()).toBe(new Date(2026, 7, 1).toDateString());
        expect(range.to.toDateString()).toBe(new Date(2026, 7, 15).toDateString());
        expect(range.compareFrom.toDateString()).toBe(new Date(2026, 6, 1).toDateString());
        expect(range.compareTo.toDateString()).toBe(new Date(2026, 6, 31).toDateString());
    });
});
