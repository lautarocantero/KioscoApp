import { getPresentationAnalyticsRequest } from "../../modules/presentations/api/presentationsApi";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { resolveErrorMessage } from "../../utils/formatter/resolveErrorMessage";
import type { PresentationAnalyticsRaw } from "@typings/ui/analytics.types";
import type { AnalyticsFiltersInterface } from "@typings/shared/types/useAnalyticsFormState.types";

/** Rango por defecto: último mes hasta hoy, igual al criterio inicial de useAnalyticsFormState */
const getDefaultDateRange = () => ({
    start_date: dayjs().subtract(1, "month").format("YYYY-MM-DD"),
    end_date: dayjs().format("YYYY-MM-DD"),
});

const DEFAULT_SELLER_ID = "all";

/*══════════════════════════════════════════════════════════════════════╗
║ 🪝 usePresentationAnalytics                                           ║
║                                                                       ║
║ `presentationId` opcional: si se provee, tiene prioridad sobre la URL. ║
║ Permite reusar el hook fuera de la ruta de presentación (ej. desde    ║
║ el detalle de producto, cambiando de presentación sin navegar).       ║
║                                                                       ║
║ El fetch usa `appliedPresentationId`, no el `presentationId` "vivo":  ║
║ así, si el consumidor cambia de presentación en un selector antes de  ║
║ hacer clic en "Aplicar filtros", el fetch no se dispara hasta que     ║
║ `applyFilters` lo confirme — igual que fecha/vendedor.                ║
║ La primera vez que llega un id (carga inicial / cambio de producto)   ║
║ se aplica automáticamente, sin esperar "Aplicar".                     ║
╚══════════════════════════════════════════════════════════════════════╝*/
export function usePresentationAnalytics(presentationId?: string) {
    const { presentation_id: presentationIdFromUrl } = useParams<{ presentation_id: string }>();
    const resolvedPresentationId = presentationId ?? presentationIdFromUrl;

    const [analytics, setAnalytics]   = useState<PresentationAnalyticsRaw | null>(null);
    const [isLoading, setIsLoading]   = useState(true);
    const [error, setError]           = useState<string | null>(null);
    const [dateRange, setDateRange]   = useState<{ start_date?: string; end_date?: string }>(getDefaultDateRange);
    const [sellerId, setSellerId]     = useState<string>(DEFAULT_SELLER_ID);

    // id "aplicado": el que realmente dispara el fetch
    const [appliedPresentationId, setAppliedPresentationId] = useState<string | undefined>(undefined);

    // primera vez que llega un id (o cambia de producto sin selección previa), se autoaplica
    useEffect(() => {
        if (resolvedPresentationId && appliedPresentationId === undefined) {
            setAppliedPresentationId(resolvedPresentationId);
        }
    }, [resolvedPresentationId, appliedPresentationId]);

    const fetchAnalytics = useCallback(async () => {
        if (!appliedPresentationId) { setIsLoading(false); return; }

        setIsLoading(true);
        setError(null);
        try {
            const data = await getPresentationAnalyticsRequest({
                presentation_id: appliedPresentationId,
                start_date: dateRange.start_date,
                end_date: dateRange.end_date,
                seller_id: sellerId !== DEFAULT_SELLER_ID ? sellerId : undefined,
            });
            setAnalytics(data);
        } catch (err) {
            setError(resolveErrorMessage(err) ?? "No se pudieron cargar las analíticas");
        } finally {
            setIsLoading(false);
        }
    }, [appliedPresentationId, dateRange, sellerId]);

    useEffect(() => {
        fetchAnalytics();
    }, [fetchAnalytics]);

    /** Adapta AnalyticsFilters (Dayjs) al shape de dateRange (string) que espera el fetch.
     *  También confirma acá el cambio de presentación pendiente en el selector. */
    const applyFilters = useCallback(({ startDate, endDate, sellerId }: AnalyticsFiltersInterface) => {
        setDateRange({
            start_date: startDate?.format("YYYY-MM-DD"),
            end_date: endDate?.format("YYYY-MM-DD"),
        });
        setSellerId(sellerId ?? DEFAULT_SELLER_ID);
        if (resolvedPresentationId) {
            setAppliedPresentationId(resolvedPresentationId);
        }
    }, [resolvedPresentationId]);

    return {
        analytics,
        isLoading,
        error,
        dateRange,
        setDateRange,
        sellerId,
        applyFilters,
        refetch: fetchAnalytics,
    };
}