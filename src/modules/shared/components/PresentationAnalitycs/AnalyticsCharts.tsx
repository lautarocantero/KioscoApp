import { Box } from "@mui/material";
import DailySalesBarChart from "../Analytics/DailySalesBarChart";
// import StockEvolutionChart from "../Analytics/StockEvolutionChart";
import type { AnalyticsChartsProps } from "@typings/ui/analytics.types";

export const AnalyticsCharts = ({ dailySales, stockEvolution }: AnalyticsChartsProps): React.ReactNode => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <DailySalesBarChart data={dailySales} />
            {/* <StockEvolutionChart data={stockEvolution} /> */}
        </Box>
    );
};