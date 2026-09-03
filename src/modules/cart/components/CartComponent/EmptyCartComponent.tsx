import { Box, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { type ReactNode } from "react";

// Solo el texto: la ilustración (CartMascotFace a opacidad 1) la pinta el
// padre (CartComponent) detrás de este bloque, ocupando el resto del card.
const CartEmptyComponent = (): ReactNode => {
    const { t } = useTranslation();

    return (
        <Box
            sx={{
                width: '100%',
                py: '0.75em',
                px: '0.5em',
                textAlign: 'center',
            }}
        >
            <Typography variant="body1" sx={(theme: Theme) => ({ fontWeight: 700, color: theme.custom?.fontColor })}>
                {t("cart.empty.title")}
            </Typography>
        </Box>
    );
};

export default CartEmptyComponent;
