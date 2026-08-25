import type { UseMembershipCheckoutPageReturn } from "@typings/membership/membershipTypes";
import { useMembershipCheckoutPlan } from "./useMembershipCheckoutPlan";
import { useMembershipCheckout } from "./useMembershipCheckout";

// Toda la orquestación de /membership/checkout/:plan: resuelve el plan de la
// URL, y expone un único `pay()` sin argumentos para que el botón no tenga
// que armar el closure en el .tsx.
export const useMembershipCheckoutPage = (planParam: string | undefined): UseMembershipCheckoutPageReturn => {
    const { plan, planDefinition, loading, error } = useMembershipCheckoutPlan(planParam);
    const { isSubmitting, error: checkoutError, startCheckout } = useMembershipCheckout();

    const pay = (): void => {
        if (!planDefinition) return;
        startCheckout(planDefinition.id);
    };

    return { plan, planDefinition, loading, error, isSubmitting, checkoutError, pay };
};

export default useMembershipCheckoutPage;
