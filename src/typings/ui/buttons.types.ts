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
}

export interface EmptyButtonProps {
  buttonText: string;
  buttonOnClick: () => void;
  buttonWidth?: ResponsiveWidth;
}

export interface NavButtonsProps {
    SubmitText?:  string;
    backPath?:    string;
    readOnly?:    boolean;
}
