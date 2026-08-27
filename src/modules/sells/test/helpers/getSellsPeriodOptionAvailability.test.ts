import { describe, expect, it } from "vitest";
import { SellsPeriodEnum } from "@typings/sells/enums";
import { getSellsPeriodOptionAvailability } from "../../helpers/getSellsPeriodOptionAvailability";

// 3 de agosto de 2026: "7 días" y "30 días" hacia atrás cruzan a julio,
// "Hoy" y "Este mes" nunca salen de agosto.
const EARLY_MONTH_NOW = new Date(2026, 7, 3);
// 31 de agosto de 2026: día suficientemente avanzado del mes para que
// incluso "30 días" hacia atrás (2 de agosto) siga cayendo en agosto.
const LATE_MONTH_NOW = new Date(2026, 7, 31);

describe("getSellsPeriodOptionAvailability", () => {
    it("seller (no admin): las 4 opciones bloqueadas por rol, sin importar el plan", () => {
        const availability = getSellsPeriodOptionAvailability({ isAdmin: false, isDeluxe: true, now: LATE_MONTH_NOW });

        Object.values(SellsPeriodEnum).forEach((period) => {
            expect(availability[period]).toEqual({ canSelect: false, disabledReason: "admin" });
        });
    });

    it("admin + Deluxe: las 4 opciones disponibles siempre, incluso si cruzan al mes anterior", () => {
        const availability = getSellsPeriodOptionAvailability({ isAdmin: true, isDeluxe: true, now: EARLY_MONTH_NOW });

        Object.values(SellsPeriodEnum).forEach((period) => {
            expect(availability[period]).toEqual({ canSelect: true, disabledReason: null });
        });
    });

    it("admin + Standard, a fin de mes: ninguna opción cruza al mes anterior, todas disponibles", () => {
        const availability = getSellsPeriodOptionAvailability({ isAdmin: true, isDeluxe: false, now: LATE_MONTH_NOW });

        Object.values(SellsPeriodEnum).forEach((period) => {
            expect(availability[period].canSelect).toBe(true);
        });
    });

    it("admin + Standard, principios de mes: 'Hoy' y 'Este mes' quedan disponibles, '7 días' y '30 días' bloqueadas por plan", () => {
        const availability = getSellsPeriodOptionAvailability({ isAdmin: true, isDeluxe: false, now: EARLY_MONTH_NOW });

        expect(availability[SellsPeriodEnum.Today]).toEqual({ canSelect: true, disabledReason: null });
        expect(availability[SellsPeriodEnum.ThisMonth]).toEqual({ canSelect: true, disabledReason: null });
        expect(availability[SellsPeriodEnum.SevenDays]).toEqual({ canSelect: false, disabledReason: "plan" });
        expect(availability[SellsPeriodEnum.ThirtyDays]).toEqual({ canSelect: false, disabledReason: "plan" });
    });
});
