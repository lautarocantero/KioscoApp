import type { PaymentMethod } from "./sellsEnum";
import type { SellsPeriodEnum } from "./enums";

export type SellsPeriodRange = {
    from: Date;
    to: Date;
    compareFrom: Date;
    compareTo: Date;
};

export type SellsKpiTrend = "up" | "down" | "flat";

export type SellsPeriodKpi = {
    value: number;
    previousValue: number;
    variationPct: number | null;
    trend: SellsKpiTrend;
};

// "A cobrar" (ventas parciales sin saldar) queda fuera de este tipo a
// propósito: no es un dato del período seleccionado, es un estado vigente
// del negocio (una deuda no deja de existir porque quedó fuera del rango
// de 7 días) — ver SellsPartialsAlertSummary, que alimenta tanto la barra
// de alerta como el 4to KPI de la banda.
export type SellsPeriodKpis = {
    sales: SellsPeriodKpi;
    ticketsCount: SellsPeriodKpi;
    averageTicket: SellsPeriodKpi;
    ticketsPerDay: number;
    productsPerTicket: number;
};

export type SellsDominantPaymentMethodFact = {
    method: PaymentMethod;
    sharePct: number;
} | null;

export type SellsPeakHourFact = {
    startHour: number;
    endHour: number;
    ticketSharePct: number;
} | null;

export type SellsTopSellerFact = {
    sellerName: string;
    totalAmount: number;
} | null;

export type SellsFactsSummary = {
    dominantPaymentMethod: SellsDominantPaymentMethodFact;
    peakHour: SellsPeakHourFact;
    topSeller: SellsTopSellerFact;
};

export type SellsPartialsAlertSummary = {
    count: number;
    totalAmount: number;
    oldestDebtDays: number | null;
};

export type SellsPeriodDisabledReason = "plan" | "admin" | null;

export type SellsPeriodOptionAvailability = {
    canSelect: boolean;
    disabledReason: SellsPeriodDisabledReason;
};

export type SellsPeriodOptionsAvailability = Record<SellsPeriodEnum, SellsPeriodOptionAvailability>;

export type SellsSparklinePoint = {
    date: string;
    label: string;
    total: number;
};

export type UseSellsContextBandReturn = {
    period: SellsPeriodEnum;
    setPeriod: (period: SellsPeriodEnum) => void;
    periodAvailability: SellsPeriodOptionsAvailability;
    periodRange: SellsPeriodRange;
    kpis: SellsPeriodKpis;
    sparkline: SellsSparklinePoint[];
    sparklineBestDay: SellsSparklinePoint | null;
    facts: SellsFactsSummary;
    partialsAlert: SellsPartialsAlertSummary;
    hasSellsInPeriod: boolean;
};
