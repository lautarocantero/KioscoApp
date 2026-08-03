// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🔒 BASE PRINCIPAL 🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒                     ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

import type { FormikProps } from "formik";
import type { checkingCredentials, login, logout } from "../../store/auth/authSlice";
import type { AuthRoleEnum, ResetPasswordStatusEnum, VerifyEmailStatusEnum } from "./authEnums";

interface AuthEntity {
    _id: string | null,
    username: string,
    email: string,
    password: string,
    repeatPassword: string,
    authToken: string,
    refreshToken: string,
    status: AuthStatus,
    profilePhoto?: string | null,
    role: AuthRoleEnum,
};

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🧩 DERIVADOS 🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩                ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export type Auth = AuthEntity;

export type AuthPublic = Omit<AuthEntity, 'password' | 'repeatPassword' | 'authToken' | 'refreshToken' | 'status'>;

export type AuthSliceState = Omit<Auth,  "password" | "repeatPassword" | "authToken" | "refreshToken"  > & {
    isLoading: boolean;
    isAuthenticated: boolean;
    errorMessage: string | null,
};

export interface UseSidebarUserDataReturn {
  userData: UserData | null;
  isLoading: boolean;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🍕 SLICE  🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export type AuthLoginSlicePayload = Pick<Auth, '_id' | 'username' |  'email' | 'profilePhoto' | 'role'>

export type AuthSliceErrorPayload = Pick<AuthSliceState, 'errorMessage'>;

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🔑 CREDENCIALES DE LOGIN 🔑🔑🔑🔑🔑🔑🔑🔑🔑🔑🔑🔑🔑🔑🔑🔑🔑🔑🔑        ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export type AuthCredentialsPayload = Pick<Auth, 'email' | 'password'> & {
    rememberMe: boolean;
};

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🕐 THUNKS 🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐                     ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export type AuthActionsType = 
  | ReturnType<typeof checkingCredentials> 
  | ReturnType<typeof login> 
  | ReturnType<typeof logout>
  ;

export type AuthLoginRequestPayload = AuthCredentialsPayload;

export type AuthRegisterRequestPayload = Pick<Auth, 'username' | 'email' | 'password' | 'repeatPassword' | 'profilePhoto' >

export interface AuthRegisterSanitizedPayload {
    sanitizedData: AuthRegisterRequestPayload;
}

export type AuthVerifyEmailApiPayload = {
  token: string;
};

export type AuthCheckAutResponse = Pick<Auth, '_id' | 'email' | 'password' | 'refreshToken' | 'username' >

export type AuthCheckAuthDataResponse = Pick<Auth, '_id'| 'username' | 'email' | 'profilePhoto' | 'role'>

// ─── Recuperación de contraseña ───────────────────────────
export type AuthRequestPasswordResetPayload = Pick<Auth, 'email'>;

export type AuthResetPasswordPayload = {
  token: string;
  newPassword: string;
  repeatNewPassword: string;
};

// Resultado uniforme para thunks que no tocan el estado global de auth
// (no hay login/logout de por medio, solo éxito o un mensaje de error puntual)
export type AuthAsyncActionResult = {
  success: boolean;
  errorMessage: string | null;
};

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🔗 API 🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗                          ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export type AuthRegisterApiPayload = Pick<Auth, 'username' | 'email' | 'password' | 'repeatPassword' | 'profilePhoto'>

export type AuthLoginApiPayload = AuthCredentialsPayload;

export interface AuthGoogleApiPayload {
  accessToken: string;
}

export type AuthGoogleRequestPayload = AuthGoogleApiPayload;

export type AuthRequestPasswordResetApiPayload = AuthRequestPasswordResetPayload;

export type AuthResetPasswordApiPayload = AuthResetPasswordPayload;

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 📝 FORMS  📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝     ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export type AuthLoginFormValues = AuthCredentialsPayload;

export type AuthRegisterFormValues = Pick<Auth, 'username' | 'email' | 'password' | 'repeatPassword'> & {
    profilePhoto: string | null;
    acceptedTerms: boolean;
};

export type AuthForgotPasswordFormValues = Pick<Auth, 'email'>;

export type AuthResetPasswordFormValues = Pick<AuthResetPasswordPayload, 'newPassword' | 'repeatNewPassword'>;

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🪝 HOOKS  🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝  ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface UseVerifyEmailFormReturn {
    status: VerifyEmailStatusEnum;
    errorMessage: string | null;
    handleGoToLogin: () => void;
    handleGoToRegister: () => void;
}

export type LogoutHandler = (reason: string) => void;

export interface UseLoginFormReturn {
    errorMessage: string | null;
    isSubmitting: boolean;
    handleGoToRegister: () => void;
    handleGoToForgotPassword: () => void;
    formik: FormikProps<AuthLoginFormValues>;
}

export interface UseRegisterFormReturn {
    errorMessage: string | null;
    isSubmitting: boolean;
    registeredUserId: string | null;
    handleSubmit: (values: AuthRegisterFormValues) => Promise<void>;
    handleGoToLogin: () => void;
}

export interface UseGoogleAuthReturn {
    handleGoogleSignIn: () => void;
    isLoading: boolean;
    error: string | null;
}

export interface UseForgotPasswordFormReturn {
    formik: FormikProps<AuthForgotPasswordFormValues>;
    isSubmitting: boolean;
    isSent: boolean;
    errorMessage: string | null;
    handleGoToLogin: () => void;
}

export interface UseResetPasswordFormReturn {
    formik: FormikProps<AuthResetPasswordFormValues>;
    status: ResetPasswordStatusEnum;
    errorMessage: string | null;
    isSubmitting: boolean;
    hasToken: boolean;
    handleGoToLogin: () => void;
    handleGoToForgotPassword: () => void;
}

/*══════════════════════════════════════════════════════════════════════╗
║ ██ ERRORS   🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨    ║ 
╚══════════════════════════════════════════════════════════════════════╝*/

export type AuthErrorMessageMap = Record<string, string>;