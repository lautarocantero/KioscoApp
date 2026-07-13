import { Box } from "@mui/material";
import DateFilterPicker from "../DateFilterPicker/DateFilterPicker";
import { PresentationFilter } from "./AnalyticsPresentationsFilter";
import { SellerFilter } from "./AnalyticsSellerFilter";
import type { AnalyticsFiltersProps } from "@typings/ui/analytics.types";
import { useAnalytics } from "../../../../hooks/shared/useAnalitycs";
import { AnalyticsFiltersButtons } from "./AnalyticsButtons";

export const AnalyticsFilters = ({ presentations, onPresentationChange, selectedPresentationId, isPresentationSelectorDisabled, onApplyFilters }: AnalyticsFiltersProps) => {

    const {
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        sellerId,
        handleSellerChange,
        handleApplyFilters,
        handleClearFilters,
        isStartDateActive,
        isEndDateActive,
        areFiltersActive,
    } = useAnalytics({ onApplyFilters });

    return (
        <Box sx={{ display: "flex", alignItems: "flex-end", gap: 2, flexWrap: "wrap" }}>
            <PresentationFilter
                presentations={presentations}
                onPresentationChange={onPresentationChange}
                selectedPresentationId={selectedPresentationId}
                isPresentationSelectorDisabled={isPresentationSelectorDisabled}
            />

            <DateFilterPicker
                label="Fecha de inicio"
                value={startDate}
                onChange={setStartDate}
                isActive={isStartDateActive}
                disableFuture
            />

            <DateFilterPicker
                label="Fecha de fin"
                value={endDate}
                onChange={setEndDate}
                minDate={startDate ?? undefined}
                isActive={isEndDateActive}
                disableFuture
            />

            <SellerFilter sellerId={sellerId} onChange={handleSellerChange} />

            <AnalyticsFiltersButtons
                onApply={handleApplyFilters}
                onClear={handleClearFilters}
                areFiltersActive={areFiltersActive}
            />
        </Box>
    );
};