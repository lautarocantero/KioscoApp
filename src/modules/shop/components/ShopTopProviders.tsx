import { Box, Rating, Skeleton, Typography, useTheme, type Theme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { ShopTopProvidersProps } from "@typings/shop/shopComponentTypes";
import ShopInitialAvatar from "./ShopInitialAvatar";

const ACCENT_KEYS = ["blue", "green", "gold", "violet", "orange", "pink"] as const;

const ShopTopProviders = ({ featured, total, isLoading, error }: ShopTopProvidersProps): React.ReactNode => {
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <Box
            sx={(theme: Theme) => ({
                p: 2.5,
                borderRadius: "14px",
                border: "0.5px solid",
                borderColor: theme.custom.darkGray,
                bgcolor: theme.custom.background,
                height: "100%",
                minWidth: 0,
            })}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "flex-start", sm: "center" },
                    justifyContent: "space-between",
                    gap: 0.5,
                    mb: 2,
                }}
            >
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {t("shop.topProviders.title")}
                </Typography>
                <Typography
                    component={RouterLink}
                    to="/providers"
                    variant="body2"
                    sx={(t: Theme) => ({ color: t.palette.primary.main, textDecoration: "none", fontWeight: 600 })}
                >
                    {t("shop.topProviders.viewAll", { count: total })}
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

            {!isLoading && featured.length === 0 && (
                <Typography variant="body2" sx={(t: Theme) => ({ color: t.custom.darkWhite })}>
                    {t("shop.topProviders.empty")}
                </Typography>
            )}

            {!isLoading && featured.length > 0 && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    {featured.map((provider, index) => (
                        <Box key={provider._id} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <ShopInitialAvatar
                                name={provider.name}
                                color={theme.custom.accents[ACCENT_KEYS[index % ACCENT_KEYS.length]]}
                            />

                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography variant="body2" fontWeight={600} noWrap>
                                    {provider.name}
                                </Typography>
                                <Typography variant="caption" sx={(t: Theme) => ({ color: t.custom.darkWhite })} noWrap>
                                    {provider.contact_phone || provider.contact_email || t("shop.topProviders.noContact")}
                                </Typography>
                            </Box>

                            <Rating
                                value={provider.valoration}
                                readOnly
                                size="small"
                                sx={(t: Theme) => ({ color: t.palette.primary.main })}
                            />
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default ShopTopProviders;
