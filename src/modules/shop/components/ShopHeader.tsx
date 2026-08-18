import { Box, Stack, Typography, type Theme } from "@mui/material";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import { useTranslation } from "react-i18next";
import type { ShopHeaderProps } from "@typings/shop/shopComponentTypes";
import PrimaryButtonComponent from "../../shared/components/Buttons/PrimaryButtonComponent";

const ShopHeader = ({ greeting, kioscoName, onChangeKiosco }: ShopHeaderProps): React.ReactNode => {
    const { t } = useTranslation();

    return (
        <Box component="header" sx={{ width: "100%" }}>
            <Typography
                variant="body2"
                sx={(theme: Theme) => ({ color: theme.custom.fontColor, mb: 0.5 })}
            >
                {greeting}
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
                    {kioscoName}
                </Typography>
                <PrimaryButtonComponent
                    buttonText={t("shop.header.changeKiosco")}
                    buttonOnClick={onChangeKiosco}
                    buttonWidth="auto"
                    marginTop="0"
                    padding={0.75}
                    icon={<SwapHorizOutlinedIcon fontSize="small" sx={{ mr: 1 }} />}
                />
            </Stack>
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
