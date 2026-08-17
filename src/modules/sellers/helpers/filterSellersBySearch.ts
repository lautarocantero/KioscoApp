import type { Seller } from "@typings/seller/sellerTypes";

export const filterSellersBySearch = (sellers: Seller[], searchTerm: string): Seller[] => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return sellers;
    return sellers.filter((seller) => seller.name.toLowerCase().includes(term));
};
