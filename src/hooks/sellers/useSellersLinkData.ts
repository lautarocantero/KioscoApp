import type { LinkDataResult } from "@typings/ui/layout.types";
import useSellersListData from "./useSellerListData";
import { countOnlineSellers } from "../../modules/sellers/helpers/countOnlineSellers";

// Adapta useSellersListData al shape que esperan las cards de
// HomePageLinks / SidebarNavLinks (mismo patrón que useProductsLinkData
// en hooks/products/useProductData.ts).
export const useSellersLinkData = (): LinkDataResult => {
    const { sellers, loading, error } = useSellersListData();

    return {
        value: sellers.length,
        isLoading: loading,
        error,
        subtitle: `${countOnlineSellers(sellers)} en línea`,
    };
};

export default useSellersLinkData;
