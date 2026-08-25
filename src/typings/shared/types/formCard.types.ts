import type { IconConfig } from "@typings/presentation/presentationTypes";
import type { ReactNode, FormEvent } from "react";
import type { FormikErrors } from "formik";
import type { FormModeComplexEnum } from "@typings/shared/sharedEnums";

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
    type?: "text" | "number" | "date" | "select"  | "radio" | "rating" ;
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
    // solo para type: "rating" — cantidad de estrellas, default 5
    maxRating?: number;
}

export interface SelectFieldProps<T extends object, C extends string> {
    name: keyof T & string;
    label: string;
    options: readonly C[];
    getOptionLabel: (value: C) => string;
    multiple?: boolean;
    allowClear?: boolean;
    clearLabel?: string;
    disabled?: boolean;
}

export type FieldRegistry<T> = Partial<Record<keyof T, FieldConfig>>;

export interface FormFieldsRendererProps<T extends object> {
    fields: (keyof T)[];
    registry: FieldRegistry<T>;
    icons?: Partial<Record<keyof T, IconConfig>>;
    readOnly?: boolean;
    disabledFields?: (keyof T)[];
    disabledTooltip?: Partial<Record<keyof T, string>>;
    sectionLabel: string;
    idPrefix: string;
    renderBeforeField?: Partial<Record<keyof T, ReactNode>>;
    renderAfterField?: Partial<Record<keyof T, ReactNode>>;
}

export interface FieldDisplayState {
    fieldError: string | undefined;
    fieldValue: unknown;
    helperId: string;
    inputId: string;
    isFirstField: boolean;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 💱 NAVIGATION CONTEXT — compartido por todos los forms 💱💱💱💱💱💱💱💱  ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface FormNavigationContextType<TValues = any> {
    currentStep:  number;
    totalSteps:   number;
    isSubmitting: boolean;
    submitError:  string | null;
    stepErrors:   string[];
    onNext: (
        validateForm: () => Promise<FormikErrors<TValues>>,
        onValidSubmit?: () => void,
    ) => Promise<void>;
    onPrev:        () => void;
    onSubmit:      (e?: FormEvent<HTMLFormElement>) => void;
    validateForm?: () => Promise<FormikErrors<TValues>>;
    actionTitle?:  FormModeComplexEnum;
}