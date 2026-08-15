import { Box, Skeleton, Typography, useTheme, type Theme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import type { ShopTopSellersProps } from "@typings/shop/shopComponentTypes";
import { formatCurrency } from "../../cart/helpers/formatCurrency";
import SellerStatusIndicator from "../../sellers/components/SellersList/SellerStatusIndicator";
import ShopInitialAvatar from "./ShopInitialAvatar";

const ACCENT_KEYS = ["violet", "pink", "green", "blue", "orange", "gold"] as const;

const ShopTopSellers = ({ topSellers, isLoading, error }: ShopTopSellersProps): React.ReactNode => {
    const theme = useTheme();

    return (
        <Box
            sx={(theme: Theme) => ({
                p: 2.5,
                borderRadius: "14px",
                border: "0.5px solid",
                borderColor: theme.custom.darkGray,
                bgcolor: theme.custom.background,
                height: "100%",
            })}
        >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Vendedores destacados
                </Typography>
                <Typography
                    component={RouterLink}
                    to="/sellers"
                    variant="body2"
                    sx={(t: Theme) => ({ color: t.palette.primary.main, textDecoration: "none", fontWeight: 600 })}
                >
                    Ver todos →
                </Typography>
            </Box>

            {error && (
                <Typography variant="body2" color="error" sx={{ mb: 1 }}>
                    {error}
                </Typography>
            )}

            {isLoading && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    {[0, 1, 2].map((key) => (
                        <Skeleton key={key} variant="rounded" height={52} />
                    ))}
                </Box>
            )}

            {!isLoading && topSellers.length === 0 && (
                <Typography variant="body2" sx={(t: Theme) => ({ color: t.custom.darkWhite })}>
                    Todavía no hay ventas registradas este mes.
                </Typography>
            )}

            {!isLoading && topSellers.length > 0 && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    {topSellers.map((seller, index) => (
                        <Box key={seller.sellerId} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <ShopInitialAvatar
                                name={seller.sellerName}
                                color={theme.custom.accents[ACCENT_KEYS[index % ACCENT_KEYS.length]]}
                            />

                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography variant="body2" fontWeight={600} noWrap>
                                    {seller.sellerName}
                                </Typography>
                                <SellerStatusIndicator status={seller.status} />
                            </Box>

                            <Box sx={{ textAlign: "right" }}>
                                <Typography variant="body2" fontWeight={700}>
                                    {formatCurrency(seller.totalAmount)}
                                </Typography>
                                <Typography variant="caption" sx={(t: Theme) => ({ color: t.custom.darkWhite })}>
                                    {seller.ordersCount} {seller.ordersCount === 1 ? "pedido" : "pedidos"}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default ShopTopSellers;
