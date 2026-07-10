import { getTodaySellsCountRequest } from "../../modules/sells/api/sellApi";
import { useEffect, useState } from "react";
import type { LinkDataResult } from "@typings/ui/layout.types";
import type { UseSellsResult } from "@typings/sells/types";
import { formatRelativeSaleSubtitle } from "../../modules/sells/helpers/ProductDialog/Formatter/formatRelativeSale";


export const useSells = (): UseSellsResult => {
    const [count, setCount] = useState<number | null>(null);
    const [lastSaleAt, setLastSaleAt] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchSells = async (): Promise<void> => {
            setLoading(true);
            setError(null);

            try {
                const { count: todayCount, lastSaleAt: lastSale } = await getTodaySellsCountRequest();
                if (!isMounted) return;
                setCount(todayCount);
                setLastSaleAt(lastSale ?? null);
            } catch {
                if (!isMounted) return;
                setError("No se pudo obtener el número de ventas de hoy");
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        void fetchSells();

        return () => {
            isMounted = false;
        };
    }, []);

    return { count, lastSaleAt, loading, error };
};

// Adaptador para las cards de HomePageLinks
export const useSellsLinkData = (): LinkDataResult => {
    const { count, lastSaleAt, loading, error } = useSells();

    return {
        value: count,
        loading,
        error,
        subtitle: error ? undefined : formatRelativeSaleSubtitle(lastSaleAt),
    };
};