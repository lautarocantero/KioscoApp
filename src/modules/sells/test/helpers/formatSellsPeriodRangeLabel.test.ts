import { describe, expect, it, vi } from "vitest";
import type { TFunction } from "i18next";
import { SellsPeriodEnum } from "@typings/sells/enums";
import type { SellsPeriodRange } from "@typings/sells/types";
import { formatSellsPeriodRangeLabel } from "../../helpers/formatSellsPeriodRangeLabel";

const range: SellsPeriodRange = {
    from: new Date(2026, 7, 25),
    to: new Date(2026, 7, 31),
    compareFrom: new Date(2026, 7, 18),
    compareTo: new Date(2026, 7, 24),
};

const t = vi.fn((key: string) => key) as unknown as TFunction;

describe("formatSellsPeriodRangeLabel", () => {
    it("formatea DD/MM – DD/MM y pide la clave de comparación del período elegido", () => {
        const label = formatSellsPeriodRangeLabel(SellsPeriodEnum.SevenDays, range, t);

        expect(label).toBe("25/08 – 31/08 · sells.contextBand.period.comparison.sevenDays");
        expect(t).toHaveBeenCalledWith("sells.contextBand.period.comparison.sevenDays");
    });
});
