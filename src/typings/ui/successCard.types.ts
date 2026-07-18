import type { ReactNode } from "react";

export interface SuccessCardContent {
    name:      string;
    title:     string;
    subtitle:  string;
    timeline?: ReactNode;
}

export interface SuccessCardAction {
    label:   string;
    onClick: () => void;
    variant: "contained" | "outlined";
    icon: ReactNode;
}

export interface SuccessCardProps extends SuccessCardContent {
    actions: SuccessCardAction[];
}

export interface SuccessCardActionsProps {
    actions: SuccessCardAction[];
}

export interface SuccessCardBodyProps extends SuccessCardContent {
    showSuccessIcon?: boolean;
}

export interface SuccessCardNameProps extends Pick<SuccessCardContent, "name"> {}