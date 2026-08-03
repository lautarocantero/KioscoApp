
export enum AuthStatus {
    Authenticated = "authenticated",
    Checking = "checking",
    NotAuthenticated = "not-authenticated",
};

export enum AuthRoleEnum {
    Administrador = "Administrador",
    Usuario = "Usuario",
};

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