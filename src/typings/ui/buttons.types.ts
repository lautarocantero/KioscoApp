import type { ReactNode } from "react";


export type ResponsiveWidth = string | { xs?: string; sm?: string; md?: string; lg?: string };

export interface PrimaryButtonComponentProps {
  buttonText: string;
  buttonOnClick: () => void;
  buttonWidth?: ResponsiveWidth;
  buttonType?: "button" | "reset" | "submit";
  buttonColor?: "default" | "error";
  dataTestId?: "default" | (string & {});
  padding?: number;
  marginTop?: string,
  icon?: ReactNode,
  disabled?: boolean;
}

export interface EmptyButtonProps {
  buttonText: string;
  buttonOnClick: () => void;
  buttonWidth?: ResponsiveWidth;
  color?: "default" | "main";
}

export interface FormNavButtonsProps {
    SubmitText?:  string;
    backText?: string; 
    defaultBack?:    string;
    readOnly?:    boolean;
}

export type UseFormNavButtonsParams = {
    defaultBack: string;
    backText?: string;
    readOnly?: boolean;
};

export interface GoogleAuthButtonProps {
    label?: string;
}