import { Box, Skeleton, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { ShopTopProductsTodayProps } from "@typings/shop/shopComponentTypes";
import { formatCurrency } from "../../cart/helpers/formatCurrency";
import NoisyCard from "../../shared/components/Cards/NoisyCard";

const ShopTopProductsToday = ({ topProducts, isLoading, error }: ShopTopProductsTodayProps): React.ReactNode => {
    const { t } = useTranslation();

    const maxAmount = topProducts[0]?.amount ?? 0;

    return (
        <NoisyCard sx={{ p: 2.5, height: "100%" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                {t("shop.topProductsToday.title")}
            </Typography>

            {error && (
                <Typography variant="body2" color="error" sx={{ mb: 1 }}>
                    {error}
                </Typography>
            )}

            {isLoading && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    {[0, 1, 2].map((key) => (
                        <Skeleton key={key} variant="rounded" height={40} />
                    ))}
                </Box>
            )}

            {!isLoading && topProducts.length === 0 && (
                <Typography variant="body2" sx={(theme: Theme) => ({ color: theme.custom.darkWhite })}>
                    {t("shop.topProductsToday.empty")}
                </Typography>
            )}

            {!isLoading && topProducts.length > 0 && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    {topProducts.map((product, index) => (
                        <Box key={product.productId} sx={{ display: "flex", alignItems: "center", gap: 1.75 }}>
                            <Typography variant="caption" sx={(theme: Theme) => ({ width: 20, fontWeight: 700, color: theme.custom.darkWhite })}>
                                {String(index + 1).padStart(2, "0")}
                            </Typography>

                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography variant="body2" fontWeight={600} noWrap>
                                    {product.name}
                                </Typography>
                                <Box sx={(theme: Theme) => ({ height: 6, borderRadius: "3px", bgcolor: theme.custom.darkGray, mt: 0.5 })}>
                                    <Box
                                        sx={(theme: Theme) => ({
                                            height: "100%",
                                            borderRadius: "3px",
                                            bgcolor: theme.palette.primary.main,
                                            width: maxAmount > 0 ? `${Math.round((product.amount / maxAmount) * 100)}%` : "0%",
                                        })}
                                    />
                                </Box>
                            </Box>

                            <Typography variant="caption" sx={(theme: Theme) => ({ color: theme.custom.darkWhite, width: 48, textAlign: "right" })}>
                                {t("shop.topProductsToday.quantity", { count: product.quantity })}
                            </Typography>
                            <Typography variant="body2" fontWeight={700} sx={{ width: 88, textAlign: "right" }}>
                                {formatCurrency(product.amount)}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            )}
        </NoisyCard>
    );
};

export default ShopTopProductsToday;
