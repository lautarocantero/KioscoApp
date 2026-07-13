import { getPresentationAnalyticsRequest } from "../../modules/presentations/api/presentationsApi";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { resolveErrorMessage } from "../../utils/formatter/resolveErrorMessage";
import type { PresentationAnalyticsRaw } from "@typings/ui/analytics.types";
import type { AnalyticsFilters } from "@typings/shared/types/useAnalytics.types";

/** Rango por defecto: último mes hasta hoy, igual al criterio inicial de useAnalytics */
const getDefaultDateRange = () => ({
    start_date: dayjs().subtract(1, "month").format("YYYY-MM-DD"),
    end_date: dayjs().format("YYYY-MM-DD"),
});

/*══════════════════════════════════════════════════════════════════════╗
║ 🪝 usePresentationAnalytics                                           ║
║                                                                       ║
║ `presentationId` opcional: si se provee, tiene prioridad sobre la URL. ║
║ Permite reusar el hook fuera de la ruta de presentación (ej. desde    ║
║ el detalle de producto, cambiando de presentación sin navegar).       ║
║ Por defecto trae el último mes. `applyFilters` ya viene en el shape   ║
║ que espera `onApplyFilters` de AnalyticsFilters/useAnalytics, así que ║
║ se puede conectar directo sin wrapper en cada componente consumidor.  ║
╚══════════════════════════════════════════════════════════════════════╝*/
export function usePresentationAnalytics(presentationId?: string) {
    const { presentation_id: presentationIdFromUrl } = useParams<{ presentation_id: string }>();
    const resolvedPresentationId = presentationId ?? presentationIdFromUrl;

    const [analytics, setAnalytics]   = useState<PresentationAnalyticsRaw | null>(null);
    const [isLoading, setIsLoading]   = useState(true);
    const [error, setError]           = useState<string | null>(null);
    const [dateRange, setDateRange]   = useState<{ start_date?: string; end_date?: string }>(getDefaultDateRange);

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

    /** Adapta AnalyticsFilters (Dayjs) al shape de dateRange (string) que espera el fetch */
    const applyFilters = useCallback(({ startDate, endDate }: AnalyticsFilters) => {
        setDateRange({
            start_date: startDate?.format("YYYY-MM-DD"),
            end_date: endDate?.format("YYYY-MM-DD"),
        });
    }, []);

    return {
        analytics,
        isLoading,
        error,
        dateRange,
        setDateRange,
        applyFilters,
        refetch: fetchAnalytics,
    };
}