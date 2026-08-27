import type { SellsPeriodEnum } from "./enums";
import type {
    SellsFactsSummary,
    SellsPartialsAlertSummary,
    SellsPeriodKpis,
    SellsPeriodOptionsAvailability,
    SellsSparklinePoint,
} from "./types";

export interface SellsPeriodSelectorProps {
    ariaLabel: string;
    period: SellsPeriodEnum;
    options: SellsPeriodEnum[];
    availability: SellsPeriodOptionsAvailability;
    onChange: (period: SellsPeriodEnum) => void;
    rangeLabel: string;
}

export interface SellsKpiTileProps {
    label: string;
    value: string;
    chipLabel: string;
    chipTone: "positive" | "attention" | "neutral";
    subLabel?: string;
    accentColor?: string;
    bordered?: boolean;
}

export interface SellsKpiGridProps {
    kpis: SellsPeriodKpis;
    partialsAlert: SellsPartialsAlertSummary;
    hasSellsInPeriod: boolean;
}

export interface SellsSparklineProps {
    points: SellsSparklinePoint[];
    bestDay: SellsSparklinePoint | null;
    ariaLabel: string;
}

export interface SellsFactsStripProps {
    facts: SellsFactsSummary;
}

export interface SellsPartialsAlertBarProps {
    alert: SellsPartialsAlertSummary;
    onViewPartials: () => void;
}

export interface SellsContextBandSkeletonProps {
    showAlertPlaceholder?: boolean;
}

export interface SellsContextBandProps {
    period: SellsPeriodEnum;
    periodOptions: SellsPeriodEnum[];
    periodAvailability: SellsPeriodOptionsAvailability;
    onPeriodChange: (period: SellsPeriodEnum) => void;
    rangeLabel: string;
    kpis: SellsPeriodKpis;
    sparkline: SellsSparklinePoint[];
    sparklineBestDay: SellsSparklinePoint | null;
    facts: SellsFactsSummary;
    partialsAlert: SellsPartialsAlertSummary;
    hasSellsInPeriod: boolean;
    loading: boolean;
    error: string | null;
    onViewPartials: () => void;
}
