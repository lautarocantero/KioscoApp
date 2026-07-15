import { Alert, Box } from "@mui/material";
import NoisyCard from "../Cards/NoisyCard";
import type { PresentationAnalyticsProps } from "@typings/product/productComponentTypes";
import "dayjs/locale/es";
import { AnalyticsHeader } from "./AnalyticsHeader";
import { AnalyticsKpis } from "./AnalyticsKpis";
import { AnalyticsBody } from "./AnalyticsBody";
import AnalyticsFiltersComponent from "./AnalyticsFiltersComponent";

const PresentationAnalytics = ({
    data,
    error,
    presentations,
    selectedPresentationId,
    onPresentationChange,
    isPresentationSelectorDisabled,
    onApplyFilters,
    hidePresentationFilter,
}: PresentationAnalyticsProps): React.ReactNode => {

    if(!data) return null;

    return (
        <NoisyCard sx={{ height: "100%" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, p: 2.5 }}>
                {error && <Alert severity="error">{error}</Alert>}
                {/* ── Header ─────────────────────────────────────────── */}
                <AnalyticsHeader title={data.title} subtitle={data.subtitle} />

                {/* ── Filters ─────────────────────────────────────────── */}
                <AnalyticsFiltersComponent
                    presentations={presentations}
                    onPresentationChange={onPresentationChange}
                    selectedPresentationId={selectedPresentationId}
                    isPresentationSelectorDisabled={isPresentationSelectorDisabled}
                    onApplyFilters={onApplyFilters}
                    hidePresentationFilter={hidePresentationFilter}
                />

                {/* ── KPIs ───────────────────────────────────────────── */}
                <AnalyticsKpis kpis={data.kpis} />

                {/* ── Cuerpo: charts + sidebar ──────────────────────── */}
                <AnalyticsBody
                    dailySales={data.dailySales}
                    stockEvolution={data.stockEvolution}
                    topSellingDays={data.topSellingDays}
                    periodSummary={data.periodSummary}
                />
            </Box>
        </NoisyCard>
    );
};

export default PresentationAnalytics;