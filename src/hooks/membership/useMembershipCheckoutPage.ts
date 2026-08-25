import type { UseMembershipCheckoutPageReturn } from "@typings/membership/membershipTypes";
import { useMembershipCheckoutPlan } from "./useMembershipCheckoutPlan";
import { useMembershipCheckout } from "./useMembershipCheckout";
import { useIsActiveKioscoAdmin } from "../kiosco/useIsActiveKioscoAdmin";

// Toda la orquestación de /membership/checkout/:plan: resuelve el plan de la
// URL, y expone un único `pay()` sin argumentos para que el botón no tenga
// que armar el closure en el .tsx. `isAdmin` bloquea el pago para un seller
// que entre por URL directa (membresía es 100% admin-only).
export const useMembershipCheckoutPage = (planParam: string | undefined): UseMembershipCheckoutPageReturn => {
    const isAdmin = useIsActiveKioscoAdmin();
    const { plan, planDefinition, loading, error } = useMembershipCheckoutPlan(planParam);
    const { isSubmitting, error: checkoutError, startCheckout } = useMembershipCheckout();

    const pay = (): void => {
        if (!planDefinition) return;
        startCheckout(planDefinition.id);
    };

    return { plan, planDefinition, loading, error, isSubmitting, checkoutError, pay, isAdmin };
};

export default useMembershipCheckoutPage;
