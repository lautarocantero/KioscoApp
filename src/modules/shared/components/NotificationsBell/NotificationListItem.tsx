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

const getAccentColor = (theme: Theme, type: NotificationTypeEnum): string =>
    type === NotificationTypeEnum.LowStock ? theme.custom.accents.gold : theme.custom.accents.green;

// No leída: un paso más clara que el fondo noisy del contenedor, para
// destacar. Leída: el mismo color que ese fondo, para "camuflarse" con
// el contenedor en vez de seguir compitiendo visualmente.
const getCardBackground = (theme: Theme, isUnread: boolean): string => {
    const isLight = theme.palette.mode === "light";
    if (isUnread) return isLight ? theme.custom.white : theme.custom.background;
    return isLight ? theme.custom.lightBackground : theme.custom.darkBackground;
};

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
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: 1,
                mx: 2,
                my: 0.5,
                px: 1.25,
                py: 0.75,
                borderRadius: "8px",
                borderLeft: "3px solid",
                borderLeftColor: isUnread ? getAccentColor(theme, notification.type) : theme.custom.darkGray,
                bgcolor: getCardBackground(theme, isUnread),
                cursor: "pointer",
                transition: "border-color 0.15s ease",
                "&:hover": { borderLeftColor: getAccentColor(theme, notification.type) },
                "&:focus-visible": { outline: `2px solid ${theme.palette.primary.main}`, outlineOffset: 2 },
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
                    })}
                />
            )}

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

            {/* mensaje 80% / (tiempo + acciones) 20%, para que el mensaje nunca se corte antes de tiempo */}
            <Box sx={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                    variant="body2"
                    noWrap
                    sx={(theme: Theme) => ({
                        flex: "1 1 80%",
                        minWidth: 0,
                        color: isUnread ? theme.custom.fontColor : theme.custom.translucidFontColor,
                    })}
                >
                    {title}
                </Typography>

                <Box sx={{ flex: "0 0 20%", minWidth: "fit-content", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 0.25 }}>
                    <Typography
                        variant="caption"
                        noWrap
                        sx={(theme: Theme) => ({ color: theme.custom.translucidFontColor })}
                    >
                        {getRelativeTime(notification.createdAt, t)}
                    </Typography>

                    <Box sx={{ display: "flex", gap: 0.25 }}>
                        <Tooltip title={toggleReadLabel}>
                            <IconButton
                                size="small"
                                onClick={(event) => { event.stopPropagation(); handleToggle(); }}
                                aria-label={toggleReadLabel}
                                sx={(theme: Theme) => ({ color: theme.custom.translucidFontColor, p: 0.25 })}
                            >
                                {isUnread ? <VisibilityOutlinedIcon sx={{ fontSize: "1rem" }} /> : <VisibilityOffOutlinedIcon sx={{ fontSize: "1rem" }} />}
                            </IconButton>
                        </Tooltip>

                        <Tooltip title={goToDetailLabel}>
                            <IconButton
                                size="small"
                                onClick={(event) => { event.stopPropagation(); onGoToDetail(notification); }}
                                aria-label={goToDetailLabel}
                                sx={(theme: Theme) => ({ color: theme.custom.translucidFontColor, p: 0.25 })}
                            >
                                <ArrowForwardIcon sx={{ fontSize: "1rem" }} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default NotificationListItem;
