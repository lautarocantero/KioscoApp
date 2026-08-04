import type { FormikErrors } from "formik";
import type { AuthLoginFormValues, AuthRegisterFormValues } from "./authTypes";

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