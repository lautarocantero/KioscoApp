import { describe, it, expect } from "vitest";
import { MembershipBillingPeriodEnum } from "@typings/membership/membershipEnums";
import { computeMembershipPlanPricing } from "../../helpers/computeMembershipPlanPricing";

describe("computeMembershipPlanPricing", () => {
    it("en Monthly devuelve el precio tal cual, sin total ni ahorro de término", () => {
        const pricing = computeMembershipPlanPricing(9999, MembershipBillingPeriodEnum.Monthly);

        expect(pricing).toEqual({
            period: MembershipBillingPeriodEnum.Monthly,
            monthlyEquivalent: 9999,
            totalForTerm: null,
            savingsForTerm: null,
        });
    });

    it("en Semiannual aplica el 15% de descuento al mensual y arma el total/ahorro de 6 meses", () => {
        const pricing = computeMembershipPlanPricing(10000, MembershipBillingPeriodEnum.Semiannual);

        expect(pricing.period).toBe(MembershipBillingPeriodEnum.Semiannual);
        expect(pricing.monthlyEquivalent).toBe(8500);
        expect(pricing.totalForTerm).toBe(51000);
        expect(pricing.savingsForTerm).toBe(9000);
    });

    it("redondea el mensual semestral a un entero (sin centavos)", () => {
        const pricing = computeMembershipPlanPricing(9999, MembershipBillingPeriodEnum.Semiannual);

        expect(Number.isInteger(pricing.monthlyEquivalent)).toBe(true);
    });
});
