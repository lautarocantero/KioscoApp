import { describe, it, expect } from "vitest";
import { formatPercentageChange } from "../../helpers/formatPercentageChange";

describe("formatPercentageChange", () => {
    it("formatea una variación positiva con flecha hacia arriba", () => {
        expect(formatPercentageChange(14.6)).toEqual({ isPositive: true, label: "▲ 14,6%" });
    });

    it("formatea una variación negativa con flecha hacia abajo y valor absoluto", () => {
        expect(formatPercentageChange(-6.9)).toEqual({ isPositive: false, label: "▼ 6,9%" });
    });

    it("trata 0 como positivo", () => {
        expect(formatPercentageChange(0)).toEqual({ isPositive: true, label: "▲ 0,0%" });
    });
});
