import type { IconConfig } from "@typings/presentation/presentationTypes";
import type { ReactNode } from "react";

export interface StepConfig {
    title: string;
    content: React.ReactNode;
}


export interface StepState {
    currentStep: number;
    title: string;
    content: React.ReactNode;
}

export interface FieldConfig {
    label: string;
    placeholder?: string;
    tooltip: string;
    type?: "text" | "number" | "date";
    required?: boolean;
    multiline?: boolean;
    rows?: number;
    step?: string;
    helperTextWhenEmpty?: string;
}

export type FieldRegistry<T> = Partial<Record<keyof T, FieldConfig>>;

export interface FormFieldsRendererProps<T extends object> {
    fields: (keyof T)[];
    registry: FieldRegistry<T>;
    icons?: Partial<Record<keyof T, IconConfig>>;
    readOnly?: boolean;
    sectionLabel: string;
    idPrefix: string;
    renderAfterField?: Partial<Record<keyof T, ReactNode>>;
}