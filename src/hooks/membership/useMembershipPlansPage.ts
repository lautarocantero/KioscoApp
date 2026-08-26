import { useNavigate } from "react-router-dom";
import type { KioscoPlanEnum } from "@typings/membership/membershipEnums";
import type { UseMembershipPlansPageReturn } from "@typings/membership/membershipTypes";
import { useMembershipStatus } from "./useMembershipStatus";
import { useMembershipPlans } from "./useMembershipPlans";
import { isCurrentActivePlan } from "../../modules/membership/helpers/isCurrentActivePlan";

// Toda la orquestación de /membership/plans: status actual + los 2 tiers +
// a dónde navega elegir un plan + cuál es el plan actual. El .tsx solo arma
// la grilla de cards con lo que este hook ya resolvió. El plan es de la
// cuenta (no del kiosco activo), así que cualquier usuario autenticado
// gestiona el suyo.
export const useMembershipPlansPage = (): UseMembershipPlansPageReturn => {
    const navigate = useNavigate();
    const { status, loading: statusLoading, error: statusError } = useMembershipStatus();
    const { plans, loading: plansLoading, error: plansError } = useMembershipPlans();

    const selectPlan = (plan: KioscoPlanEnum): void => { navigate(`/membership/checkout/${plan}`); };
    const isPlanCurrent = (plan: KioscoPlanEnum): boolean => isCurrentActivePlan(status, plan);

    return { status, statusLoading, statusError, plans, plansLoading, plansError, selectPlan, isPlanCurrent };
};

export default useMembershipPlansPage;
