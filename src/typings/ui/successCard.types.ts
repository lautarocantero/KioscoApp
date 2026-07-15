export interface SuccessCardContent {
    name:      string;
    title:     string;
    subtitle:  string;
    timeline?: React.ReactNode;
}

export interface SuccessCardAction {
    label:   string;
    onClick: () => void;
    variant: "contained" | "outlined";
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