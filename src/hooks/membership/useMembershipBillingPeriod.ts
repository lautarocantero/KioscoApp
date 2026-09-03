import { useState } from "react";
import { MembershipBillingPeriodEnum } from "@typings/membership/membershipEnums";
import type { UseMembershipBillingPeriodReturn } from "@typings/membership/membershipTypes";

// Estado del toggle "Mensual / 6 meses" en /membership/plans. Vive en su
// propio hook (en vez de un useState suelto en useMembershipPlansPage) para
// que el .tsx y el resto del hook no se acoplen a cómo se guarda ese
// estado.
export const useMembershipBillingPeriod = (): UseMembershipBillingPeriodReturn => {
    const [billingPeriod, setBillingPeriod] = useState(MembershipBillingPeriodEnum.Monthly);

    return { billingPeriod, setBillingPeriod };
};

export default useMembershipBillingPeriod;
