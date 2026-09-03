// Espejo exacto de KioscoPlanEnum/KioscoPlanStatusEnum en el back
// (@typings/membership/enums). No confundir con KioscoMembership: eso es
// la relación usuario↔kiosco, esto es el tier de suscripción del kiosco.
export enum KioscoPlanEnum {
    Standard = "standard",
    Deluxe = "deluxe",
}

export enum KioscoPlanStatusEnum {
    Active = "active",
    PendingPayment = "pending_payment",
    Cancelled = "cancelled",
}

// Cómo se autoriza la preapproval de Mercado Pago: redirigiendo al checkout
// hospedado (init_point) o con un card_token_id tokenizado en el cliente
// (Card Payment Brick) para autorizarla sin salir de la app. Espejo exacto
// del enum del backend.
export enum MembershipPaymentMethodEnum {
    Redirect = "redirect",
    Card = "card",
}

// A diferencia de los enums de arriba, este NO es espejo del back: el
// backend no tiene concepto de período de facturación (GET
// /membership/plans siempre devuelve precio mensual). Es el estado del
// toggle "Mensual / 6 meses" en /membership/plans — solo cambia qué precio
// se previsualiza en las cards, no lo que se cobra en el checkout.
export enum MembershipBillingPeriodEnum {
    Monthly = "monthly",
    Semiannual = "semiannual",
}
