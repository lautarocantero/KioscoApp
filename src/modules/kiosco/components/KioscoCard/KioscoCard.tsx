import { useState } from "react";
import { Box, Stack, Typography, useTheme, type Theme } from "@mui/material";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { useTranslation } from "react-i18next";
import type { KioscoCardProps } from "@typings/kiosco/kioscoComponentTypes";
import { getKioscoAccentColor } from "../../helpers/getKioscoAccentColor";
import { formatLastAccessedAt } from "../../helpers/formatLastAccessedAt";
import { formatPrice } from "../../../shared/helpers/formarPrice";
import { getNoisyBackgroundSx } from "../../../shared/components/NoisyBackground/NoisyBackground";
import PrimaryButtonComponent from "../../../shared/components/Buttons/PrimaryButtonComponent";

const KioscoCard = ({ kiosco, colorIndex, entering, onEnter }: KioscoCardProps): React.ReactNode => {
    const { t } = useTranslation();
    const theme = useTheme();
    const accentColor = getKioscoAccentColor(theme, colorIndex);
    const [isHovered, setIsHovered] = useState(false);

    // El hover pisa el fondo con primary.main (color sólido, sin relación con
    // accentColor): a partir de acá, todo lo que dependía del contraste contra
    // el fondo oscuro/claro original pasa a blanco fijo, que funciona sobre
    // cualquier tono de primary.main (claro u oscuro).
    const mutedTextColor = isHovered ? theme.custom.white : theme.custom.darkWhite;
    const dividerColor = isHovered ? "rgba(255,255,255,0.35)" : theme.custom.darkGray;
    const badgeBackground = isHovered ? "rgba(255,255,255,0.2)" : `${accentColor}22`;
    const badgeIconColor = isHovered ? theme.custom.white : accentColor;

    return (
        <Box
            component="article"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={(theme: Theme) => ({
                ...getNoisyBackgroundSx({
                    theme,
                    backgroundColor: isHovered ? theme.palette.primary.main : theme.custom.blackTranslucid,
                }),
                border: "0.1px solid",
                borderColor: theme.palette.primary.main,
                borderRadius: "16px",
                p: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                height: "100%",
                transition: "background-color 0.2s ease",
            })}
        >
            <Stack direction="row" spacing={2} alignItems="center">
                <Box
                    sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: isHovered ? theme.custom.white : accentColor,
                        flexShrink: 0,
                    }}
                >
                    <StorefrontOutlinedIcon sx={{ color: isHovered ? accentColor : "#fff" }} />
                </Box>
                <Box sx={{ minWidth: 0 }}>
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, color: isHovered ? theme.custom.white : undefined }}
                        noWrap
                    >
                        {kiosco.name}
                    </Typography>
                    {kiosco.address && (
                        <Stack direction="row" spacing={0.5} alignItems="center">
                            <PlaceOutlinedIcon
                                sx={{ fontSize: 16, color: isHovered ? theme.custom.white : accentColor, flexShrink: 0 }}
                            />
                            <Typography
                                variant="body2"
                                sx={{ color: isHovered ? theme.custom.white : accentColor, fontWeight: 500 }}
                                noWrap
                            >
                                {kiosco.address}
                            </Typography>
                        </Stack>
                    )}
                </Box>
            </Stack>

            <Box
                sx={{
                    borderTop: "0.5px solid",
                    borderColor: dividerColor,
                    transition: "border-color 0.2s ease",
                }}
            />

            <Stack
                direction="row"
                spacing={2}
                sx={{
                    backgroundColor: isHovered ? "rgba(0,0,0,0.2)" : theme.custom.blackTranslucid,
                    borderRadius: "12px",
                    p: 1.5,
                }}
            >
                <Stack direction="row" spacing={1.25} alignItems="center" sx={{ flex: 1 }}>
                    <Box
                        sx={{
                            width: 32,
                            height: 32,
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: badgeBackground,
                            flexShrink: 0,
                        }}
                    >
                        <GroupOutlinedIcon sx={{ fontSize: 18, color: badgeIconColor }} />
                    </Box>
                    <Box>
                        <Typography variant="caption" sx={{ color: mutedTextColor, display: "block" }}>
                            {t("kiosco.selector.card.sellers")}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ fontWeight: 700, color: isHovered ? theme.custom.white : undefined }}
                        >
                            {kiosco.sellers_count}
                        </Typography>
                    </Box>
                </Stack>

                <Stack direction="row" spacing={1.25} alignItems="center" sx={{ flex: 1 }}>
                    <Box
                        sx={{
                            width: 32,
                            height: 32,
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: badgeBackground,
                            flexShrink: 0,
                        }}
                    >
                        <BarChartOutlinedIcon sx={{ fontSize: 18, color: badgeIconColor }} />
                    </Box>
                    <Box>
                        <Typography variant="caption" sx={{ color: mutedTextColor, display: "block" }}>
                            {t("kiosco.selector.card.salesToday")}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ fontWeight: 700, color: isHovered ? theme.custom.white : undefined }}
                        >
                            {formatPrice(kiosco.sells_today_total)}
                        </Typography>
                    </Box>
                </Stack>
            </Stack>

            <Stack direction="row" spacing={1.25} alignItems="center">
                <AccessTimeOutlinedIcon sx={{ fontSize: 28, color: badgeIconColor, flexShrink: 0 }} />
                <Box>
                    <Typography variant="caption" sx={{ color: mutedTextColor, display: "block" }}>
                        {t("kiosco.selector.card.lastAccess")}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, color: isHovered ? theme.custom.white : undefined }}
                    >
                        {formatLastAccessedAt(kiosco.last_accessed_at, t)}
                    </Typography>
                </Box>
            </Stack>

            <Box
                sx={{
                    mt: "auto",
                    borderRadius: "0.4em",
                    border: "1.5px solid",
                    borderColor: isHovered ? theme.custom.white : "transparent",
                    transition: "border-color 0.2s ease",
                }}
            >
                <PrimaryButtonComponent
                    buttonText={entering ? t("kiosco.selector.card.entering") : t("kiosco.selector.card.enter")}
                    buttonOnClick={onEnter}
                    buttonWidth="100%"
                    disabled={Boolean(entering)}
                    marginTop="0"
                />
            </Box>
        </Box>
    );
};

export default KioscoCard;
