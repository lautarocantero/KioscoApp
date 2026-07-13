import { Box } from "@mui/material";
import NoisyCard from "../Cards/NoisyCard";
import type { PresentationAnalyticsProps } from "@typings/product/productComponentTypes";
import "dayjs/locale/es";
import { AnalyticsHeader } from "./AnalyticsHeader";
import { AnalyticsKpis } from "./AnalyticsKpis";
import { AnalyticsBody } from "./AnalyticsBody";
import AnalyticsFiltersComponent from "./AnalyticsFiltersComponent";

const PresentationAnalytics = ({
    data,
    presentations,
    selectedPresentationId,
    onPresentationChange,
    isPresentationSelectorDisabled,
    onApplyFilters,
}: PresentationAnalyticsProps): React.ReactNode => {
    const { title, subtitle, kpis, dailySales, stockEvolution , topSellingDays, periodSummary} = data;

    return (
        <NoisyCard sx={{ height: "100%" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, p: 2.5 }}>
                {/* ── Header ─────────────────────────────────────────── */}
                <AnalyticsHeader title={title} subtitle={subtitle} />

                {/* ── Filters ─────────────────────────────────────────── */}
                <AnalyticsFiltersComponent
                    presentations={presentations}
                    onPresentationChange={onPresentationChange}
                    selectedPresentationId={selectedPresentationId}
                    isPresentationSelectorDisabled={isPresentationSelectorDisabled}
                    onApplyFilters={onApplyFilters}
                />

                {/* ── KPIs ───────────────────────────────────────────── */}
                <AnalyticsKpis kpis={kpis} />

                {/* ── Cuerpo: charts + sidebar ──────────────────────── */}
                <AnalyticsBody
                    dailySales={dailySales}
                    stockEvolution={stockEvolution}
                    topSellingDays={topSellingDays}
                    periodSummary={periodSummary}
                />
            </Box>
        </NoisyCard>
    );
};

export default PresentationAnalytics;