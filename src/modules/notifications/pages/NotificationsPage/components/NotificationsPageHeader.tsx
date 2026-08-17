import { Box, Typography, type Theme } from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { useTranslation } from "react-i18next";

const NotificationsPageHeader = (): React.ReactNode => {
    const { t } = useTranslation();

    return (
        <Box component="header" sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
                aria-hidden
                sx={(theme: Theme) => ({
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 44,
                    height: 44,
                    borderRadius: "12px",
                    bgcolor: `${theme.palette.primary.main}1F`,
                    color: theme.palette.primary.main,
                    flexShrink: 0,
                })}
            >
                <NotificationsNoneOutlinedIcon />
            </Box>

            <Box>
                <Typography
                    component="h1"
                    variant="h4"
                    sx={(theme: Theme) => ({ color: theme.custom.fontColor, fontWeight: 700 })}
                >
                    {t("notifications.title")}
                </Typography>
                <Typography variant="body2" sx={(theme: Theme) => ({ color: theme.custom.translucidFontColor })}>
                    {t("notifications.subtitle")}
                </Typography>
            </Box>
        </Box>
    );
};

export default NotificationsPageHeader;
