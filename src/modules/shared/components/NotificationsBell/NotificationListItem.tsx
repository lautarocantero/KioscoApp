import { Box, IconButton, Tooltip, Typography, type Theme } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useTranslation } from "react-i18next";
import type { NotificationListItemProps } from "@typings/notifications/notificationComponentTypes";
import { NotificationStatusEnum, NotificationTypeEnum } from "@typings/notifications/notificationEnums";
import { getNotificationMessage } from "../../../notifications/helpers/getNotificationMessage";
import { getRelativeTime } from "../../../notifications/helpers/getRelativeTime";
import { getGoToDetailLabel } from "../../../notifications/helpers/getGoToDetailLabel";
import { getNoisyBackgroundSx } from "../NoisyBackground/NoisyBackground";

const getAccentColor = (theme: Theme, type: NotificationTypeEnum): string =>
    type === NotificationTypeEnum.LowStock ? theme.custom.accents.gold : theme.custom.accents.green;

const NotificationListItem = ({ notification, onToggleRead, onGoToDetail }: NotificationListItemProps): React.ReactNode => {
    const { t } = useTranslation();

    const { title } = getNotificationMessage(notification, t);
    const isUnread = notification.status === NotificationStatusEnum.NotReadYet;
    const isLowStock = notification.type === NotificationTypeEnum.LowStock;
    const statusLabel = isUnread ? t("notifications.status.unread") : t("notifications.status.read");
    const toggleReadLabel = isUnread ? t("notifications.actions.markAsRead") : t("notifications.actions.markAsUnread");
    const goToDetailLabel = getGoToDetailLabel(notification, t);

    const handleToggle = (): void => onToggleRead(notification._id, notification.status);

    return (
        <Box
            role="button"
            tabIndex={0}
            aria-label={`${title} — ${statusLabel}`}
            onClick={handleToggle}
            onKeyDown={(event) => {
                if (event.key !== "Enter" && event.key !== " ") return;
                event.preventDefault();
                handleToggle();
            }}
            sx={(theme: Theme) => ({
                display: "flex",
                flexDirection: "column",
                gap: 0.25,
                mx: 2,
                my: 0.5,
                px: 1.25,
                py: 0.75,
                borderRadius: "8px",
                borderLeft: "3px solid",
                borderLeftColor: isUnread ? getAccentColor(theme, notification.type) : theme.custom.darkGray,
                opacity: isUnread ? 1 : 0.65,
                cursor: "pointer",
                transition: "border-color 0.15s ease",
                "&:hover": { borderLeftColor: getAccentColor(theme, notification.type) },
                "&:focus-visible": { outline: `2px solid ${theme.palette.primary.main}`, outlineOffset: 2 },
                ...getNoisyBackgroundSx({ theme }),
            })}
        >
            {isUnread && (
                <Box
                    aria-hidden
                    sx={(theme: Theme) => ({
                        position: "absolute",
                        top: 8,
                        right: 8,
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        bgcolor: theme.palette.primary.main,
                        zIndex: 1,
                    })}
                />
            )}

            <Box sx={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                    aria-hidden
                    sx={(theme: Theme) => ({
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        flexShrink: 0,
                        bgcolor: `${getAccentColor(theme, notification.type)}26`,
                        color: getAccentColor(theme, notification.type),
                    })}
                >
                    {isLowStock ? <WarningAmberOutlinedIcon sx={{ fontSize: "0.9rem" }} /> : <ShoppingCartOutlinedIcon sx={{ fontSize: "0.9rem" }} />}
                </Box>

                <Typography
                    variant="body2"
                    noWrap
                    sx={(theme: Theme) => ({
                        flex: 1,
                        minWidth: 0,
                        color: isUnread ? theme.custom.fontColor : theme.custom.translucidFontColor,
                    })}
                >
                    {title}
                </Typography>

                <Typography
                    variant="caption"
                    sx={(theme: Theme) => ({ flexShrink: 0, color: theme.custom.translucidFontColor })}
                >
                    {getRelativeTime(notification.createdAt, t)}
                </Typography>
            </Box>

            <Box sx={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "flex-end", gap: 0.25 }}>
                <Tooltip title={toggleReadLabel}>
                    <IconButton
                        size="small"
                        onClick={(event) => { event.stopPropagation(); handleToggle(); }}
                        aria-label={toggleReadLabel}
                        sx={(theme: Theme) => ({ color: theme.custom.translucidFontColor, p: 0.5 })}
                    >
                        {isUnread ? <VisibilityOutlinedIcon fontSize="small" /> : <VisibilityOffOutlinedIcon fontSize="small" />}
                    </IconButton>
                </Tooltip>

                <Tooltip title={goToDetailLabel}>
                    <IconButton
                        size="small"
                        onClick={(event) => { event.stopPropagation(); onGoToDetail(notification); }}
                        aria-label={goToDetailLabel}
                        sx={(theme: Theme) => ({ color: theme.custom.translucidFontColor, p: 0.5 })}
                    >
                        <ArrowForwardIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
};

export default NotificationListItem;
