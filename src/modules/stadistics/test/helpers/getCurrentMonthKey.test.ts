import { describe, it, expect, vi, afterEach } from "vitest";
import { getCurrentMonthKey } from "../../helpers/getCurrentMonthKey";

describe("getCurrentMonthKey", () => {
    afterEach(() => {
        vi.useRealTimers();
    });

    it("devuelve el mes en curso en formato YYYY-MM", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date(2026, 7, 15)); // 15/08/2026 (Date usa mes 0-indexado)

        expect(getCurrentMonthKey()).toBe("2026-08");
    });

    it("rellena el mes con cero a la izquierda", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date(2026, 0, 5)); // enero

        expect(getCurrentMonthKey()).toBe("2026-01");
    });
});
