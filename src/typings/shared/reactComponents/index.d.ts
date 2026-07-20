import type { SellStatusEnum } from "@typings/sells/sellsEnum";
import type { ReactNode } from "react";
import type React from "react";


export interface ActualStepComponentProps {
    currentStep: number;
    stepComponents: React.ComponentType[];
}


export interface FormErrorsProps {
    submitError?: string | null;
    stepErrors?: string[];
}


export interface FormNavActionsProps {
    submitText?:  string;
    showButtons?: boolean;
    readOnly?:    boolean;
    defaultBack?:    string;
}


export interface FormCardHeaderProps {
    title: string;
    subtitle?: string;
    icon?: React.ReactNode;
    isMultiStep?: boolean;
    stepsLabels?: string[];
    currentStep?: number;
    status?: SellStatusEnum;
}


export interface MultiStepHeaderConfig {
    stepsLabels: string[];
    currentStep: number;
}


export interface BannerImageConfig {
    src: string;
    alt: string;
    maxHeight?: number | string;
}


export interface AccordionConfig {
    title: string;
    content: string;
    defaultExpanded?: boolean;
    bannerImage?: BannerImageConfig;
}

export interface FormCardExtraActionProps {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
}

export interface FormCardFooterProps extends FormNavActionsProps, FormErrorsProps {
}

export type ApiErrorComponentProps = FormErrorsProps;


export interface FormCardProps extends FormNavActionsProps, FormErrorsProps {
    children: React.ReactNode;
    maxWidth?: number | string;
    header?: Pick<FormCardHeaderProps, "title" | "subtitle" | "icon" | "status">;
    multiStepHeader?: MultiStepHeaderConfig;
    accordion?: AccordionConfig;
}

export interface BackPathProps extends Omit<IconButtonProps, "onClick"> {
    defaultBack: string;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ Search Bar                                                          ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onClear?: () => void;
  showShortcutHint?: boolean;
  shortcutHint?: string;
  sx?: SxProps<Theme>;
  fullWidth?: boolean;
}