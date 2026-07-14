import { getPresentationAnalyticsRequest, getPresentationByIdRequest } from "../../modules/presentations/api/presentationsApi";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import { resolveErrorMessage } from "../../utils/formatter/resolveErrorMessage";
import { mapPresentationAnalytics } from "../../modules/shared/components/Analytics/RangeResult";
import type { AnalyticsFiltersInterface, PresentationAnalyticsRaw, UsePresentationAnalyticsOptions } from "@typings/shared/types/useAnalytics.types";

/** Rango por defecto: último mes hasta hoy, igual al criterio inicial de useAnalyticsFormState */
const getDefaultDateRange = () => ({
    start_date: dayjs().subtract(1, "month").format("YYYY-MM-DD"),
    end_date: dayjs().format("YYYY-MM-DD"),
});

const DEFAULT_SELLER_ID = "all";


export function usePresentationAnalytics(presentationId?: string, options: UsePresentationAnalyticsOptions = {}) {
    const { title = "Ventas de la presentación", subtitle = "analytics", currentStock: currentStockOverride } = options;

    const theme = useTheme();
    const { presentation_id: presentationIdFromUrl } = useParams<{ presentation_id: string }>();
    const resolvedPresentationId = presentationId ?? presentationIdFromUrl;

    const [analytics, setAnalytics]   = useState<PresentationAnalyticsRaw | null>(null);
    const [isLoading, setIsLoading]   = useState(true);
    const [error, setError]           = useState<string | null>(null);
    const [dateRange, setDateRange]   = useState<{ start_date?: string; end_date?: string }>(getDefaultDateRange);
    const [sellerId, setSellerId]     = useState<string>(DEFAULT_SELLER_ID);

    const [appliedPresentationId, setAppliedPresentationId] = useState<string | undefined>(undefined);

    // Stock resuelto internamente, solo cuando el caller no lo provee ya calculado.
    const [fetchedStock, setFetchedStock] = useState<number>(0);

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

    // Solo pega contra la API si nadie nos pasó el stock ya resuelto.
    useEffect(() => {
        if (currentStockOverride !== undefined) return;
        if (!appliedPresentationId) return;

        let cancelled = false;
        getPresentationByIdRequest({ product_variant_id: appliedPresentationId })
            .then((data) => {
                if (!cancelled) setFetchedStock(data[0]?.stock ?? 0);
            })
            .catch(() => {
                if (!cancelled) setFetchedStock(0);
            });

        return () => { cancelled = true; };
    }, [appliedPresentationId, currentStockOverride]);

    const currentStock = currentStockOverride ?? fetchedStock;

    const analyticsData = useMemo(
        () =>
            analytics
                ? mapPresentationAnalytics({ raw: analytics, title, subtitle, currentStock, theme })
                : null,
        [analytics, title, subtitle, currentStock, theme],
    );

    /** Si el usuario definió fecha de inicio/fin, se usan tal cual.
     *  Si dejó alguna (o ambas) sin definir, se recalcula el default
     *  "último mes hasta hoy" para esa punta, en vez de perderlo. */
    const applyFilters = useCallback(({ startDate, endDate, sellerId }: AnalyticsFiltersInterface) => {
        const defaults = getDefaultDateRange();
        setDateRange({
            start_date: startDate ? startDate.format("YYYY-MM-DD") : defaults.start_date,
            end_date: endDate ? endDate.format("YYYY-MM-DD") : defaults.end_date,
        });
        setSellerId(sellerId ?? DEFAULT_SELLER_ID);
        if (resolvedPresentationId) {
            setAppliedPresentationId(resolvedPresentationId);
        }
    }, [resolvedPresentationId]);

    return {
        analyticsData,
        isLoading,
        error,
        dateRange,
        setDateRange,
        sellerId,
        applyFilters,
        refetch: fetchAnalytics,
    };
}
