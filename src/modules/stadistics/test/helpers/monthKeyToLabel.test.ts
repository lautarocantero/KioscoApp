import { describe, it, expect } from "vitest";
import { monthKeyToLabel } from "../../helpers/monthKeyToLabel";

describe("monthKeyToLabel", () => {
    it("convierte una clave YYYY-MM al nombre de mes en español", () => {
        expect(monthKeyToLabel("2026-08")).toBe("agosto de 2026");
    });

    it("no corre el mes para atrás en husos horarios negativos (usa UTC)", () => {
        expect(monthKeyToLabel("2026-01")).toBe("enero de 2026");
    });
});
