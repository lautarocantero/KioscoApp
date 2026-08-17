import { SellerStatus } from "@typings/seller/sellerEnums";

export const getSellerStatusLabel = (status: SellerStatus): string =>
    status === SellerStatus.Online ? "En línea" : "Desconectado";
