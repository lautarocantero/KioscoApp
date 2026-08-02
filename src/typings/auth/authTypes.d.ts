// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🔒 BASE PRINCIPAL 🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒                     ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

import type { checkingCredentials, login, logout } from "../../store/auth/authSlice";
import type { AuthRoleEnum } from "./authEnums";

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

export type AuthCheckAutResponse = Pick<Auth, '_id' | 'email' | 'password' | 'refreshToken' | 'username' >

export type AuthCheckAuthDataResponse = Pick<Auth, '_id'| 'username' | 'email' | 'profilePhoto' | 'role'>

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🔗 API 🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗                          ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export type AuthRegisterApiPayload = Pick<Auth, 'username' | 'email' | 'password' | 'repeatPassword' | 'profilePhoto'>

export type AuthLoginApiPayload = AuthCredentialsPayload;

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 📝 FORMS  📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝     ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export type AuthLoginFormValues = AuthCredentialsPayload;

export type AuthRegisterFormValues = Pick<Auth, 'username' | 'email' | 'password' | 'repeatPassword'> & {
    profilePhoto: string | null;
};

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🪝 HOOKS  🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝  ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface UseLoginFormReturn {
    errorMessage: string | null;
    isSubmitting: boolean;
    handleSubmit: (values: AuthLoginFormValues) => Promise<void>;
    handleGoToRegister: () => void;
    handleGoToForgotPassword: () => void;
}

export interface UseRegisterFormReturn {
    errorMessage: string | null;
    isSubmitting: boolean;
    registeredUserId: string | null;
    handleSubmit: (values: AuthRegisterFormValues) => Promise<void>;
    handleGoToLogin: () => void;
}