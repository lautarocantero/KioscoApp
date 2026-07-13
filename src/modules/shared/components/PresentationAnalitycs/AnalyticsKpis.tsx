import { Grid } from "@mui/material";
import KpiCard from "../Analytics/KpiCard";
import type { AnalyticsKpisProps } from "@typings/ui/analytics.types";


export const AnalyticsKpis = ({ kpis }: AnalyticsKpisProps): React.ReactNode => {
    return (
        <Grid container spacing={2}>
            {kpis.map((kpi) => (
                <Grid key={kpi.id} size={{ xs: 12, sm: 6, md: 3 }}>
                    <KpiCard kpi={kpi} />
                </Grid>
            ))}
        </Grid>
    );
};