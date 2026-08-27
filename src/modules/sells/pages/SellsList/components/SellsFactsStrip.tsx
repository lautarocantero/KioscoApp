import { Box, Typography, type Theme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { SellsFactsStripProps } from "@typings/sells/props";
import { formatCurrency } from "../../../../cart/helpers/formatCurrency";
import { formatSellsPeakHourRatio } from "../../../helpers/formatSellsPeakHourRatio";

const SellsFactsStrip = ({ facts }: SellsFactsStripProps): React.ReactNode => {
    const { t } = useTranslation();
    const { dominantPaymentMethod, peakHour, topSeller } = facts;

    return (
        <Box
            sx={(theme: Theme) => ({
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "center" },
                gap: { xs: 1.5, sm: 4 },
                mt: 2.25,
                pt: 2,
                borderTop: `1px solid ${theme.custom.darkGray}`,
            })}
        >
            <Box>
                <Typography variant="caption" sx={(theme: Theme) => ({ color: theme.custom.darkWhite })}>
                    {t("sells.contextBand.facts.dominantPaymentMethod.label")}
                </Typography>
                <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, mt: 0.25 }}>
                    {dominantPaymentMethod
                        ? t("sells.contextBand.facts.dominantPaymentMethod.value", {
                              method: t(`paymentMethod.${dominantPaymentMethod.method}`),
                              pct: dominantPaymentMethod.sharePct.toLocaleString("es-AR", { maximumFractionDigits: 0 }),
                          })
                        : t("sells.contextBand.facts.empty")}
                </Typography>
            </Box>

            <Box>
                <Typography variant="caption" sx={(theme: Theme) => ({ color: theme.custom.darkWhite })}>
                    {t("sells.contextBand.facts.peakHour.label")}
                </Typography>
                <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, mt: 0.25 }}>
                    {peakHour
                        ? t("sells.contextBand.facts.peakHour.value", {
                              start: peakHour.startHour,
                              end: peakHour.endHour,
                              ratio: formatSellsPeakHourRatio(peakHour.ticketSharePct),
                          })
                        : t("sells.contextBand.facts.empty")}
                </Typography>
            </Box>

            <Box>
                <Typography variant="caption" sx={(theme: Theme) => ({ color: theme.custom.darkWhite })}>
                    {t("sells.contextBand.facts.topSeller.label")}
                </Typography>
                <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, mt: 0.25 }}>
                    {topSeller
                        ? t("sells.contextBand.facts.topSeller.value", {
                              name: topSeller.sellerName,
                              amount: formatCurrency(topSeller.totalAmount),
                          })
                        : t("sells.contextBand.facts.empty")}
                </Typography>
            </Box>

            <Box sx={{ flex: 1 }} />

            <Typography
                component={RouterLink}
                to="/shop/stadistics"
                sx={(theme: Theme) => ({
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                    textDecoration: "none",
                    "&:focus-visible": {
                        outline: `2px solid ${theme.palette.primary.main}`,
                        outlineOffset: "2px",
                    },
                })}
            >
                {t("sells.contextBand.viewMonthlyReport")}
            </Typography>
        </Box>
    );
};

export default SellsFactsStrip;
