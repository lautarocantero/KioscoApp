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
