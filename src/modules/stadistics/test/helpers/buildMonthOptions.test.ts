import { describe, it, expect } from "vitest";
import { buildMonthOptions } from "../../helpers/buildMonthOptions";

describe("buildMonthOptions", () => {
    it("arma una opción por cada mes disponible, con label legible", () => {
        expect(buildMonthOptions(["2026-08", "2026-07"])).toEqual([
            { value: "2026-08", label: "agosto de 2026" },
            { value: "2026-07", label: "julio de 2026" },
        ]);
    });

    it("devuelve un array vacío cuando no hay meses disponibles", () => {
        expect(buildMonthOptions([])).toEqual([]);
    });
});
