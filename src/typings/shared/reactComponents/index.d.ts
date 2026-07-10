import type React from "react";


export interface ActualStepComponentProps {
    currentStep: number;
    stepComponents: ComponentType[];
}


export interface FormCardHeaderProps {
    title: string;
    subtitle?: string;
    icon?: ReactNode;
    isMultiStep?: boolean;
    stepsLabels?: string[];
    currentStep?: number;
}


export interface FormCardFooterProps {
    stepErrors?: string[];
    submitError?: string | null;
}


export interface FormCardProps {
    children:     React.ReactNode;
    submitText?:  string;
    showButtons?: boolean;
    readOnly?:    boolean;
    backPath?:    string;
    maxWidth?:    number | string;
    header?: Pick<FormCardHeaderProps, "title" | "subtitle" | "icon">;
    multiStepHeader?: {
        stepsLabels: string[];
        currentStep: number;
    };
    accordion?: {
        title: string;
        content: string;
        defaultExpanded?: boolean;
        bannerImage?: {
            src: string;
            alt: string;
            maxHeight?: number | string;
        };
    };
}