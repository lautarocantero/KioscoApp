import { Box, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getNoisyBackgroundSx } from "../../../shared/components/NoisyBackground/NoisyBackground";
import { getPublicAssetUrl } from "../../../shared/helpers/getPublicAssetUrl";
import { type ReactNode } from "react";


const CartEmptyComponent = (): ReactNode => {
    const { t } = useTranslation();

    return (
        <Box
            sx={(theme: Theme) => ({
                ...getNoisyBackgroundSx({theme}),
                borderRadius: '8px',
                border: `1px dashed ${theme?.palette?.primary?.main}55`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                py: '2.5em',
                px: '1em',
                textAlign: 'center',
            })}
        >
            <Box
                sx={(theme: Theme) => ({
                    position: 'relative',
                    width: 88,
                    height: 88,
                    borderRadius: '50%',
                    border: `1px dashed ${theme?.palette?.primary?.main}55`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: '1em',
                    overflow: 'hidden',
                })}
            >
                <Box
                    component="img"
                    src={getPublicAssetUrl("images/stocko_images/empty_bag.png")}
                    alt={t("cart.empty.imageAlt")}
                    sx={{
                        width: 52,
                        height: 52,
                        objectFit: 'contain',
                    }}
                />
            </Box>

            <Typography variant="body1" sx={{ fontWeight: 700, mb: '0.4em' }}>
                {t("cart.empty.title")}
            </Typography>

            <Typography variant="caption" color="text.secondary">
                {t("cart.empty.descriptionLine1")} <br />
                {t("cart.empty.descriptionLine2")} <br />
                {t("cart.empty.descriptionLine3")}
            </Typography>
        </Box>
    );
};

export default CartEmptyComponent;