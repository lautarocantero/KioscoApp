import { AuthRoleEnum } from "@typings/auth/authEnums";
import { SellerStatus } from "@typings/seller/sellerEnums";

export const ROLE_LABELS: Record<AuthRoleEnum, string> = {
  [AuthRoleEnum.Admin]: "Administrador",
  [AuthRoleEnum.Seller]: "Vendedor",
};

export const ROLE_VALUES = Object.values(AuthRoleEnum);

export const STATUS_LABELS: Record<SellerStatus, string> = {
  [SellerStatus.Online]: "En línea",
  [SellerStatus.Offline]: "Desconectado",
};
