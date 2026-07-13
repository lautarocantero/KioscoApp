import { Box } from "@mui/material";
import DailySalesBarChart from "../Analytics/DailySalesBarChart";
import WeeklySalesLineChart from "../Analytics/WeeklySalesLineChart";
import type { AnalyticsChartsProps } from "@typings/ui/analytics.types";


export const AnalyticsCharts = ({ dailySales, weeklySales }: AnalyticsChartsProps): React.ReactNode => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <DailySalesBarChart data={dailySales} />
            <WeeklySalesLineChart data={weeklySales} />
        </Box>
    );
};