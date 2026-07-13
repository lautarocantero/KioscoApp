import { Box, Button, Grid, Typography } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import NoisyCard from "../../../../../modules/shared/components/Cards/NoisyCard";
import KpiCard from "../../../../../modules/shared/components/Analytics/KpiCard";
import DailySalesBarChart from "../../../../../modules/shared/components/Analytics/DailySalesBarChart";
import WeeklySalesLineChart from "../../../../shared/components/Analytics/StockEvolutionChart";
import TopSellingDaysCard from "../../../../../modules/shared/components/Analytics/TopSellingDaysCard";
// import SalesByChannelCard from "../../../../../modules/shared/components/Analytics/SalesByChannelCard";
import PeriodSummaryCard from "../../../../shared/components/Analytics/PeriodSumaryCard";
import PresentationSelector from "../../../../../modules/products/components/PresentationSelector";
import type { PresentationAnalyticsProps } from "@typings/product/productComponentTypes";


const PresentationAnalytics = ({
    data,
    onDateRangeClick,
    presentations,
    selectedPresentationId,
    onPresentationChange,
    isPresentationSelectorDisabled,
}: PresentationAnalyticsProps): React.ReactNode => {
    const showPresentationSelector = Boolean(presentations && onPresentationChange);

    return (
        <NoisyCard sx={{ height: "100%" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, p: 2.5 }}>
                {/* ── Header ─────────────────────────────────────────── */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box
                        sx={{
                            width: 44,
                            height: 44,
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: "rgba(139,92,246,0.18)",
                            color: "#A78BFA",
                        }}
                    >
                        <BarChartOutlinedIcon />
                    </Box>
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                            {data.title} -{" "}
                            <Typography component="span" variant="inherit" sx={(theme) => ({ color: theme.palette?.primary?.main })}>
                                Demo
                            </Typography>
                        </Typography>

                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            {data.subtitle}
                        </Typography>
                    </Box>
                </Box>

                {/* ── Selector de presentación + rango de fechas ──────── */}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, flexWrap: "wrap" }}>
                    {showPresentationSelector && presentations && onPresentationChange ? (
                        <PresentationSelector
                            presentations={presentations}
                            selectedPresentationId={selectedPresentationId}
                            onChange={onPresentationChange}
                            disabled={isPresentationSelectorDisabled}
                        />
                    ) : (
                        <Box />
                    )}

                    <Button
                        onClick={onDateRangeClick}
                        variant="outlined"
                        startIcon={<CalendarMonthOutlinedIcon fontSize="small" />}
                        endIcon={<ExpandMoreIcon fontSize="small" />}
                        sx={{
                            textTransform: "none",
                            borderColor: "rgba(255,255,255,0.12)",
                            color: "text.primary",
                            fontSize: "0.8rem",
                            borderRadius: "10px",
                        }}
                    >
                        {data.dateRangeLabel}
                    </Button>
                </Box>

                {/* ── KPIs ───────────────────────────────────────────── */}
                <Grid container spacing={2}>
                    {data.kpis.map((kpi) => (
                        <Grid key={kpi.id} size={{ xs: 12, sm: 6, md: 3 }}>
                            <KpiCard kpi={kpi} />
                        </Grid>
                    ))}
                </Grid>

                {/* ── Cuerpo: charts + sidebar ──────────────────────── */}
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <DailySalesBarChart data={data.dailySales} />
                            <WeeklySalesLineChart data={data.weeklySales} />
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <TopSellingDaysCard days={data.topSellingDays} />
                            {/* <SalesByChannelCard channels={data.salesByChannel} centerLabel={data.totalUnitsLabel} /> */}
                            <PeriodSummaryCard items={data.periodSummary} />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </NoisyCard>
    );
};

export default PresentationAnalytics;
