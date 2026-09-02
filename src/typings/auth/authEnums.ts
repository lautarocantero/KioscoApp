
export enum AuthStatus {
    Authenticated = "authenticated",
    Checking = "checking",
    NotAuthenticated = "not-authenticated",
};

export enum AuthRoleEnum {
    Admin = 'admin',
    Seller = 'seller',
};

export const ROLE_VALUES = Object.values(AuthRoleEnum);

export enum VerifyEmailStatusEnum {
    Verifying = "verifying",
    Success = "success",
    Error = "error",
};

export enum ResetPasswordStatusEnum {
  Idle = 'idle',
  Success = 'success',
  Error = 'error',
}

export enum AuthBrandVideoPhaseEnum {
  Playing = 'playing',
  Holding = 'holding',
  Fading = 'fading',
  Done = 'done',
}