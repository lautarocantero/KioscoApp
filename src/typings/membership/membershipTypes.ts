import type { KioscoPlanEnum, KioscoPlanStatusEnum } from "./membershipEnums";

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

//─────────────────────────── 📥 Estado 📥 ───────────────────────────//

export type MembershipStatus = {
    plan: KioscoPlanEnum;
    plan_status: KioscoPlanStatusEnum;
    next_payment_date: string | null;
};

//─────────────────────────── 📤 Checkout 📤 ───────────────────────────//

export type CreateMembershipCheckoutResult = {
    init_point: string;
    preapproval_id: string;
};

//─────────────────────────── 🪝 Hooks 🪝 ───────────────────────────//

export interface UseMembershipPlansReturn {
    plans: MembershipPlanWithFeatures[];
    loading: boolean;
    error: string | null;
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
    startCheckout: (plan: KioscoPlanEnum) => Promise<void>;
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
}

// Página /membership/checkout/:plan.
export interface UseMembershipCheckoutPageReturn {
    plan: KioscoPlanEnum | null;
    planDefinition: MembershipPlanWithFeatures | null;
    loading: boolean;
    error: string | null;
    isSubmitting: boolean;
    checkoutError: string | null;
    pay: () => void;
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
