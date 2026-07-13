import { Box } from "@mui/material";
import TopSellingDaysCard from "../Analytics/TopSellingDaysCard";
import PeriodSummaryCard from "../Analytics/PeriodSumatyCard";
import type { AnalyticsSummaryCardsProps } from "@typings/ui/analytics.types";


export const AnalyticsSummaryCards = ({ topSellingDays, periodSummary }: AnalyticsSummaryCardsProps): React.ReactNode => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TopSellingDaysCard days={topSellingDays} />
            <PeriodSummaryCard items={periodSummary} />
        </Box>
    );
};