import { Box, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { ShopHeaderProps } from "@typings/shop/shopComponentTypes";

const ShopHeader = ({ greeting }: ShopHeaderProps): React.ReactNode => {
    const { t } = useTranslation();

    return (
        <Box component="header" sx={{ width: "100%" }}>
            <Typography
                variant="body2"
                sx={(theme: Theme) => ({ color: theme.custom.fontColor, mb: 0.5 })}
            >
                {greeting}
            </Typography>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
                {t("shop.header.title")}
            </Typography>
            <Typography
                variant="body2"
                sx={(theme: Theme) => ({ color: theme.custom.darkWhite, mt: 0.5 })}
            >
                {t("shop.header.subtitle")}
            </Typography>
        </Box>
    );
};

export default ShopHeader;
