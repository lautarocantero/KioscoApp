import { AuthRoleEnum } from "@typings/auth/authEnums";

export const ROLE_LABELS: Record<AuthRoleEnum, string> = {
  [AuthRoleEnum.Admin]: "Administrador",
  [AuthRoleEnum.Seller]: "Vendedor",
};

export const ROLE_VALUES = Object.values(AuthRoleEnum);
