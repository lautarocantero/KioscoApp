import { getPresentationAnalyticsRequest } from "../../modules/presentations/api/presentationsApi";
import { resolveErrorMessage } from "../../modules/products/pages/ProductsList/helpers/productHelpers";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

export function usePresentationAnalytics() {
    const { presentation_id } = useParams<{ presentation_id: string }>();

    const [analytics, setAnalytics]   = useState<PresentationAnalyticsRaw | null>(null);
    const [isLoading, setIsLoading]   = useState(true);
    const [error, setError]           = useState<string | null>(null);
    const [dateRange, setDateRange]   = useState<{ start_date?: string; end_date?: string }>({});

    const fetchAnalytics = useCallback(async () => {
        if (!presentation_id) { setIsLoading(false); return; }

        setIsLoading(true);
        setError(null);
        try {
            const data = await getPresentationAnalyticsRequest({
                presentation_id,
                start_date: dateRange.start_date,
                end_date: dateRange.end_date,
            });
            setAnalytics(data);
        } catch (err) {
            setError(resolveErrorMessage(err) ?? "No se pudieron cargar las analíticas");
        } finally {
            setIsLoading(false);
        }
    }, [presentation_id, dateRange]);

    useEffect(() => {
        fetchAnalytics();
    }, [fetchAnalytics]);

    return {
        analytics,
        isLoading,
        error,
        dateRange,
        setDateRange,
        refetch: fetchAnalytics,
    };
}