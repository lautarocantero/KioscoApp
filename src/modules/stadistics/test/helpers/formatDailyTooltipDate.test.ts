import { describe, it, expect } from "vitest";
import { formatDailyTooltipDate } from "../../helpers/formatDailyTooltipDate";

describe("formatDailyTooltipDate", () => {
    it("formatea el isoDate como fecha completa en español, con la primera letra en mayúscula", () => {
        expect(formatDailyTooltipDate("2026-08-21")).toBe("Viernes, 21 de agosto de 2026");
    });

    it("no corre el día para atrás en husos horarios negativos (usa UTC)", () => {
        expect(formatDailyTooltipDate("2026-08-01")).toBe("Sábado, 1 de agosto de 2026");
    });
});
