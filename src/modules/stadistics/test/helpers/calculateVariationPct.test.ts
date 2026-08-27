import { describe, it, expect } from "vitest";
import { calculateVariationPct } from "../../helpers/calculateVariationPct";

describe("calculateVariationPct", () => {
    it("calcula el porcentaje de variación entre el valor actual y el anterior", () => {
        expect(calculateVariationPct(4832000, 4216900)).toBeCloseTo(14.586, 2);
    });

    it("devuelve un porcentaje negativo cuando el valor bajó", () => {
        expect(calculateVariationPct(90, 100)).toBeCloseTo(-10, 5);
    });

    it("devuelve null cuando no hay base de comparación (evita dividir por cero)", () => {
        expect(calculateVariationPct(100, 0)).toBeNull();
    });

    it("devuelve null cuando el valor anterior es negativo", () => {
        expect(calculateVariationPct(100, -50)).toBeNull();
    });
});
