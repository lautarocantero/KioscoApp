import { describe, expect, it, vi, afterEach } from "vitest";
import i18n from "@i18n/i18n";
import { getRelativeTime } from "../../helpers/getRelativeTime";

describe("getRelativeTime", () => {
    const now = new Date("2026-08-16T12:00:00.000Z");

    afterEach(() => {
        vi.useRealTimers();
    });

    it("devuelve 'Recién' para hace menos de un minuto", () => {
        vi.useFakeTimers();
        vi.setSystemTime(now);

        const createdAt = new Date(now.getTime() - 30_000).toISOString();
        expect(getRelativeTime(createdAt, i18n.t)).toBe("Recién");
    });

    it("devuelve minutos para hace menos de una hora", () => {
        vi.useFakeTimers();
        vi.setSystemTime(now);

        const createdAt = new Date(now.getTime() - 5 * 60_000).toISOString();
        expect(getRelativeTime(createdAt, i18n.t)).toBe("Hace 5 min");
    });

    it("devuelve horas para hace menos de un día", () => {
        vi.useFakeTimers();
        vi.setSystemTime(now);

        const createdAt = new Date(now.getTime() - 3 * 60 * 60_000).toISOString();
        expect(getRelativeTime(createdAt, i18n.t)).toBe("Hace 3 h");
    });

    it("devuelve días para hace un día o más", () => {
        vi.useFakeTimers();
        vi.setSystemTime(now);

        const createdAt = new Date(now.getTime() - 2 * 24 * 60 * 60_000).toISOString();
        expect(getRelativeTime(createdAt, i18n.t)).toBe("Hace 2 d");
    });
});
