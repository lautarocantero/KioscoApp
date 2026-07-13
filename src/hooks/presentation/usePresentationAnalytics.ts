import { getPresentationAnalyticsRequest } from "../../modules/presentations/api/presentationsApi";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { resolveErrorMessage } from "../../utils/formatter/resolveErrorMessage";
import type { AnalyticsFiltersInterface, PresentationAnalyticsRaw } from "@typings/shared/types/useAnalytics.types";

/** Rango por defecto: último mes hasta hoy, igual al criterio inicial de useAnalyticsFormState */
const getDefaultDateRange = () => ({
    start_date: dayjs().subtract(1, "month").format("YYYY-MM-DD"),
    end_date: dayjs().format("YYYY-MM-DD"),
});

const DEFAULT_SELLER_ID = "all";

export function usePresentationAnalytics(presentationId?: string) {
    const { presentation_id: presentationIdFromUrl } = useParams<{ presentation_id: string }>();
    const resolvedPresentationId = presentationId ?? presentationIdFromUrl;

    const [analytics, setAnalytics]   = useState<PresentationAnalyticsRaw | null>(null);
    const [isLoading, setIsLoading]   = useState(true);
    const [error, setError]           = useState<string | null>(null);
    const [dateRange, setDateRange]   = useState<{ start_date?: string; end_date?: string }>(getDefaultDateRange);
    const [sellerId, setSellerId]     = useState<string>(DEFAULT_SELLER_ID);

    const [appliedPresentationId, setAppliedPresentationId] = useState<string | undefined>(undefined);

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