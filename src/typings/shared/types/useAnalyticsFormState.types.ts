import type { Dayjs } from "dayjs";

export interface AnalyticsFiltersInterface {
    startDate: Dayjs | null;
    endDate: Dayjs | null;
    sellerId: string;
}

export interface UseAnalyticsParams {
    onApplyFilters?: (filters: AnalyticsFiltersInterface) => void;
}