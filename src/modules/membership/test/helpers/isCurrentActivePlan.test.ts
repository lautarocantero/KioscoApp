import { describe, it, expect } from "vitest";
import { KioscoPlanEnum, KioscoPlanStatusEnum } from "@typings/membership/membershipEnums";
import type { MembershipStatus } from "@typings/membership/membershipTypes";
import { isCurrentActivePlan } from "../../helpers/isCurrentActivePlan";

const buildStatus = (overrides: Partial<MembershipStatus> = {}): MembershipStatus => ({
    plan: KioscoPlanEnum.Standard,
    plan_status: KioscoPlanStatusEnum.Active,
    next_payment_date: null,
    ...overrides,
});

describe("isCurrentActivePlan", () => {
    it("devuelve false si no hay status todavía (cargando)", () => {
        expect(isCurrentActivePlan(null, KioscoPlanEnum.Standard)).toBe(false);
    });

    it("devuelve true cuando el plan coincide y está activo", () => {
        const status = buildStatus({ plan: KioscoPlanEnum.Deluxe, plan_status: KioscoPlanStatusEnum.Active });
        expect(isCurrentActivePlan(status, KioscoPlanEnum.Deluxe)).toBe(true);
    });

    it("devuelve false cuando el plan coincide pero el pago está pendiente", () => {
        const status = buildStatus({ plan: KioscoPlanEnum.Deluxe, plan_status: KioscoPlanStatusEnum.PendingPayment });
        expect(isCurrentActivePlan(status, KioscoPlanEnum.Deluxe)).toBe(false);
    });

    it("devuelve false cuando el plan no coincide", () => {
        const status = buildStatus({ plan: KioscoPlanEnum.Standard, plan_status: KioscoPlanStatusEnum.Active });
        expect(isCurrentActivePlan(status, KioscoPlanEnum.Deluxe)).toBe(false);
    });
});
