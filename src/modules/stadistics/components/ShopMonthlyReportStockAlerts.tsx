import { Box, Skeleton, Typography, type Theme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { ShopMonthlyReportStockAlertsProps } from "@typings/stadistics/stadisticsComponentTypes";
import { formatCurrency } from "../../cart/helpers/formatCurrency";
import PrimaryButtonComponent from "../../shared/components/Buttons/PrimaryButtonComponent";

const CARD_SX = (theme: Theme) => ({
    p: 2.5,
    borderRadius: "14px",
    border: "1px solid",
    borderColor: theme.custom.darkGray,
    bgcolor: theme.custom.lightBackground,
    height: "100%",
});

const ROW_SX = (theme: Theme, isLast: boolean) => ({
    display: "flex",
    gap: 1.5,
    py: "10px",
    borderBottom: isLast ? "none" : "1px solid",
    borderColor: theme.custom.darkGray,
});

const ShopMonthlyReportStockAlerts = ({ stockAlerts, isLoading, error }: ShopMonthlyReportStockAlertsProps): React.ReactNode => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <Box sx={CARD_SX}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 0.5 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {t("stadistics.monthlyReport.stockAlerts.title")}
                </Typography>
                <Box
                    component="span"
                    sx={(theme: Theme) => ({
                        display: "inline-flex", px: 1, py: 0.25, borderRadius: "999px", fontSize: "0.62rem",
                        fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase",
                        bgcolor: theme.custom.errorLight, color: theme.custom.white,
                    })}
                >
                    {t("stadistics.monthlyReport.stockAlerts.badge")}
                </Box>
            </Box>
            <Typography variant="body2" sx={(theme: Theme) => ({ color: theme.custom.darkWhite, mb: 1.75 })}>
                {t("stadistics.monthlyReport.stockAlerts.subtitle")}
            </Typography>

            {error && (
                <Typography role="alert" sx={(theme: Theme) => ({ color: theme.custom.errorDark, mb: 1 })}>
                    {error}
                </Typography>
            )}

            {isLoading && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {[0, 1, 2, 3].map((key) => (
                        <Skeleton key={key} variant="rounded" height={52} />
                    ))}
                </Box>
            )}

            {!isLoading && stockAlerts && (
                <>
                    <Box sx={(theme: Theme) => ROW_SX(theme, false)}>
                        <Typography variant="body2" sx={{ flex: 1 }}>{t("stadistics.monthlyReport.stockAlerts.outOfStockCount")}</Typography>
                        <Typography sx={(theme: Theme) => ({ fontSize: "1.25rem", fontWeight: 700, color: theme.custom.accents.gold })}>
                            {stockAlerts.outOfStockCount}
                        </Typography>
                    </Box>
                    <Box sx={(theme: Theme) => ROW_SX(theme, false)}>
                        <Typography variant="body2" sx={{ flex: 1 }}>{t("stadistics.monthlyReport.stockAlerts.soldBefore")}</Typography>
                        <Typography sx={(theme: Theme) => ({ fontSize: "1.25rem", fontWeight: 700, color: theme.custom.accents.gold })}>
                            {stockAlerts.outOfStockSoldInComparisonCount}
                        </Typography>
                    </Box>
                    <Box sx={(theme: Theme) => ROW_SX(theme, false)}>
                        <Typography variant="body2" sx={{ flex: 1 }}>{t("stadistics.monthlyReport.stockAlerts.lostRevenue")}</Typography>
                        <Typography sx={(theme: Theme) => ({ fontSize: "1.25rem", fontWeight: 700, color: theme.custom.accents.gold })}>
                            {formatCurrency(stockAlerts.estimatedLostRevenue)}
                        </Typography>
                    </Box>
                    <Box sx={(theme: Theme) => ROW_SX(theme, true)}>
                        <Typography variant="body2" sx={{ flex: 1 }}>{t("stadistics.monthlyReport.stockAlerts.deadStockCount")}</Typography>
                        <Typography sx={(theme: Theme) => ({ fontSize: "1.25rem", fontWeight: 700, color: theme.custom.fontColor })}>
                            {stockAlerts.deadStockCount}
                        </Typography>
                    </Box>

                    <Typography variant="body2" sx={(theme: Theme) => ({ color: theme.custom.darkWhite, my: 1.75 })}>
                        {stockAlerts.oldestDeadStock
                            ? t("stadistics.monthlyReport.stockAlerts.note", {
                                value: formatCurrency(stockAlerts.deadStockValue),
                                name: stockAlerts.oldestDeadStock.name,
                                days: stockAlerts.oldestDeadStock.days,
                            })
                            : t("stadistics.monthlyReport.stockAlerts.noteEmpty", { value: formatCurrency(stockAlerts.deadStockValue) })}
                    </Typography>

                    <PrimaryButtonComponent
                        buttonText={t("stadistics.monthlyReport.stockAlerts.restockButton")}
                        buttonOnClick={() => navigate("/receipts")}
                        buttonWidth="100%"
                        marginTop="0"
                    />
                </>
            )}
        </Box>
    );
};

export default ShopMonthlyReportStockAlerts;
