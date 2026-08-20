import { useState } from "react";
import type { KioscoPlanEnum } from "@typings/membership/membershipEnums";
import type { UseMembershipCheckoutReturn } from "@typings/membership/membershipTypes";
import { createMembershipCheckoutRequest } from "../../modules/membership/api/membershipApi";
import { useErrorParser } from "../shared/useErrorParser";

// Crea la suscripción en Mercado Pago y redirige al checkout hospedado por
// MP (init_point). No hay "success" que manejar acá: el resultado real lo
// confirma el webhook — el usuario vuelve a /membership/checkout/result.
export const useMembershipCheckout = (): UseMembershipCheckoutReturn => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { message: error, parseError, clearError } = useErrorParser();

    const startCheckout = async (plan: KioscoPlanEnum): Promise<void> => {
        setIsSubmitting(true);
        clearError();

        try {
            const { init_point } = await createMembershipCheckoutRequest(plan);
            window.location.href = init_point;
        } catch (err) {
            await parseError(err, "No se pudo iniciar el pago. Intentá nuevamente.");
            setIsSubmitting(false);
        }
    };

    return { isSubmitting, error, startCheckout };
};

export default useMembershipCheckout;
