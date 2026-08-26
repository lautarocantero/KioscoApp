import { Box, Skeleton, Stack, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import AppLayout from "../shared/layout/AppLayout";
import BackButton from "../shared/components/Buttons/BackButton";
import { useShopMonthlyReport } from "../../hooks/stadistics/useShopMonthlyReport";
import { formatCurrency } from "../cart/helpers/formatCurrency";
import { formatReportMonth } from "./helpers/formatReportMonth";

const STAT_CARD_SX = (theme: Theme) => ({
    flex: 1,
    minWidth: 180,
    border: "1px solid",
    borderColor: theme.custom.darkGray,
    borderRadius: "12px",
    padding: 2.5,
});

const ShopStadisticsPage = (): React.ReactNode => {
    const { t } = useTranslation();
    const { report, isLoading, error } = useShopMonthlyReport();

    return (
        <AppLayout fullWidth>
            <Box component="section" aria-labelledby="shop-stadistics-heading" sx={{ width: "100%" }}>
                <Typography id="shop-stadistics-heading" component="h1" variant="h4" sx={(theme: Theme) => ({ color: theme.custom.fontColor, mb: 1 })}>
                    {t("stadistics.heading")}
                </Typography>
                <Typography sx={(theme: Theme) => ({ color: theme.custom.translucidFontColor, mb: 3 })}>
                    {report ? t("stadistics.subtitle", { month: formatReportMonth(report.month) }) : t("stadistics.description")}
                </Typography>

                {error && (
                    <Typography role="alert" sx={(theme: Theme) => ({ color: theme.custom.errorDark, mb: 2 })}>
                        {error}
                    </Typography>
                )}

                <Stack direction="row" flexWrap="wrap" gap={2}>
                    {isLoading || !report ? (
                        <>
                            <Skeleton variant="rounded" width={220} height={96} />
                            <Skeleton variant="rounded" width={220} height={96} />
                            <Skeleton variant="rounded" width={220} height={96} />
                        </>
                    ) : (
                        <>
                            <Box sx={STAT_CARD_SX}>
                                <Typography variant="caption" sx={(theme: Theme) => ({ color: theme.custom.translucidFontColor })}>
                                    {t("stadistics.totalSales")}
                                </Typography>
                                <Typography variant="h5" sx={(theme: Theme) => ({ color: theme.custom.fontColor, fontWeight: 700 })}>
                                    {report.totalSales}
                                </Typography>
                            </Box>

                            <Box sx={STAT_CARD_SX}>
                                <Typography variant="caption" sx={(theme: Theme) => ({ color: theme.custom.translucidFontColor })}>
                                    {t("stadistics.totalRevenue")}
                                </Typography>
                                <Typography variant="h5" sx={(theme: Theme) => ({ color: theme.custom.fontColor, fontWeight: 700 })}>
                                    {formatCurrency(report.totalRevenue)}
                                </Typography>
                            </Box>

                            <Box sx={STAT_CARD_SX}>
                                <Typography variant="caption" sx={(theme: Theme) => ({ color: theme.custom.translucidFontColor })}>
                                    {t("stadistics.averageTicket")}
                                </Typography>
                                <Typography variant="h5" sx={(theme: Theme) => ({ color: theme.custom.fontColor, fontWeight: 700 })}>
                                    {formatCurrency(report.averageTicket)}
                                </Typography>
                            </Box>
                        </>
                    )}
                </Stack>

                <BackButton align="left" />
            </Box>
        </AppLayout>
    );
};

export default ShopStadisticsPage;
