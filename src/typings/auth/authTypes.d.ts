// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🔒 BASE PRINCIPAL 🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒                     ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

interface AuthEntity {
    _id: string | null,
    username: string,
    email: string,
    password: string,
    repeatPassword: string,
    authToken: string,
    refreshToken: string,
    status: AuthStatus,
    profilePhoto: string | null,
};

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🧩 DERIVADOS 🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩                ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

// // derivado para no utilizar directamente el AuthEntity
export type Auth = AuthEntity;

// // derivado para los datos publicos
export type AuthPublic = Omit<AuthEntity, 'password' | 'repeatPassword' | 'authToken' |'refreshToken' | 'status'>;

// // derivado para el slice
export type AuthSliceState = Omit<Auth,  "password" | "repeatPassword" | "authToken" | "refreshToken" > & {
    errorMessage: string | null,
};

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🍕 SLICE  🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export type AuthLoginSlicePayload = Pick<Auth, '_id' | 'username' |  'email' | 'profilePhoto' >

export type AuthSliceErrorPayload = Pick<AuthSliceState, 'errorMessage'>;

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🕐 THUNKS 🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐                     ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export type AuthLoginRequestPayload = Pick<Auth, 'email' | 'password' >;

export type AuthRegisterRequestPayload = Pick<Auth, 'username' | 'email' | 'password' | 'repeatPassword' >

export type AuthCheckAutResponse = Pick<Auth, '_id' | 'email' | 'password' | 'refreshToken' | 'username' >

export type AuthCheckAuthDataResponse = Pick<Auth, '_id'| 'username' | 'email' | 'refreshToken' | 'profilePhoto'>

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🔗 API 🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗                          ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export type AuthRegisterApiPayload  = Pick<Auth, 'username' | 'email' | 'password' | 'repeatPassword' >

export type AuthLoginApiPayload  = Pick<Auth, 'email' | 'password' >;







