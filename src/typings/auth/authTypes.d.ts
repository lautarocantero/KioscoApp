// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🔒 BASE PRINCIPAL 🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒                     ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

import type { AuthRoleEnum } from "./enums";

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

// // derivado para no utilizar directamente el AuthEntity
export type Auth = AuthEntity;

// // derivado para los datos publicos
export type AuthPublic = Omit<AuthEntity, 'password' | 'repeatPassword' | 'authToken' |'refreshToken' | 'status'>;

// // derivado para el slice
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
// ║ 🕐 THUNKS 🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐                     ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export type AuthLoginRequestPayload = Pick<Auth, 'email' | 'password' >;

export type AuthRegisterRequestPayload = Pick<Auth, 'username' | 'email' | 'password' | 'repeatPassword' | 'profilePhoto' >

export interface AuthRegisterSanitizedPayload {
    sanitizedData: AuthRegisterRequestPayload;
}

// Fix: este tipo no coincide con lo que realmente se usa en startCheckAuth (ver AuthCheckAuthDataResponse).
// Se mantiene por compatibilidad pero revisar si sigue haciendo falta en algún otro lado del código;
// si no se usa en ningún otro archivo, se puede eliminar para evitar confusión con AuthCheckAuthDataResponse.
export type AuthCheckAutResponse = Pick<Auth, '_id' | 'email' | 'password' | 'refreshToken' | 'username' >

export type AuthCheckAuthDataResponse = Pick<Auth, '_id'| 'username' | 'email' | 'profilePhoto' | 'role'>

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🔗 API 🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗                          ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

// Fix: había una coma de más antes de "| 'profilePhoto'" que hacía que TS interpretara
// un tercer argumento genérico para Pick<T, K> (que solo acepta 2), rompiendo la compilación.
export type AuthRegisterApiPayload = Pick<Auth, 'username' | 'email' | 'password' | 'repeatPassword' | 'profilePhoto'>

export type AuthLoginApiPayload  = Pick<Auth, 'email' | 'password' >;