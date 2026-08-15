import { useMemo } from "react";
import type { UseShopFeaturedProvidersReturn } from "@typings/shop/shopTypes";
import useProvidersListData from "../providers/useProviderListData";

const FEATURED_PROVIDERS_LIMIT = 5;

// Recorta el listado real de proveedores (`useProvidersListData`) a los
// primeros N para la tarjeta "Proveedores destacados" de /shop.
export const useShopFeaturedProviders = (): UseShopFeaturedProvidersReturn => {
    const { providers, loading, error } = useProvidersListData();

    const featured = useMemo(
        () => providers.slice(0, FEATURED_PROVIDERS_LIMIT),
        [providers]
    );

    return {
        featured,
        total: providers.length,
        isLoading: loading,
        error,
    };
};
