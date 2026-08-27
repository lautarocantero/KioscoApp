import { Box, Skeleton, Typography, useTheme, type Theme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { ShopMonthlyReportSellersProps } from "@typings/stadistics/stadisticsComponentTypes";
import { formatCurrency } from "../../cart/helpers/formatCurrency";
import { formatPercentageChange } from "../helpers/formatPercentageChange";
import ShopInitialAvatar from "../../shop/components/ShopInitialAvatar";
import ShopMonthlyReportVariationChip from "./ShopMonthlyReportVariationChip";

const ACCENT_KEYS = ["violet", "pink", "green", "blue", "orange", "gold"] as const;

const CARD_SX = (theme: Theme) => ({
    p: 2.5,
    borderRadius: "14px",
    border: "1px solid",
    borderColor: theme.custom.darkGray,
    bgcolor: theme.custom.lightBackground,
    height: "100%",
});

const ShopMonthlyReportSellers = ({
    sellers,
    sellersNote,
    canViewAmounts,
    isLoading,
    error,
}: ShopMonthlyReportSellersProps): React.ReactNode => {
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <Box sx={CARD_SX}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.75 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {t("stadistics.monthlyReport.sellers.title")}
                </Typography>
                <Typography
                    component={RouterLink}
                    to="/sellers"
                    variant="body2"
                    sx={(theme: Theme) => ({ color: theme.palette.primary.main, textDecoration: "none", fontWeight: 600 })}
                >
                    {t("stadistics.monthlyReport.sellers.viewAll")}
                </Typography>
            </Box>

            {error && (
                <Typography role="alert" sx={(theme: Theme) => ({ color: theme.custom.errorDark, mb: 1 })}>
                    {error}
                </Typography>
            )}

            {isLoading && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.75 }}>
                    {[0, 1, 2].map((key) => (
                        <Skeleton key={key} variant="rounded" height={52} />
                    ))}
                </Box>
            )}

            {!isLoading && !canViewAmounts && (
                <Typography variant="body2" sx={(theme: Theme) => ({ color: theme.custom.darkWhite })}>
                    {t("permissions.adminOnly")}
                </Typography>
            )}

            {!isLoading && canViewAmounts && sellers.length === 0 && (
                <Typography variant="body2" sx={(theme: Theme) => ({ color: theme.custom.darkWhite })}>
                    {t("stadistics.monthlyReport.sellers.empty")}
                </Typography>
            )}

            {!isLoading && canViewAmounts && sellers.length > 0 && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.75 }}>
                    {sellers.map((seller, index) => (
                        <Box key={seller.sellerId} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <ShopInitialAvatar
                                name={seller.sellerName}
                                color={theme.custom.accents[ACCENT_KEYS[index % ACCENT_KEYS.length]]}
                            />

                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography variant="body2" fontWeight={600} noWrap>
                                    {seller.sellerName}
                                </Typography>
                                <Box sx={(theme: Theme) => ({ height: 6, borderRadius: "3px", bgcolor: theme.custom.darkGray, mt: 0.75 })}>
                                    <Box
                                        sx={(theme: Theme) => ({
                                            width: `${Math.min(100, seller.participationPct)}%`,
                                            height: "100%",
                                            borderRadius: "3px",
                                            bgcolor: theme.palette.primary.main,
                                        })}
                                    />
                                </Box>
                            </Box>

                            <Box sx={{ textAlign: "right" }}>
                                <Typography variant="body2" fontWeight={700}>
                                    {formatCurrency(seller.amount)}
                                </Typography>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, justifyContent: "flex-end" }}>
                                    <Typography variant="caption" sx={(theme: Theme) => ({ color: theme.custom.darkWhite })}>
                                        {t("stadistics.monthlyReport.sellers.tickets", { count: seller.ticketsCount })}
                                    </Typography>
                                    {seller.isNew && (
                                        <Typography variant="caption" sx={(theme: Theme) => ({ color: theme.custom.darkWhite })}>
                                            · {t("stadistics.monthlyReport.sellers.new")}
                                        </Typography>
                                    )}
                                    {!seller.isNew && seller.changePct !== null && (
                                        <ShopMonthlyReportVariationChip {...formatPercentageChange(seller.changePct)} />
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Box>
            )}

            {!isLoading && canViewAmounts && sellersNote && (
                <Typography variant="body2" sx={(theme: Theme) => ({ color: theme.custom.darkWhite, mt: 1.75 })}>
                    {t("stadistics.monthlyReport.sellers.note", {
                        sellerName: sellersNote.sellerName,
                        amount: formatCurrency(sellersNote.maxTicketAmount),
                    })}
                </Typography>
            )}
        </Box>
    );
};

export default ShopMonthlyReportSellers;
