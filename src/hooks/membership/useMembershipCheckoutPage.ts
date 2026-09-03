import { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import type { RootState } from "../../store/auth/authSlice";
import { MembershipPaymentMethodEnum } from "@typings/membership/membershipEnums";
import type { CardPaymentSubmitData, UseMembershipCheckoutPageReturn } from "@typings/membership/membershipTypes";
import { useMembershipCheckoutPlan } from "./useMembershipCheckoutPlan";
import { useMembershipCheckout } from "./useMembershipCheckout";

// Toda la orquestación de /membership/checkout/:plan: resuelve el plan de la
// URL, el método de pago elegido, y expone `pay()`/`payWithCardToken()` sin
// que el .tsx tenga que armar closures. El plan es de la cuenta (no del
// kiosco activo), así que cualquier usuario autenticado puede pagar el suyo.
export const useMembershipCheckoutPage = (planParam: string | undefined): UseMembershipCheckoutPageReturn => {
    const { t } = useTranslation();
    const { plan, planDefinition, loading, error } = useMembershipCheckoutPlan(planParam);
    const { isSubmitting, error: checkoutError, startCheckoutRedirect, startCheckoutWithCard } = useMembershipCheckout();
    const [paymentMethod, setPaymentMethod] = useState(MembershipPaymentMethodEnum.Redirect);
    const [cardBrickError, setCardBrickError] = useState<string | null>(null);
    const payerEmail = useSelector((state: RootState) => state.auth.email);

    const pay = (): void => {
        if (!planDefinition) return;
        startCheckoutRedirect(planDefinition.id);
    };

    const payWithCardToken = async (cardData: CardPaymentSubmitData): Promise<void> => {
        if (!planDefinition) return;
        setCardBrickError(null);
        await startCheckoutWithCard(planDefinition.id, cardData);
    };

    // Errores "non_critical" del Brick pasan mientras el usuario todavía está
    // completando el formulario (ej. número de tarjeta incompleto) — el
    // propio Brick ya los muestra inline. Solo mostramos un mensaje propio
    // ante un error "critical" (ej. el SDK no pudo cargar los campos).
    const handleCardBrickError = (error: { type?: string }): void => {
        if (error.type !== "critical") return;
        setCardBrickError(t("membership.checkout.cardBrickError"));
    };

    return {
        plan,
        planDefinition,
        loading,
        error,
        isSubmitting,
        checkoutError: checkoutError ?? cardBrickError,
        paymentMethod,
        selectPaymentMethod: setPaymentMethod,
        payerEmail,
        pay,
        payWithCardToken,
        handleCardBrickError,
    };
};

export default useMembershipCheckoutPage;
