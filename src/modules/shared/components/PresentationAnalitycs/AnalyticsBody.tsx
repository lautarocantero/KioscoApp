import { Grid } from "@mui/material";
import { AnalyticsCharts } from "./AnalyticsCharts";
import { AnalyticsSummaryCards } from "./AnalyticsSummaryCards";
import type { AnalyticsBodyProps } from "@typings/ui/analytics.types";


export const AnalyticsBody = ({
    dailySales,
    stockEvolution,
    topSellingDays,
    periodSummary,
}: AnalyticsBodyProps): React.ReactNode => {
    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 8 }}>
                <AnalyticsCharts dailySales={dailySales} stockEvolution={stockEvolution} />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
                <AnalyticsSummaryCards topSellingDays={topSellingDays} periodSummary={periodSummary} />
            </Grid>
        </Grid>
    );
};