import { describe, it, expect } from "vitest";
import { formatReportMonth } from "../../helpers/formatReportMonth";

describe("formatReportMonth", () => {
    it("formatea el ISO del primer día del mes como 'mes año'", () => {
        expect(formatReportMonth("2026-03-01T00:00:00.000Z")).toBe("marzo de 2026");
    });
});
