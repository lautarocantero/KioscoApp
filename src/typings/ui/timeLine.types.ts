import type { ReactNode } from "react";

export interface TimelineStepConfig {
    icon:  ReactNode;
    label: string;
}

export interface CreationTimelineProps {
    /** Paso anterior, ya completado — ícono neutro a la izquierda */
    previousStep: TimelineStepConfig;
    /** Paso siguiente, pendiente — ícono neutro a la derecha */
    nextStep: TimelineStepConfig;
    maxWidth?: number | string;
}