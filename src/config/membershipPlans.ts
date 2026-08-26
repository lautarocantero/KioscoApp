import { KioscoPlanEnum } from "@typings/membership/membershipEnums";

// Claves de traducción de las ventajas mostradas en cada tier (ver
// membership.features.* en src/i18n/locales/{es,en}.ts). El precio/moneda
// real viene del backend (GET /membership/plans) — esto es solo copy.
export const MEMBERSHIP_PLAN_FEATURE_KEYS: Record<KioscoPlanEnum, string[]> = {
    [KioscoPlanEnum.Standard]: [
        "membership.features.standardSellers",
        "membership.features.standardKioscos",
        "membership.features.standardProducts",
        "membership.features.standardReports",
        "membership.features.standardSupport",
    ],
    [KioscoPlanEnum.Deluxe]: [
        "membership.features.deluxeSellers",
        "membership.features.deluxeKioscos",
        "membership.features.deluxeProducts",
        "membership.features.deluxeReports",
        "membership.features.deluxeHistory",
        "membership.features.deluxeNotifications",
        "membership.features.deluxeSupport",
    ],
};

// Tier destacado con la etiqueta "Más elegido" en la UI.
export const MEMBERSHIP_POPULAR_PLAN = KioscoPlanEnum.Deluxe;

// Orden en el que se muestran las cards (el back devuelve los planes sin
// orden garantizado — Object.values de un Record).
export const MEMBERSHIP_PLAN_ORDER: KioscoPlanEnum[] = [
    KioscoPlanEnum.Standard,
    KioscoPlanEnum.Deluxe,
];
