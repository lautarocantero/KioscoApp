import { Box, Button, Popover, Typography, type Theme } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTranslation } from "react-i18next";
import type { NotificationsDropdownProps } from "@typings/notifications/notificationComponentTypes";
import { getNoisyBackgroundSx } from "../NoisyBackground/NoisyBackground";
import NotificationsDropdownSection from "./NotificationsDropdownSection";

const NotificationsDropdown = ({
    anchorEl,
    open,
    importantNotifications,
    alertNotifications,
    unreadCount,
    loading,
    onClose,
    onToggleRead,
    onGoToDetail,
    onMarkAllAsRead,
    onViewAll,
}: NotificationsDropdownProps): React.ReactNode => {
    const { t } = useTranslation();

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            aria-labelledby="notifications-dropdown-title"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            slotProps={{
                paper: {
                    sx: (theme: Theme) => ({
                        width: { xs: 360, sm: 460 },
                        mt: 1,
                        border: "0.5px solid",
                        borderColor: theme.custom.darkGray,
                        borderRadius: "16px",
                        color: theme.custom.fontColor,
                        ...getNoisyBackgroundSx({ theme }),
                    }),
                },
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "column", maxHeight: "75vh" }}>
                <Box
                    component="header"
                    sx={(theme: Theme) => ({
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        px: 2.5,
                        py: 2,
                        borderBottom: `1px solid ${theme.custom.darkGray}`,
                    })}
                >
                    <Typography
                        id="notifications-dropdown-title"
                        component="h2"
                        variant="h6"
                        sx={(theme: Theme) => ({ color: theme.custom.fontColor, fontWeight: 700 })}
                    >
                        {t("notifications.title")}
                    </Typography>

                    {unreadCount > 0 && (
                        <Button
                            size="small"
                            onClick={onMarkAllAsRead}
                            disabled={loading}
                            sx={(theme: Theme) => ({ fontSize: theme.typography.caption.fontSize })}
                        >
                            {t("notifications.markAllAsRead")}
                        </Button>
                    )}
                </Box>

                <NotificationsDropdownSection
                    title={t("notifications.sections.important")}
                    emptyMessage={t("notifications.emptyImportant")}
                    notifications={importantNotifications}
                    onToggleRead={onToggleRead}
                    onGoToDetail={onGoToDetail}
                />

                <NotificationsDropdownSection
                    title={t("notifications.sections.more")}
                    emptyMessage={t("notifications.emptyAlerts")}
                    notifications={alertNotifications}
                    onToggleRead={onToggleRead}
                    onGoToDetail={onGoToDetail}
                />

                <Box sx={(theme: Theme) => ({ px: 2.5, py: 2, borderTop: `1px solid ${theme.custom.darkGray}` })}>
                    <Button
                        fullWidth
                        endIcon={<ArrowForwardIcon fontSize="small" />}
                        onClick={onViewAll}
                        sx={(theme: Theme) => ({ fontSize: theme.typography.caption.fontSize })}
                    >
                        {t("notifications.viewAll")}
                    </Button>
                </Box>
            </Box>
        </Popover>
    );
};

export default NotificationsDropdown;
