import { KioscoPlanEnum } from "@typings/membership/membershipEnums";

// Claves de traducción de las ventajas mostradas en cada tier (ver
// membership.features.* en src/i18n/locales/{es,en}.ts). El precio/moneda
// real viene del backend (GET /membership/plans) — esto es solo copy.
export const MEMBERSHIP_PLAN_FEATURE_KEYS: Record<KioscoPlanEnum, string[]> = {
    [KioscoPlanEnum.Stocko]: [
        "membership.features.stockoSellers",
        "membership.features.stockoKioscos",
        "membership.features.stockoProducts",
        "membership.features.stockoReports",
        "membership.features.stockoSupport",
    ],
    [KioscoPlanEnum.SuperStocko]: [
        "membership.features.superSellers",
        "membership.features.superKioscos",
        "membership.features.superProducts",
        "membership.features.superReports",
        "membership.features.superHistory",
        "membership.features.superSupport",
    ],
    [KioscoPlanEnum.MaxiStocko]: [
        "membership.features.maxiSellers",
        "membership.features.maxiKioscos",
        "membership.features.maxiProducts",
        "membership.features.maxiReports",
        "membership.features.maxiNotifications",
        "membership.features.maxiSupport",
    ],
};

// Tier destacado con la etiqueta "Más elegido" en la UI.
export const MEMBERSHIP_POPULAR_PLAN = KioscoPlanEnum.SuperStocko;

// Orden en el que se muestran las cards (el back devuelve los planes sin
// orden garantizado — Object.values de un Record).
export const MEMBERSHIP_PLAN_ORDER: KioscoPlanEnum[] = [
    KioscoPlanEnum.Stocko,
    KioscoPlanEnum.SuperStocko,
    KioscoPlanEnum.MaxiStocko,
];
