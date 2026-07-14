import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import { mapPresentationAnalytics } from "../../modules/shared/components/Analytics/RangeResult";
import type { AnalyticsFiltersInterface, PresentationAnalyticsRaw, UsePresentationAnalyticsOptions } from "@typings/shared/types/useAnalytics.types";
import type { AppDispatch, RootState } from "../../store/presentation/presentationSlice";
import { fetchPresentationAnalytics, fetchPresentationById } from "../../store/presentation/presentationThunks";

const getDefaultDateRange = () => ({
    start_date: dayjs().subtract(1, "month").format("YYYY-MM-DD"),
    end_date: dayjs().format("YYYY-MM-DD"),
});

const DEFAULT_SELLER_ID = "all";

export function usePresentationAnalytics(presentationId?: string, options: UsePresentationAnalyticsOptions = {}) {
    const { title = "Ventas de la presentación", subtitle = "analytics", currentStock: currentStockOverride } = options;

    const theme = useTheme();
    const dispatch = useDispatch<AppDispatch>();
    const { presentation_id: presentationIdFromUrl } = useParams<{ presentation_id: string }>();
    const resolvedPresentationId = presentationId ?? presentationIdFromUrl;

    const selectedPresentation = useSelector((state: RootState) => state.presentation.selectedPresentation);

    const [analytics, setAnalytics] = useState<PresentationAnalyticsRaw | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [dateRange, setDateRange] = useState<{ start_date?: string; end_date?: string }>(getDefaultDateRange);
    const [sellerId, setSellerId] = useState<string>(DEFAULT_SELLER_ID);
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

        const data = await dispatch(fetchPresentationAnalytics({
            presentation_id: appliedPresentationId,
            start_date: dateRange.start_date,
            end_date: dateRange.end_date,
            seller_id: sellerId !== DEFAULT_SELLER_ID ? sellerId : undefined,
        }));

        if (data) setAnalytics(data);
        else setError("No se pudieron cargar las analíticas");
        setIsLoading(false);
    }, [appliedPresentationId, dateRange, sellerId, dispatch]);

    useEffect(() => { void fetchAnalytics(); }, [fetchAnalytics]);

    // Stock: solo pega contra la API si nadie nos pasó el stock ya resuelto
    useEffect(() => {
        if (currentStockOverride !== undefined) return;
        if (!appliedPresentationId) return;
        void dispatch(fetchPresentationById(appliedPresentationId));
    }, [appliedPresentationId, currentStockOverride, dispatch]);

    const currentStock = currentStockOverride ?? selectedPresentation?.stock ?? 0;

    const analyticsData = useMemo(
        () => (analytics ? mapPresentationAnalytics({ raw: analytics, title, subtitle, currentStock, theme }) : null),
        [analytics, title, subtitle, currentStock, theme],
    );

    const applyFilters = useCallback(({ startDate, endDate, sellerId }: AnalyticsFiltersInterface) => {
        const defaults = getDefaultDateRange();
        setDateRange({
            start_date: startDate ? startDate.format("YYYY-MM-DD") : defaults.start_date,
            end_date: endDate ? endDate.format("YYYY-MM-DD") : defaults.end_date,
        });
        setSellerId(sellerId ?? DEFAULT_SELLER_ID);
        if (resolvedPresentationId) setAppliedPresentationId(resolvedPresentationId);
    }, [resolvedPresentationId]);

    return { analyticsData, isLoading, error, dateRange, setDateRange, sellerId, applyFilters, refetch: fetchAnalytics };
}