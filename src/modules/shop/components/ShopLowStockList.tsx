import { Box, Chip, LinearProgress, Skeleton, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { ShopLowStockListProps } from "@typings/shop/shopComponentTypes";
import { StockSeverity } from "@typings/shop/shopEnums";

const SEVERITY_LABEL_KEY: Record<StockSeverity, string> = {
    [StockSeverity.Critico]: "shop.lowStockList.severity.critical",
    [StockSeverity.Bajo]: "shop.lowStockList.severity.low",
};

// palette.warning.main === palette.error.main en este theme (mismo hex en
// light y dark), así que para diferenciar "Bajo" de "Crítico" se usa el
// accent dorado del theme (custom.accents.gold, ya documentado ahí para
// "badges destacados") en vez de un color inventado.
const getSeverityColor = (theme: Theme, severity: StockSeverity): string =>
    severity === StockSeverity.Critico ? theme.palette.error.main : theme.custom.accents.gold;

const ShopLowStockList = ({ lowStock, total, isLoading, error }: ShopLowStockListProps): React.ReactNode => {
    const { t } = useTranslation();

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                {t("shop.lowStockList.title")}
            </Typography>

            {error && (
                <Typography variant="body2" color="error">
                    {error}
                </Typography>
            )}

            {isLoading && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {[0, 1, 2].map((key) => (
                        <Skeleton key={key} variant="rounded" height={40} />
                    ))}
                </Box>
            )}

            {!isLoading && lowStock.length === 0 && !error && (
                <Typography variant="body2" sx={(t: Theme) => ({ color: t.custom.darkWhite })}>
                    {t("shop.lowStockList.empty")}
                </Typography>
            )}

            {!isLoading && lowStock.length > 0 && (
                <Box
                    role="list"
                    aria-label={t("shop.lowStockList.title")}
                    sx={{ maxHeight: 280, overflowY: "auto", pr: 0.5 }}
                >
                    {lowStock.map((item) => (
                        <Box
                            key={item.presentationId}
                            role="listitem"
                            sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 1 }}
                        >
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography variant="body2" noWrap>
                                    {item.name}
                                </Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={item.ratio * 100}
                                    sx={(t: Theme) => ({
                                        mt: 0.5,
                                        height: 6,
                                        borderRadius: 3,
                                        bgcolor: t.custom.darkGray,
                                        "& .MuiLinearProgress-bar": {
                                            borderRadius: 3,
                                            bgcolor: getSeverityColor(t, item.severity),
                                        },
                                    })}
                                />
                            </Box>

                            <Typography
                                variant="caption"
                                sx={(t: Theme) => ({ color: t.custom.darkWhite, whiteSpace: "nowrap" })}
                            >
                                {item.stock} / {item.minStock}
                            </Typography>

                            <Chip
                                label={t(SEVERITY_LABEL_KEY[item.severity])}
                                size="small"
                                sx={(t: Theme) => ({
                                    fontWeight: 700,
                                    bgcolor: item.severity === StockSeverity.Critico
                                        ? t.custom.errorLight
                                        : `${t.custom.accents.gold}33`,
                                    color: getSeverityColor(t, item.severity),
                                })}
                            />
                        </Box>
                    ))}
                </Box>
            )}

            {!isLoading && total > lowStock.length && (
                <Typography variant="caption" sx={(t: Theme) => ({ color: t.custom.darkWhite, display: "block", mt: 1 })}>
                    {t("shop.lowStockList.showingCount", { shown: lowStock.length, total })}
                </Typography>
            )}
        </Box>
    );
};

export default ShopLowStockList;
