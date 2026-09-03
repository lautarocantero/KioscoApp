import { MembershipBillingPeriodEnum } from "@typings/membership/membershipEnums";
import type { MembershipPlanPricing } from "@typings/membership/membershipTypes";
import { MEMBERSHIP_SEMIANNUAL_DISCOUNT_RATE } from "../../../config/membershipPlans";

const MONTHS_PER_TERM = 6;

// Deriva el precio a mostrar en una card según el período del toggle. El
// precio mensual real (el que cobra el back) es siempre `monthlyPrice` —
// esto solo calcula la previsualización de "6 meses" (ver
// MEMBERSHIP_SEMIANNUAL_DISCOUNT_RATE). Los montos se redondean a enteros:
// las monedas que maneja Mercado Pago acá (ARS) no usan centavos en la UI.
export const computeMembershipPlanPricing = (
    monthlyPrice: number,
    period: MembershipBillingPeriodEnum,
): MembershipPlanPricing => {
    if (period === MembershipBillingPeriodEnum.Monthly) {
        return { period, monthlyEquivalent: monthlyPrice, totalForTerm: null, savingsForTerm: null };
    }

    const monthlyEquivalent = Math.round(monthlyPrice * (1 - MEMBERSHIP_SEMIANNUAL_DISCOUNT_RATE));
    const totalForTerm = monthlyEquivalent * MONTHS_PER_TERM;
    const savingsForTerm = monthlyPrice * MONTHS_PER_TERM - totalForTerm;

    return { period, monthlyEquivalent, totalForTerm, savingsForTerm };
};
