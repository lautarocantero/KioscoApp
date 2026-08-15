import { SellerStatus } from "@typings/seller/sellerEnums";

// Ordena vendedores con los online primero. Array.prototype.sort es estable
// (ES2019+), así que dentro de cada grupo (online/offline) se conserva el
// orden que ya traía la lista (por ahora, el que devuelve el back).
export const sortSellersOnlineFirst = <T extends { user_status: SellerStatus }>(sellers: T[]): T[] => {
    return [...sellers].sort((a, b) => {
        if (a.user_status === b.user_status) return 0;
        return a.user_status === SellerStatus.Online ? -1 : 1;
    });
};

export default sortSellersOnlineFirst;
