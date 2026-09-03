import type { ReactNode } from "react";
import type { KioscoPlanEnum } from "./membershipEnums";
import type { CardPaymentSubmitData, MembershipPlanWithFeatures, MembershipStatus } from "./membershipTypes";

export interface MembershipPlanCardProps {
    plan: MembershipPlanWithFeatures;
    isCurrent: boolean;
    isSubmitting: boolean;
    onSelect: (plan: KioscoPlanEnum) => void;
}

export interface MembershipCurrentPlanSummaryProps {
    status: MembershipStatus;
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
