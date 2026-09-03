import { useNavigate } from "react-router-dom";
import type { KioscoPlanEnum } from "@typings/membership/membershipEnums";
import type { MembershipPlanDefinition, MembershipPlanPricing, UseMembershipPlansPageReturn } from "@typings/membership/membershipTypes";
import { useMembershipStatus } from "./useMembershipStatus";
import { useMembershipPlans } from "./useMembershipPlans";
import { useMembershipBillingPeriod } from "./useMembershipBillingPeriod";
import { isCurrentActivePlan } from "../../modules/membership/helpers/isCurrentActivePlan";
import { computeMembershipPlanPricing } from "../../modules/membership/helpers/computeMembershipPlanPricing";

// Toda la orquestación de /membership/plans: status actual + los 2 tiers +
// a dónde navega elegir un plan + cuál es el plan actual. El .tsx solo arma
// la grilla de cards con lo que este hook ya resolvió. El plan es de la
// cuenta (no del kiosco activo), así que cualquier usuario autenticado
// gestiona el suyo.
export const useMembershipPlansPage = (): UseMembershipPlansPageReturn => {
    const navigate = useNavigate();
    const { status, loading: statusLoading, error: statusError } = useMembershipStatus();
    const { plans, loading: plansLoading, error: plansError } = useMembershipPlans();
    const { billingPeriod, setBillingPeriod } = useMembershipBillingPeriod();

    const selectPlan = (plan: KioscoPlanEnum): void => { navigate(`/membership/checkout/${plan}`); };
    const isPlanCurrent = (plan: KioscoPlanEnum): boolean => isCurrentActivePlan(status, plan);
    const getPlanPricing = (plan: MembershipPlanDefinition): MembershipPlanPricing =>
        computeMembershipPlanPricing(plan.price, billingPeriod);

    const currentPlanDefinition = plans.find((plan) => plan.id === status?.plan) ?? null;

    return {
        status,
        statusLoading,
        statusError,
        plans,
        plansLoading,
        plansError,
        selectPlan,
        isPlanCurrent,
        currentPlanDefinition,
        billingPeriod,
        setBillingPeriod,
        getPlanPricing,
    };
};

export default useMembershipPlansPage;
