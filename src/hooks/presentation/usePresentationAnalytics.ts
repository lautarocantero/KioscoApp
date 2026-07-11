import { getPresentationAnalyticsRequest } from "../../modules/presentations/api/presentationsApi";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { resolveErrorMessage } from "../../utils/formatter/resolveErrorMessage";
import type { PresentationAnalyticsRaw } from "@typings/ui/analytics.types";

/*══════════════════════════════════════════════════════════════════════╗
║ 🪝 usePresentationAnalytics                                           ║
║                                                                       ║
║ `presentationId` opcional: si se provee, tiene prioridad sobre la URL. ║
║ Permite reusar el hook fuera de la ruta de presentación (ej. desde    ║
║ el detalle de producto, cambiando de presentación sin navegar).       ║
╚══════════════════════════════════════════════════════════════════════╝*/
export function usePresentationAnalytics(presentationId?: string) {
    const { presentation_id: presentationIdFromUrl } = useParams<{ presentation_id: string }>();
    const resolvedPresentationId = presentationId ?? presentationIdFromUrl;

    const [analytics, setAnalytics]   = useState<PresentationAnalyticsRaw | null>(null);
    const [isLoading, setIsLoading]   = useState(true);
    const [error, setError]           = useState<string | null>(null);
    const [dateRange, setDateRange]   = useState<{ start_date?: string; end_date?: string }>({});

    const fetchAnalytics = useCallback(async () => {
        if (!resolvedPresentationId) { setIsLoading(false); return; }

        setIsLoading(true);
        setError(null);
        try {
            const data = await getPresentationAnalyticsRequest({
                presentation_id: resolvedPresentationId,
                start_date: dateRange.start_date,
                end_date: dateRange.end_date,
            });
            setAnalytics(data);
        } catch (err) {
            setError(resolveErrorMessage(err) ?? "No se pudieron cargar las analíticas");
        } finally {
            setIsLoading(false);
        }
    }, [resolvedPresentationId, dateRange]);

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