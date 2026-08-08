import type { Theme } from "@emotion/react";
import type { IconButtonProps, SxProps } from "@mui/material";
import type { SellStatusEnum } from "@typings/sells/sellsEnum";
import type { StatusColorEnum } from "@typings/ui/uiEnums";
import type { ComponentType, JSXElementConstructor, ReactElement, ReactNode } from "react";


export interface ActualStepComponentProps {
    currentStep: number;
    stepComponents: ComponentType[];
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
    icon?: ReactElement<unknown, string | JSXElementConstructor<any>> | undefined;
    isMultiStep?: boolean;
    stepsLabels?: string[];
    currentStep?: number;
    status?: SellStatusEnum;
}

export interface FormHeaderDefaultIconProps {
    color: string;
}

export interface FormHeaderIconBoxProps {
    icon?: ReactElement<unknown, string | JSXElementConstructor<any>> | undefined;
}

export interface FormHeaderTitleBlockProps {
    title: string;
    subtitle?: string;
}

export interface FormHeaderStatusChipProps {
    status?: SellStatusEnum;
}

export interface FormHeaderStepsTimelineMobileProps {
    stepsLabels: string[];
    currentStep: number;
}

export interface FormHeaderStepsTimelineProps {
    stepsLabels: string[];
    currentStep: number;
    isMobile: boolean;
}

export interface FormHeaderStepsTimelineDesktopProps {
    stepsLabels: string[];
    currentStep: number;
}

export interface FormHeaderProgressCircleProps {
    currentStep: number;
    stepsLabels: string[];
}

export interface FormHeaderStatusConfigEntry {
    label: string;
    icon: ReactElement;
    accent: StatusColorEnum;
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
    icon?: ReactNode;
    onClick: () => void;
}

export interface FormCardFooterProps extends FormNavActionsProps, FormErrorsProps {
    backText?:  string;
}

export type ApiErrorComponentProps = FormErrorsProps;


export interface FormCardProps extends FormNavActionsProps, FormErrorsProps {
    backText?: string;
    children: ReactNode;
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
    exactMatch?: boolean;
    onToggleExactMatch?: () => void;
}