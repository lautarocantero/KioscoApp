import { useState } from "react";
import { Box, type SelectChangeEvent } from "@mui/material";
import AppLayout from "../shared/layout/AppLayout";
import { useActiveKiosco } from "../../hooks/kiosco/useActiveKiosco";
import { useIsActiveKioscoAdmin } from "../../hooks/kiosco/useIsActiveKioscoAdmin";
import { useShopMonthlyReportDetail } from "../../hooks/stadistics/useShopMonthlyReportDetail";
import { useShopMonthlyReportPdf } from "../../hooks/stadistics/useShopMonthlyReportPdf";
import { useInitialPageLoading } from "@hooks/ui/useInitialPageLoading";
import LoadingScreen from "../shared/components/LoadingScreen/LoadingScreen";
import { ReportCompareWith } from "@typings/stadistics/stadisticsEnums";
import { formatReportMonth } from "./helpers/formatReportMonth";
import { buildMonthOptions } from "./helpers/buildMonthOptions";
import { monthKeyToLabel } from "./helpers/monthKeyToLabel";
import { getCurrentMonthKey } from "./helpers/getCurrentMonthKey";
import { getCompareAvailability } from "./helpers/getCompareAvailability";
import ShopMonthlyReportHeader from "./components/ShopMonthlyReportHeader";
import ShopMonthlyReportKpiRow from "./components/ShopMonthlyReportKpiRow";
import ShopMonthlyReportDailyChart from "./components/ShopMonthlyReportDailyChart";
import ShopMonthlyReportSellers from "./components/ShopMonthlyReportSellers";
import ShopMonthlyReportPaymentMethods from "./components/ShopMonthlyReportPaymentMethods";
import ShopMonthlyReportHourly from "./components/ShopMonthlyReportHourly";
import ShopMonthlyReportStockAlerts from "./components/ShopMonthlyReportStockAlerts";
import ShopMonthlyReportCurrentAccount from "./components/ShopMonthlyReportCurrentAccount";
import ShopMonthlyReportFooter from "./components/ShopMonthlyReportFooter";

const TWO_COLUMN_GRID_SX = {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
    gap: 2,
} as const;

const ShopStadisticsPage = (): React.ReactNode => {
    const { activeKiosco } = useActiveKiosco();
    const isAdmin = useIsActiveKioscoAdmin();
    const [month, setMonth] = useState(getCurrentMonthKey());
    const [compareWith, setCompareWith] = useState(ReportCompareWith.PreviousMonth);

    const { report, isLoading, error } = useShopMonthlyReportDetail(month, compareWith);
    const kioscoName = activeKiosco?.name ?? "";
    const pdf = useShopMonthlyReportPdf(report, kioscoName, isLoading);
    const isPageLoading = useInitialPageLoading(isLoading);

    if (isPageLoading) return <LoadingScreen label="Cargando reporte..." />;

    const monthOptions = buildMonthOptions(report?.meta.availableMonths ?? [month]);
    const monthLabel = report ? formatReportMonth(report.month) : monthKeyToLabel(month);
    const comparisonMonthLabel = report?.comparisonMonth ? formatReportMonth(report.comparisonMonth) : null;
    const compareAvailability = getCompareAvailability(Boolean(report?.meta.canCompare), isAdmin);

    const handleMonthChange = (event: SelectChangeEvent): void => setMonth(event.target.value);
    const handleCompareChange = (event: SelectChangeEvent): void => setCompareWith(event.target.value as ReportCompareWith);

    return (
        <AppLayout fullWidth>
            <Box component="section" aria-label="Reporte mensual" sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2.5 }}>
                <ShopMonthlyReportHeader
                    kioscoName={kioscoName}
                    monthLabel={monthLabel}
                    comparisonLabel={comparisonMonthLabel}
                    daysInMonth={report?.meta.daysInMonth ?? null}
                    monthOptions={monthOptions}
                    selectedMonth={month}
                    onMonthChange={handleMonthChange}
                    canChangeMonth={monthOptions.length > 1}
                    compareWith={compareWith}
                    onCompareChange={handleCompareChange}
                    canCompare={compareAvailability.canCompare}
                    compareDisabledReason={compareAvailability.disabledReason}
                    onDownloadPdf={pdf.handleDownload}
                    isDownloadDisabled={pdf.isDownloadDisabled}
                    isLoading={isLoading}
                />

                <ShopMonthlyReportKpiRow
                    summary={report?.summary ?? null}
                    compareWith={compareWith}
                    comparisonMonthLabel={comparisonMonthLabel}
                    isLoading={isLoading}
                    error={error}
                />

                <ShopMonthlyReportDailyChart
                    dailySales={report?.dailySales ?? []}
                    dailySalesSummary={report?.dailySalesSummary ?? null}
                    isLoading={isLoading}
                    error={error}
                />

                <Box sx={TWO_COLUMN_GRID_SX}>
                    <ShopMonthlyReportSellers
                        sellers={report?.sellers ?? []}
                        sellersNote={report?.sellersNote ?? null}
                        canViewAmounts={isAdmin}
                        isLoading={isLoading}
                        error={error}
                    />
                    <ShopMonthlyReportPaymentMethods
                        paymentMethods={report?.paymentMethods ?? []}
                        isLoading={isLoading}
                        error={error}
                    />
                </Box>

                <ShopMonthlyReportHourly
                    hourlyBuckets={report?.hourlyBuckets ?? []}
                    hourlySummary={report?.hourlySummary ?? null}
                    isLoading={isLoading}
                    error={error}
                />

                <Box sx={TWO_COLUMN_GRID_SX}>
                    <ShopMonthlyReportStockAlerts stockAlerts={report?.stockAlerts ?? null} isLoading={isLoading} error={error} />
                    <ShopMonthlyReportCurrentAccount currentAccount={report?.currentAccount ?? null} isLoading={isLoading} error={error} />
                </Box>

                <ShopMonthlyReportFooter kioscoName={kioscoName} generatedAt={report?.meta.generatedAt ?? null} />
            </Box>
        </AppLayout>
    );
};

export default ShopStadisticsPage;
