import type { Dayjs } from "dayjs";

export interface AnalyticsFilters {
    startDate: Dayjs | null;
    endDate: Dayjs | null;
    sellerId: string;
}

export interface UseAnalyticsParams {
    onApplyFilters?: (filters: AnalyticsFilters) => void;
}