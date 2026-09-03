import type { KioscoPlanEnum, KioscoPlanStatusEnum, MembershipBillingPeriodEnum, MembershipPaymentMethodEnum } from "./membershipEnums";

//─────────────────────────── 💳 Plan (API) 💳 ───────────────────────────//

// Espejo de MembershipPlanDefinition en el back: precio/moneda, fuente de
// verdad del monto que se cobra. El copy de marketing (features) NO viene
// del back, se agrega localmente (MEMBERSHIP_PLAN_FEATURE_KEYS).
export type MembershipPlanDefinition = {
    id: KioscoPlanEnum;
    name: string;
    price: number;
    currency_id: string;
};

// Plan + claves de traducción de sus ventajas + si es el tier destacado
// ("Más elegido"). Lo arma useMembershipPlans combinando la respuesta del
// back con la config local de features.
export type MembershipPlanWithFeatures = MembershipPlanDefinition & {
    featureKeys: string[];
    isPopular: boolean;
};

// Salida de computeMembershipPlanPricing: precio a mostrar según el período
// elegido en el toggle. totalForTerm/savingsForTerm son null en Monthly (no
// hay "término" que mostrar) — ver nota de MembershipBillingPeriodEnum:
// esto es una previsualización local, el back sigue cobrando mensual.
export type MembershipPlanPricing = {
    period: MembershipBillingPeriodEnum;
    monthlyEquivalent: number;
    totalForTerm: number | null;
    savingsForTerm: number | null;
};

//─────────────────────────── 📥 Estado 📥 ───────────────────────────//

export type MembershipStatus = {
    plan: KioscoPlanEnum;
    plan_status: KioscoPlanStatusEnum;
    next_payment_date: string | null;
};

//─────────────────────────── 📤 Checkout 📤 ───────────────────────────//

export type CreateMembershipCheckoutResult = {
    // Ausente cuando el checkout se autoriza directamente con card_token_id
    // (Card Payment Brick) — no hay checkout hospedado al que redirigir.
    init_point?: string;
    preapproval_id: string;
};

// Único dato que tomamos del payload que devuelve el Card Payment Brick al
// hacer submit — el resto (installments, payment_method_id, issuer_id) es
// propio de pagos únicos y no aplica a una suscripción mensual recurrente.
export type CardPaymentSubmitData = {
    token: string;
};

//─────────────────────────── 🪝 Hooks 🪝 ───────────────────────────//

export interface UseMembershipPlansReturn {
    plans: MembershipPlanWithFeatures[];
    loading: boolean;
    error: string | null;
}

export interface UseMembershipBillingPeriodReturn {
    billingPeriod: MembershipBillingPeriodEnum;
    setBillingPeriod: (period: MembershipBillingPeriodEnum) => void;
}

export interface UseMembershipStatusReturn {
    status: MembershipStatus | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export interface UseMembershipCheckoutReturn {
    isSubmitting: boolean;
    error: string | null;
    startCheckoutRedirect: (plan: KioscoPlanEnum) => Promise<void>;
    startCheckoutWithCard: (plan: KioscoPlanEnum, cardData: CardPaymentSubmitData) => Promise<void>;
}

export interface UseMembershipCheckoutPlanReturn {
    plan: KioscoPlanEnum | null;
    planDefinition: MembershipPlanWithFeatures | null;
    loading: boolean;
    error: string | null;
}

// Página Settings > Membresía: la fila "plan actual + botón Cambiar plan".
// El plan es de la cuenta (no del kiosco), así que no hay gate de rol acá.
export interface UseMembershipSectionReturn {
    status: MembershipStatus | null;
    loading: boolean;
    error: string | null;
    goToPlans: () => void;
}

// Página /membership/plans: status actual + las 2 cards de tier.
export interface UseMembershipPlansPageReturn {
    status: MembershipStatus | null;
    statusLoading: boolean;
    statusError: string | null;
    plans: MembershipPlanWithFeatures[];
    plansLoading: boolean;
    plansError: string | null;
    selectPlan: (plan: KioscoPlanEnum) => void;
    isPlanCurrent: (plan: KioscoPlanEnum) => boolean;
    // Plan completo (con precio) del tier activo de la cuenta, para el hero
    // de "Tu plan actual" — se busca en `plans` por status.plan, no pide
    // nada nuevo al backend.
    currentPlanDefinition: MembershipPlanDefinition | null;
    billingPeriod: MembershipBillingPeriodEnum;
    setBillingPeriod: (period: MembershipBillingPeriodEnum) => void;
    getPlanPricing: (plan: MembershipPlanDefinition) => MembershipPlanPricing;
}

// Página /membership/checkout/:plan.
export interface UseMembershipCheckoutPageReturn {
    plan: KioscoPlanEnum | null;
    planDefinition: MembershipPlanWithFeatures | null;
    loading: boolean;
    error: string | null;
    isSubmitting: boolean;
    checkoutError: string | null;
    paymentMethod: MembershipPaymentMethodEnum;
    selectPaymentMethod: (method: MembershipPaymentMethodEnum) => void;
    payerEmail: string;
    pay: () => void;
    payWithCardToken: (cardData: CardPaymentSubmitData) => Promise<void>;
    handleCardBrickError: (error: { type?: string }) => void;
}

// Inicialización del SDK de Mercado Pago (Card Payment Brick) — expone si ya
// está lista para usarse, para no romper la página si VITE_MP_PUBLIC_KEY no
// está configurada todavía (mismo espíritu que "sin MP_ACCESS_TOKEN el
// backend sigue funcionando").
export interface UseMercadoPagoSdkReturn {
    ready: boolean;
    error: string | null;
}

// Página /membership/checkout/result: status + vista derivada (nombre del
// plan ya traducido, y a qué mensaje/estado corresponde).
export interface UseMembershipCheckoutResultReturn {
    status: MembershipStatus | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
    planName: string;
    isActive: boolean;
    isCancelled: boolean;
    goToShop: () => void;
}
