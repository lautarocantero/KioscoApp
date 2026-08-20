import type { UseMembershipCheckoutPlanReturn } from "@typings/membership/membershipTypes";
import { parseMembershipPlanParam } from "../../modules/membership/helpers/parseMembershipPlanParam";
import { useMembershipPlans } from "./useMembershipPlans";

// Resuelve el :plan de la URL de checkout contra los tiers reales (precio
// incluido). plan === null significa "el param no es un tier válido" — la
// página muestra el error de invalidPlan en vez de armar un resumen vacío.
export const useMembershipCheckoutPlan = (planParam: string | undefined): UseMembershipCheckoutPlanReturn => {
    const plan = parseMembershipPlanParam(planParam);
    const { plans, loading, error } = useMembershipPlans();

    const planDefinition = plan ? plans.find((candidate) => candidate.id === plan) ?? null : null;

    return { plan, planDefinition, loading, error };
};

export default useMembershipCheckoutPlan;
