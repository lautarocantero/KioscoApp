import { z } from "zod";
import { KioscoPlanEnum, KioscoPlanStatusEnum } from "@typings/membership/membershipEnums";

// Valida las respuestas de /membership antes de confiar en ellas (rule 9):
// vienen de la red, no del tipado estático de TS.

export const MembershipPlanDefinitionSchema = z.object({
    id: z.nativeEnum(KioscoPlanEnum),
    name: z.string(),
    price: z.number(),
    currency_id: z.string(),
});

export const MembershipPlanListSchema = z.array(MembershipPlanDefinitionSchema);

export const MembershipStatusSchema = z.object({
    plan: z.nativeEnum(KioscoPlanEnum),
    plan_status: z.nativeEnum(KioscoPlanStatusEnum),
    next_payment_date: z.string().nullable(),
});

// init_point es la URL de Mercado Pago a la que redirigimos con
// window.location.href: se valida que sea realmente un link de Mercado Pago
// antes de usarla, para no seguir una URL inesperada ante una respuesta
// corrupta del backend.
export const CreateMembershipCheckoutResultSchema = z.object({
    init_point: z.string().url().refine(
        (url) => new URL(url).hostname.endsWith("mercadopago.com") || new URL(url).hostname.endsWith("mercadopago.com.ar"),
        { message: "init_point must be a Mercado Pago URL" },
    ),
    preapproval_id: z.string(),
});
