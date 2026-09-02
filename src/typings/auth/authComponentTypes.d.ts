import type { FormikErrors } from "formik";
import type { PropsWithChildren } from "react";
import type { AuthLoginFormValues, AuthRegisterFormValues } from "./authTypes";
import type { ResetPasswordStatusEnum } from "./authEnums";

/*══════════════════════════════════════════════════════════════════════╗
║ ██ LAYOUT   🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱   ║
╚══════════════════════════════════════════════════════════════════════╝*/

export interface AuthLayoutProps extends PropsWithChildren {
  tagline?: string;
}

export interface AuthBrandPanelProps {
  tagline: string;
}

export interface AuthPageHeadingProps {
  eyebrow: string;
  title: string;
}

export interface AuthBrandVideoProps {
  onEnded: () => void;
  onContextMenu: (event: React.MouseEvent<HTMLVideoElement>) => void;
}

/*══════════════════════════════════════════════════════════════════════╗
║ ██ BUTTONS   🟦 🟩 🟥 🟨🟦 🟩 🟥 🟨🟦 🟩 🟥 🟨🟦 🟩 🟥 🟨🟦 🟩 🟥 🟨   ║
╚══════════════════════════════════════════════════════════════════════╝*/

export interface LoginFormButtonsInterface {
  errors: FormikErrors<AuthLoginFormValues>;
  isSubmitting: boolean;
  onGoToRegister: () => void;
}

export interface RegisterFormButtonsInterface {
  errors: FormikErrors<AuthRegisterFormValues>;
  isSubmitting: boolean;
  onGoToLogin: () => void;
  disabled: boolean;
}

/*══════════════════════════════════════════════════════════════════════╗
║ ██ FORMS   📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝     
╚══════════════════════════════════════════════════════════════════════╝*/

export interface PasswordFieldProps {
    name: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    error?: boolean;
    helperText?: string;
    ariaLabel: string;
    label?: string;
}

export interface LoginFormInputsInterface {
  values: AuthLoginFormValues;
  setFieldValue: (field: string, value: string) => void;
  errors: FormikErrors<AuthLoginFormValues>;
}

export interface RegisterFormInputsInterface {
  values: AuthRegisterFormValues;
  setFieldValue: (field: string, value: string) => void;
  errors: FormikErrors<AuthRegisterFormValues>;
}

export interface SuccessOnRegisterInterface {
  isSuccess: boolean;
  secondsLeft: number;
}

export interface AskForLinkInterface {
  hasToken: boolean;
  errorMessage?: string | null;
  handleGoToForgotPassword: () => void;
};

export interface ResetPasswordSuccessInterface {
  status: ResetPasswordStatusEnum;
  handleGoToLogin:() => void;
};

export interface ResetPasswordFormInterface {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  values: any;
  setFieldValue: (field: string, value: string) => void;
  errors: FormikErrors<any>;
  isSubmitting: boolean;
  errorMessage: string | null;
  status: ResetPasswordStatusEnum;
}

export interface ResetPasswordInputsInterface {
  values: any;
  setFieldValue: (field: string, value: string) => void;
  errors: FormikErrors<any>;
}

export interface ResetPasswordErrorInterface {
  status: ResetPasswordStatusEnum;
  errorMessage: string | null;
}

export interface ResetPasswordButtonsInterface {
  errors: FormikErrors<any>;
  isSubmitting: boolean;
}