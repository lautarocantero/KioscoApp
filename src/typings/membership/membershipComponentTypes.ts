import type { ReactNode } from "react";
import type { KioscoPlanEnum } from "./membershipEnums";
import type { MembershipPlanWithFeatures, MembershipStatus } from "./membershipTypes";

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
}
