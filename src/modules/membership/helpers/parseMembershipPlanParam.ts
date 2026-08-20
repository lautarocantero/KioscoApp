import { z } from "zod";
import { KioscoPlanEnum } from "@typings/membership/membershipEnums";

const MembershipPlanParamSchema = z.nativeEnum(KioscoPlanEnum);

// Valida el :plan de la URL (/membership/checkout/:plan) contra los tiers
// reales antes de usarlo para nada — es un param de ruta, entrada externa
// que el usuario puede tipear a mano.
export const parseMembershipPlanParam = (value: string | undefined): KioscoPlanEnum | null => {
    const result = MembershipPlanParamSchema.safeParse(value);
    return result.success ? result.data : null;
};
