import type { LinkDataResult } from "@typings/ui/layout.types";
import useSellersListData from "./useSellerListData";

// Adapta useSellersListData al shape que esperan las cards de
// HomePageLinks / SidebarNavLinks (mismo patrón que useProductsLinkData
// en hooks/products/useProductData.ts).
export const useSellersLinkData = (): LinkDataResult => {
    const { sellers, loading, error } = useSellersListData();

    // TODO(online-status): todavía no hay tracking real de conexión de
    // vendedores. Mockeado a 0 hasta que exista ese estado.
    const onlineCount = 0;

    return {
        value: sellers.length,
        isLoading: loading,
        error,
        subtitle: `${onlineCount} en línea`,
    };
};

export default useSellersLinkData;
