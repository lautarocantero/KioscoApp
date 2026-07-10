import type { UseProviderStatsResult } from "@typings/providers/providerTypes";
import type { LinkDataResult } from "@typings/ui/layout.types";
import { API_URL } from "../../config/api";
import { useEffect, useState } from "react";


export const useProviderStats = (): UseProviderStatsResult => {
    const [totalProviders, setTotalProviders] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError]     = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchStats = async (): Promise<void> => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `${API_URL}/provider/get-providers-stats`,
                    { credentials: "include" }
                );

                if (!response.ok) throw new Error(`Error ${response.status}`);

                const stats: { totalProviders: number } = await response.json();

                if (!isMounted) return;
                setTotalProviders(stats.totalProviders);
            } catch {
                if (!isMounted) return;
                setError("No se pudo obtener los datos de proveedores");
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        void fetchStats();

        return () => {
            isMounted = false;
        };
    }, []);

    return { totalProviders, loading, error };
};

// Adaptador para las cards de HomePageLinks / SidebarNavLinks
export const useProvidersLinkData = (): LinkDataResult => {
    const { totalProviders, loading, error } = useProviderStats();

    return {
        value: totalProviders,
        loading,
        error,
        subtitle: undefined, // no hay data real de "activos" ni "próxima entrega" todavía
    };
};