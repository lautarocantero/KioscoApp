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
