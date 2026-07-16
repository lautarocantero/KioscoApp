import { Box } from "@mui/material";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import DateFilterPicker from "../DateFilterPicker/DateFilterPicker";
import { PresentationFilter } from "./AnalyticsPresentationsFilter";
import { SellerFilter } from "./AnalyticsSellerFilter";
import type { AnalyticsFiltersProps } from "@typings/ui/analytics.types";
import { AnalyticsFiltersButtons } from "./AnalyticsButtons";
import { useAnalyticsFormState } from "../../../../hooks/shared/useAnalyticsFormState";
import { FILTER_MIN_WIDTH } from "config/constants";
import FilterGroup from "./AnalyticsFilterGroup";


const AnalyticsFiltersComponent = ({
    presentations,
    onPresentationChange,
    selectedPresentationId,
    isPresentationSelectorDisabled,
    onApplyFilters,
    hidePresentationFilter,
}: AnalyticsFiltersProps) => {

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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FilterGroup
                icon={<GroupsOutlinedIcon sx={{ fontSize: "1.1rem", color: "primary.main" }} />}
                title="Segmentación"
            >
                <Box sx={{ flex: 1, minWidth: FILTER_MIN_WIDTH }}>
                    <PresentationFilter
                        label="Presentación"
                        presentations={presentations}
                        onPresentationChange={onPresentationChange}
                        selectedPresentationId={selectedPresentationId}
                        isPresentationSelectorDisabled={isPresentationSelectorDisabled}
                        hidePresentationFilter={hidePresentationFilter}
                    />
                </Box>

                <Box sx={{ flex: 1, minWidth: FILTER_MIN_WIDTH }}>
                    <SellerFilter label="Vendedor" sellerId={sellerId} onChange={handleSellerChange} />
                </Box>
            </FilterGroup>

            <FilterGroup
                icon={<CalendarMonthOutlinedIcon sx={{ fontSize: "1.1rem", color: "primary.main" }} />}
                title="Período"
            >
                <Box sx={{ flex: 1, minWidth: FILTER_MIN_WIDTH }}>
                    <DateFilterPicker
                        label="Fecha de inicio"
                        value={startDate}
                        onChange={setStartDate}
                        isActive={isStartDateActive}
                        disableFuture
                    />
                </Box>

                <Box sx={{ flex: 1, minWidth: FILTER_MIN_WIDTH }}>
                    <DateFilterPicker
                        label="Fecha de fin"
                        value={endDate}
                        onChange={setEndDate}
                        minDate={startDate ?? undefined}
                        isActive={isEndDateActive}
                        disableFuture
                    />
                </Box>
            </FilterGroup>

            {/* ── Botón: abajo a la izquierda ──────────────────────── */}
            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                <AnalyticsFiltersButtons
                    onApply={handleApplyFilters}
                    onClear={handleClearFilters}
                    areFiltersActive={areFiltersActive}
                />
            </Box>
        </Box>
    );
};

export default AnalyticsFiltersComponent;