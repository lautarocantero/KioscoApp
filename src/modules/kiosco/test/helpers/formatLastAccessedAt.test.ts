import { describe, expect, it, vi } from "vitest";
import { formatLastAccessedAt } from "../../helpers/formatLastAccessedAt";
import type { TFunction } from "i18next";

const buildT = (): TFunction => {
    const t = vi.fn((key: string, options?: Record<string, unknown>) =>
        options ? `${key}:${JSON.stringify(options)}` : key
    );
    return t as unknown as TFunction;
};

describe("formatLastAccessedAt", () => {
    it("devuelve la key 'never' cuando lastAccessedAt es null", () => {
        const t = buildT();
        expect(formatLastAccessedAt(null, t)).toBe("kiosco.selector.card.never");
    });

    it("devuelve la key 'never' cuando la fecha es inválida", () => {
        const t = buildT();
        expect(formatLastAccessedAt("no-es-una-fecha", t)).toBe("kiosco.selector.card.never");
    });

    it("devuelve la key 'today' con la hora cuando fue hoy", () => {
        const t = buildT();
        const now = new Date();
        const result = formatLastAccessedAt(now.toISOString(), t);
        expect(result).toContain("kiosco.selector.card.today");
        expect(t).toHaveBeenCalledWith("kiosco.selector.card.today", expect.objectContaining({ time: expect.any(String) }));
    });

    it("devuelve la key 'yesterday' con la hora cuando fue ayer", () => {
        const t = buildT();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const result = formatLastAccessedAt(yesterday.toISOString(), t);
        expect(result).toContain("kiosco.selector.card.yesterday");
    });

    it("devuelve una fecha corta (no una key de traducción) cuando fue hace más de un día", () => {
        const t = buildT();
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        const result = formatLastAccessedAt(lastWeek.toISOString(), t);
        expect(result).not.toContain("kiosco.selector.card");
        expect(result).toBe(lastWeek.toLocaleDateString());
    });
});
