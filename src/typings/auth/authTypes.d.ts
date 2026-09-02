// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🔒 BASE PRINCIPAL 🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒                     ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

import type { FormikProps } from "formik";
import type { checkingCredentials, login, logout } from "../../store/auth/authSlice";
import type { ResetPasswordStatusEnum, VerifyEmailStatusEnum } from "./authEnums";

// El rol ya no vive en Auth: es por-kiosco (ver @typings/kioscoMembership en
// el back, y KioscoWithStats.role en el front). Auth solo guarda identidad.
interface AuthEntity {
    _id: string | null,
    name: string,
    email: string,
    password: string,
    repeatPassword: string,
    authToken: string,
    refreshToken: string,
    status: AuthStatus,
    profilePhoto?: string | null,
    isVerified: boolean,
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

export type AuthLoginSlicePayload = Pick<Auth, '_id' | 'name' | 'email' | 'profilePhoto' | 'isVerified'>

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

export type AuthRegisterRequestPayload = Pick<Auth, 'name' | 'email' | 'password' | 'repeatPassword' | 'profilePhoto' >

export interface AuthRegisterSanitizedPayload {
    sanitizedData: AuthRegisterRequestPayload;
}

export type AuthVerifyEmailApiPayload = {
  token: string;
};

// ⚠️ No encontré ningún uso de este tipo en authApi/authStoreThunks/authSlice.
// Si nada más lo usa, es candidato a borrar: 'password' y 'refreshToken' no
// deberían tener un tipo dedicado a "lo que vuelve del checkAuth", porque el
// backend ya no los expone ahí (nunca lo hizo, en rigor).
export type AuthCheckAutResponse = Pick<Auth, '_id' | 'email' | 'password' | 'refreshToken' | 'name' >

export type AuthCheckAuthDataResponse = Pick<Auth, '_id'| 'name' | 'email' | 'profilePhoto' | 'isVerified'>

// ─── Recuperación de contraseña ───────────────────────────
export type AuthRequestPasswordResetPayload = Pick<Auth, 'email'>;

export type AuthResetPasswordPayload = {
  token: string;
  newPassword: string;
  repeatNewPassword: string;
};

// 🚧 BYPASS TEMPORAL (sin Resend pago): el backend devuelve el token
// directo en la respuesta en vez de mandarlo por mail.
// Revertir (volver a solo un mensaje genérico) cuando se reactive el envío.
export type AuthRequestPasswordResetApiResponse = {
  token: string;
};

// Resultado uniforme para thunks que no tocan el estado global de auth
// (no hay login/logout de por medio, solo éxito o un mensaje de error puntual)
export type AuthAsyncActionResult = {
  success: boolean;
  errorMessage: string | null;
};

// 🚧 BYPASS TEMPORAL: variante de AuthAsyncActionResult que además trae
// el token, para que el form pueda navegar directo a /reset-password.
export type AuthRequestPasswordResetResult = AuthAsyncActionResult & {
  token: string | null;
};

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🔗 API 🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗                          ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export type AuthRegisterApiPayload = Pick<Auth, 'name' | 'email' | 'password' | 'repeatPassword' | 'profilePhoto'>

export type AuthLoginApiPayload = AuthCredentialsPayload;

export interface AuthGoogleApiPayload {
  accessToken: string;
}

export type AuthGoogleRequestPayload = AuthGoogleApiPayload;

export type AuthRequestPasswordResetApiPayload = AuthRequestPasswordResetPayload;

export type AuthResetPasswordApiPayload = AuthResetPasswordPayload;

// La edición de rol ahora es por-kiosco: ver UpdateMemberRoleBody en
// @typings/kiosco/kioscoTypes (PUT /kiosco/:kiosco_id/member/:user_id/role).

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 📝 FORMS  📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝     ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export type AuthLoginFormValues = AuthCredentialsPayload;

export type AuthRegisterFormValues = Pick<Auth, 'name' | 'email' | 'password' | 'repeatPassword'> & {
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
    formik: FormikProps<AuthRegisterFormValues>;
    errorMessage: string | null;
    isSubmitting: boolean;
    registeredUserId: string | null;
    isSuccess: boolean;
    secondsLeft: number;
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

export interface UseLogoutReturn {
    handleLogout: () => Promise<void>;
}

/*══════════════════════════════════════════════════════════════════════╗
║ ██ ERRORS   🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨    ║
╚══════════════════════════════════════════════════════════════════════╝*/

export type AuthErrorMessageMap = Record<string, string>;