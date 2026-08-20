import type { KioscoPlanEnum } from "@typings/membership/membershipEnums";
import { KioscoPlanStatusEnum } from "@typings/membership/membershipEnums";
import type { MembershipStatus } from "@typings/membership/membershipTypes";

// Un plan se muestra como "actual" (botón deshabilitado, sin badge de venta)
// solo si es el plan activo del kiosco — no alcanza con que coincida el id:
// si plan_status es pending_payment/cancelled, el kiosco no está usando ese
// tier todavía/ya no, así que sigue siendo elegible.
export const isCurrentActivePlan = (status: MembershipStatus | null, planId: KioscoPlanEnum): boolean => {
    if (!status) return false;
    return status.plan === planId && status.plan_status === KioscoPlanStatusEnum.Active;
};
