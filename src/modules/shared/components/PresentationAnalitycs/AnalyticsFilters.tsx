import { Box } from "@mui/material";
import DateFilterPicker from "../DateFilterPicker/DateFilterPicker";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import { PresentationFilter } from "./AnalyticsPresentationsFilter";
import { SellerFilter } from "./AnalyticsSellerFilter";
import type { AnalyticsFiltersProps } from "@typings/ui/analytics.types";
import { useAnalytics } from "../../../../hooks/shared/useAnalitycs";
import PrimaryButtonComponent from "../Buttons/PrimaryButtonComponent";

export const AnalyticsFilters = ({ presentations, onPresentationChange, selectedPresentationId, isPresentationSelectorDisabled, onApplyFilters }: AnalyticsFiltersProps) => {

    const {
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        sellerId,
        handleSellerChange,
        handleApplyFilters,
        isStartDateActive,
    isEndDateActive,
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

            <PrimaryButtonComponent
                buttonText="Aplicar filtros"
                buttonOnClick={handleApplyFilters}
                icon={<TuneOutlinedIcon fontSize="small" sx={{ mr: 0.75 }} />}
                buttonWidth="auto"
                marginTop={"0"}
                dataTestId="apply-filters-button"
            />
        </Box>
    );
};