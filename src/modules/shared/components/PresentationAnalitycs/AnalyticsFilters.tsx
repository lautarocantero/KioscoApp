import { Box, Button } from "@mui/material";
import DateFilterPicker from "../DateFilterPicker/DateFilterPicker";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import { PresentationFilter } from "./AnalyticsPresentationsFilter";
import { SellerFilter } from "./AnalyticsSellerFilter";
import type { AnalyticsFiltersProps } from "@typings/ui/analytics.types";
import { useAnalytics } from "../../../../hooks/shared/useAnalitycs";

export const AnalyticsFilters = ({ presentations, onPresentationChange, selectedPresentationId, isPresentationSelectorDisabled, onApplyFilters }: AnalyticsFiltersProps) => {

    const {
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        sellerId,
        handleSellerChange,
        handleApplyFilters,
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
            />

            <DateFilterPicker
                label="Fecha de fin"
                value={endDate}
                onChange={setEndDate}
                minDate={startDate ?? undefined}
            />

            <SellerFilter sellerId={sellerId} onChange={handleSellerChange} />

            <Button
                onClick={handleApplyFilters}
                variant="contained"
                startIcon={<TuneOutlinedIcon fontSize="small" />}
                sx={{
                    textTransform: "none",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    borderRadius: "10px",
                    px: 2.5,
                    py: "7px",
                }}
            >
                Aplicar filtros
            </Button>
        </Box>
    );
};