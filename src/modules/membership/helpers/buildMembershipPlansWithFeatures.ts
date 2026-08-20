import type { MembershipPlanDefinition, MembershipPlanWithFeatures } from "@typings/membership/membershipTypes";
import {
    MEMBERSHIP_PLAN_FEATURE_KEYS,
    MEMBERSHIP_PLAN_ORDER,
    MEMBERSHIP_POPULAR_PLAN,
} from "../../../config/membershipPlans";

// Combina los planes crudos del backend (precio/moneda) con el copy de
// marketing local (features) y el orden/tier destacado de la UI.
export const buildMembershipPlansWithFeatures = (plans: MembershipPlanDefinition[]): MembershipPlanWithFeatures[] => {
    const byId = new Map(plans.map((plan) => [plan.id, plan]));

    return MEMBERSHIP_PLAN_ORDER
        .map((planId) => byId.get(planId))
        .filter((plan): plan is MembershipPlanDefinition => plan !== undefined)
        .map((plan) => ({
            ...plan,
            featureKeys: MEMBERSHIP_PLAN_FEATURE_KEYS[plan.id],
            isPopular: plan.id === MEMBERSHIP_POPULAR_PLAN,
        }));
};
