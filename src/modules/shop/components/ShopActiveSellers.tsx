import { Box, Skeleton, Typography, useTheme, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { ShopActiveSellersProps } from "@typings/shop/shopComponentTypes";
import { formatCurrency } from "../../cart/helpers/formatCurrency";
import SellerStatusIndicator from "../../sellers/components/SellersList/SellerStatusIndicator";
import NoisyCard from "../../shared/components/Cards/NoisyCard";
import ShopInitialAvatar from "./ShopInitialAvatar";

const ACCENT_KEYS = ["violet", "pink", "green", "blue", "orange", "gold"] as const;

const ShopActiveSellers = ({ activeSellers, isLoading, error }: ShopActiveSellersProps): React.ReactNode => {
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <NoisyCard sx={{ p: 2.5, height: "100%" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                {t("shop.activeSellers.title")}
            </Typography>

            {error && (
                <Typography variant="body2" color="error" sx={{ mb: 1 }}>
                    {error}
                </Typography>
            )}

            {isLoading && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    {[0, 1].map((key) => (
                        <Skeleton key={key} variant="rounded" height={52} />
                    ))}
                </Box>
            )}

            {!isLoading && activeSellers.length === 0 && (
                <Typography variant="body2" sx={(t: Theme) => ({ color: t.custom.darkWhite })}>
                    {t("shop.activeSellers.empty")}
                </Typography>
            )}

            {!isLoading && activeSellers.length > 0 && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    {activeSellers.map((seller, index) => (
                        <Box key={seller.sellerId} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <ShopInitialAvatar
                                name={seller.sellerName}
                                color={theme.custom.accents[ACCENT_KEYS[index % ACCENT_KEYS.length]]}
                            />

                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography variant="body2" fontWeight={600} noWrap>
                                    {seller.sellerName}
                                </Typography>
                                <Typography variant="caption" sx={(t: Theme) => ({ color: t.custom.darkWhite })}>
                                    {t("shop.activeSellers.orders", { count: seller.ordersCount })}
                                </Typography>
                            </Box>

                            <Box sx={{ textAlign: "right" }}>
                                <Typography variant="body2" fontWeight={700}>
                                    {formatCurrency(seller.totalAmount)}
                                </Typography>
                                <SellerStatusIndicator status={seller.status} />
                            </Box>
                        </Box>
                    ))}
                </Box>
            )}
        </NoisyCard>
    );
};

export default ShopActiveSellers;
