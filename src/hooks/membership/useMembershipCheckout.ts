import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MembershipPaymentMethodEnum, type KioscoPlanEnum } from "@typings/membership/membershipEnums";
import type { CardPaymentSubmitData, UseMembershipCheckoutReturn } from "@typings/membership/membershipTypes";
import { CardPaymentSubmitDataSchema } from "../../modules/membership/schema/membershipApiSchema";
import { createMembershipCheckoutRequest } from "../../modules/membership/api/membershipApi";
import { useErrorParser } from "../shared/useErrorParser";

// Crea la suscripción en Mercado Pago, con dos formas de autorizarla:
// - Redirect: no hay "success" que manejar acá, el resultado real lo
//   confirma el webhook — el usuario vuelve a /membership/checkout/result
//   recién cuando MP lo redirige ahí tras completar el pago hospedado.
// - Card: se autoriza directamente con el token del Card Payment Brick (sin
//   salir de la app), así que navegamos nosotros mismos al result page —
//   que sigue siendo el único que refleja el estado real vía GET /status,
//   nunca asumimos acá que el pago quedó aprobado.
export const useMembershipCheckout = (): UseMembershipCheckoutReturn => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { message: error, parseError, clearError } = useErrorParser();
    const navigate = useNavigate();

    const startCheckoutRedirect = async (plan: KioscoPlanEnum): Promise<void> => {
        setIsSubmitting(true);
        clearError();

        try {
            const { init_point } = await createMembershipCheckoutRequest(plan, MembershipPaymentMethodEnum.Redirect);
            if (!init_point) throw new Error("Mercado Pago no devolvió un link de pago válido.");
            window.location.href = init_point;
        } catch (err) {
            await parseError(err, "No se pudo iniciar el pago. Intentá nuevamente.");
            setIsSubmitting(false);
        }
    };

    const startCheckoutWithCard = async (plan: KioscoPlanEnum, cardData: CardPaymentSubmitData): Promise<void> => {
        setIsSubmitting(true);
        clearError();

        try {
            // cardData viene del SDK de Mercado Pago (dato externo) — se valida
            // antes de mandarlo al backend.
            const { token } = CardPaymentSubmitDataSchema.parse(cardData);
            await createMembershipCheckoutRequest(plan, MembershipPaymentMethodEnum.Card, token);
            navigate("/membership/checkout/result");
        } catch (err) {
            const message = await parseError(err, "No se pudo procesar el pago. Intentá nuevamente.");
            setIsSubmitting(false);
            // Rechaza la promesa que recibe el Card Payment Brick: así el Brick
            // sabe que el submit falló y deja reintentar en vez de quedar
            // colgado en estado "procesando".
            throw new Error(message);
        }
    };

    return { isSubmitting, error, startCheckoutRedirect, startCheckoutWithCard };
};

export default useMembershipCheckout;
