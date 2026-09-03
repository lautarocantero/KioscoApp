import { Box, Skeleton, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { ShopAttentionPanelProps } from "@typings/shop/shopComponentTypes";
import { formatCurrency } from "../../cart/helpers/formatCurrency";
import NoisyCard from "../../shared/components/Cards/NoisyCard";
import OutlinedButtonComponent from "../../shared/components/Buttons/OutlinedButtonComponent";

const ShopAttentionPanel = ({
    criticalStockCount,
    lowStockCount,
    partialsAlert,
    isLoading,
    error,
    isRestockDownloadDisabled,
    onRestockDownload,
}: ShopAttentionPanelProps): React.ReactNode => {
    const { t } = useTranslation();

    const alertCount = (criticalStockCount + lowStockCount > 0 ? 1 : 0) + (partialsAlert.count > 0 ? 1 : 0);

    return (
        <NoisyCard sx={{ p: 2.5, height: "100%", display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {t("shop.attention.title")}
                </Typography>
                {alertCount > 0 && (
                    <Typography
                        component="span"
                        sx={(theme: Theme) => ({
                            px: 1,
                            py: 0.25,
                            borderRadius: "999px",
                            fontSize: "0.62rem",
                            fontWeight: 700,
                            letterSpacing: "0.04em",
                            textTransform: "uppercase",
                            bgcolor: theme.custom.errorLight,
                            color: theme.custom.errorDark,
                        })}
                    >
                        {t("shop.attention.count", { count: alertCount })}
                    </Typography>
                )}
            </Box>

            {error && (
                <Typography variant="body2" color="error" sx={{ mb: 1 }}>
                    {error}
                </Typography>
            )}

            {isLoading && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    {[0, 1].map((key) => (
                        <Skeleton key={key} variant="rounded" height={44} />
                    ))}
                </Box>
            )}

            {!isLoading && alertCount === 0 && (
                <Typography variant="body2" sx={(theme: Theme) => ({ color: theme.custom.darkWhite })}>
                    {t("shop.attention.empty")}
                </Typography>
            )}

            {!isLoading && (criticalStockCount + lowStockCount > 0) && (
                <Box sx={(theme: Theme) => ({ display: "flex", alignItems: "center", gap: 1.5, py: 1.375, borderBottom: `1px solid ${theme.custom.darkGray}` })}>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body2" fontWeight={600}>
                            {t("shop.attention.stock.label")}
                        </Typography>
                        <Typography variant="caption" sx={(theme: Theme) => ({ color: theme.custom.darkWhite })}>
                            {t("shop.attention.stock.detail", { critical: criticalStockCount, low: lowStockCount })}
                        </Typography>
                    </Box>
                    <Typography variant="h6" sx={(theme: Theme) => ({ fontWeight: 700, color: theme.palette.error.main })}>
                        {criticalStockCount + lowStockCount}
                    </Typography>
                </Box>
            )}

            {!isLoading && partialsAlert.count > 0 && (
                <Box sx={(theme: Theme) => ({ display: "flex", alignItems: "center", gap: 1.5, py: 1.375, borderBottom: `1px solid ${theme.custom.darkGray}` })}>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body2" fontWeight={600}>
                            {t("shop.attention.debt.label")}
                        </Typography>
                        <Typography variant="caption" sx={(theme: Theme) => ({ color: theme.custom.darkWhite })}>
                            {t("shop.attention.debt.detail", { count: partialsAlert.count })}
                        </Typography>
                    </Box>
                    <Typography variant="h6" sx={(theme: Theme) => ({ fontWeight: 700, color: theme.custom.accents.gold })}>
                        {formatCurrency(partialsAlert.totalAmount)}
                    </Typography>
                </Box>
            )}

            <Box sx={{ flex: 1 }} />

            <Box sx={{ mt: 2 }}>
                <OutlinedButtonComponent
                    buttonText={t("shop.attention.restockButton")}
                    buttonOnClick={onRestockDownload}
                    buttonWidth="100%"
                    disabled={isRestockDownloadDisabled}
                />
            </Box>
        </NoisyCard>
    );
};

export default ShopAttentionPanel;
