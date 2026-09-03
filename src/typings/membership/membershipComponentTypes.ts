import type { ReactNode } from "react";
import type { KioscoPlanEnum, MembershipBillingPeriodEnum } from "./membershipEnums";
import type {
    CardPaymentSubmitData,
    MembershipPlanDefinition,
    MembershipPlanPricing,
    MembershipPlanWithFeatures,
    MembershipStatus,
} from "./membershipTypes";

export interface MembershipPlanCardProps {
    plan: MembershipPlanWithFeatures;
    pricing: MembershipPlanPricing;
    billingPeriod: MembershipBillingPeriodEnum;
    isCurrent: boolean;
    isSubmitting: boolean;
    onSelect: (plan: KioscoPlanEnum) => void;
}

export interface MembershipCurrentPlanHeroProps {
    status: MembershipStatus;
    currentPlanDefinition: MembershipPlanDefinition | null;
}

export interface BillingPeriodToggleProps {
    value: MembershipBillingPeriodEnum;
    onChange: (period: MembershipBillingPeriodEnum) => void;
}

export interface PaymentMethodRowProps {
    icon: ReactNode;
    label: string;
    description?: string;
    badge?: string;
    selected?: boolean;
    disabled?: boolean;
    onSelect: () => void;
}

export interface CardPaymentBrickProps {
    amount: number;
    payerEmail: string;
    ready: boolean;
    onSubmit: (data: CardPaymentSubmitData) => Promise<void>;
    // Solo tomamos `type` del error que devuelve el Brick (non_critical vs
    // critical) — el resto de la forma de IBrickError es interna del SDK.
    onError: (error: { type?: string }) => void;
}
