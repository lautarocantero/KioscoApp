import type { VerifyEmailStatusEnum } from "@typings/auth/authEnums";
import type { ReactNode } from "react";


export type ResponsiveWidth = string | { xs?: string; sm?: string; md?: string; lg?: string };

export type ButtonFontSize = "body1" | "body2";

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
  fontSize?: ButtonFontSize;
  id?: string;
}

export type OutlinedButtonComponentProps = Pick<
  PrimaryButtonComponentProps,
  "buttonText" | "buttonOnClick" | "buttonWidth" | "buttonType" | "icon" | "disabled" | "dataTestId" | "padding" | "fontSize"
>;

export interface BackButtonProps {
  align?: "left" | "center";
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

export interface VerificationFormButtonsProps {
    status: VerifyEmailStatusEnum;
    onGoToLogin: () => void;
    onGoToRegister: () => void;
}