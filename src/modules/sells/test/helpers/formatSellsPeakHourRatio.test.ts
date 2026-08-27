import { describe, expect, it } from "vitest";
import { formatSellsPeakHourRatio } from "../../helpers/formatSellsPeakHourRatio";

describe("formatSellsPeakHourRatio", () => {
    it("25% -> 1 de cada 4", () => {
        expect(formatSellsPeakHourRatio(25)).toBe(4);
    });

    it("100% -> 1 de cada 1", () => {
        expect(formatSellsPeakHourRatio(100)).toBe(1);
    });

    it("0% -> 0 (sin división por cero)", () => {
        expect(formatSellsPeakHourRatio(0)).toBe(0);
    });
});
