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
    type?: "text" | "number" | "date" | "select"  | "radio" ;
    radioOptions?: { value: string; label: string }[];
    required?: boolean;
    multiline?: boolean;
    rows?: number;
    step?: string;
    helperTextWhenEmpty?: string;
    min?: string;
    // solo para type: "select"
    multiple?: boolean;
    options?: readonly string[];
    getOptionLabel?: (value: string) => string;
    allowClear?: boolean;
    clearLabel?: string;
}

export interface SelectFieldProps<T extends object, C extends string> {
    name: keyof T & string;
    label: string;
    options: readonly C[];
    getOptionLabel: (value: C) => string;
    multiple?: boolean;
    allowClear?: boolean;
    clearLabel?: string;
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

export interface FieldDisplayState {
    fieldError: string | undefined;
    fieldValue: unknown;
    helperId: string;
    inputId: string;
    isFirstField: boolean;
}