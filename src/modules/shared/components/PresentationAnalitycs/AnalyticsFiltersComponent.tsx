import { Box } from "@mui/material";
import DateFilterPicker from "../DateFilterPicker/DateFilterPicker";
import { PresentationFilter } from "./AnalyticsPresentationsFilter";
import { SellerFilter } from "./AnalyticsSellerFilter";
import type { AnalyticsFiltersProps } from "@typings/ui/analytics.types";
import { AnalyticsFiltersButtons } from "./AnalyticsButtons";
import { useAnalyticsFormState } from "../../../../hooks/shared/useAnalyticsFormState";

const AnalyticsFiltersComponent = ({ presentations, onPresentationChange, selectedPresentationId, isPresentationSelectorDisabled, onApplyFilters }: AnalyticsFiltersProps) => {

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
    } = useAnalyticsFormState({ onApplyFilters });

    return (
        <Box sx={{ display: "flex", alignItems: "flex-end", gap: 2, flexWrap: "wrap" }}>
            <PresentationFilter
                label="Presentación"
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

            <SellerFilter label="Vendedor" sellerId={sellerId} onChange={handleSellerChange} />

            <AnalyticsFiltersButtons
                onApply={handleApplyFilters}
                onClear={handleClearFilters}
                areFiltersActive={areFiltersActive}
            />
        </Box>
    );
};

export default AnalyticsFiltersComponent;