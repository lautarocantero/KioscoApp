import { SellerStatus } from "@typings/seller/sellerEnums";

export const countOnlineSellers = <T extends { user_status: SellerStatus }>(sellers: T[]): number => {
    return sellers.filter((seller) => seller.user_status === SellerStatus.Online).length;
};

export default countOnlineSellers;
