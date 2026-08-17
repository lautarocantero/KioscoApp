import { Box, IconButton, Typography, type Theme } from "@mui/material";
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

const getAccentColor = (theme: Theme, type: NotificationTypeEnum): string =>
    type === NotificationTypeEnum.LowStock ? theme.custom.accents.gold : theme.custom.accents.green;

const NotificationListItem = ({ notification, onToggleRead, onGoToDetail }: NotificationListItemProps): React.ReactNode => {
    const { t } = useTranslation();

    const { title } = getNotificationMessage(notification, t);
    const isUnread = notification.status === NotificationStatusEnum.NotReadYet;
    const isLowStock = notification.type === NotificationTypeEnum.LowStock;
    const statusLabel = isUnread ? t("notifications.status.unread") : t("notifications.status.read");

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
                flexDirection: "column",
                gap: 1,
                mx: 2,
                my: 1,
                p: 2,
                borderRadius: "12px",
                border: "1px solid",
                borderColor: isUnread ? `${getAccentColor(theme, notification.type)}66` : theme.custom.darkGray,
                bgcolor: isUnread ? `${getAccentColor(theme, notification.type)}0D` : "transparent",
                opacity: isUnread ? 1 : 0.65,
                cursor: "pointer",
                transition: "border-color 0.15s ease",
                "&:hover": { borderColor: getAccentColor(theme, notification.type) },
                "&:focus-visible": { outline: (theme: Theme) => `2px solid ${theme.palette.primary.main}`, outlineOffset: 2 },
            })}
        >
            {isUnread && (
                <Box
                    aria-hidden
                    sx={(theme: Theme) => ({
                        position: "absolute",
                        top: 12,
                        right: 12,
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: theme.palette.primary.main,
                    })}
                />
            )}

            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                <Box
                    aria-hidden
                    sx={(theme: Theme) => ({
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        flexShrink: 0,
                        bgcolor: `${getAccentColor(theme, notification.type)}26`,
                        color: getAccentColor(theme, notification.type),
                    })}
                >
                    {isLowStock ? <WarningAmberOutlinedIcon fontSize="small" /> : <ShoppingCartOutlinedIcon fontSize="small" />}
                </Box>

                <Box sx={{ flex: 1, minWidth: 0, pr: 2 }}>
                    <Typography
                        variant="body2"
                        sx={(theme: Theme) => ({
                            fontWeight: isUnread ? 700 : 400,
                            color: isUnread ? theme.custom.fontColor : theme.custom.translucidFontColor,
                        })}
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={(theme: Theme) => ({ display: "block", mt: 0.25, color: theme.custom.translucidFontColor })}
                    >
                        {getRelativeTime(notification.createdAt, t)}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 0.5 }}>
                <IconButton
                    size="small"
                    onClick={(event) => { event.stopPropagation(); handleToggle(); }}
                    aria-label={isUnread ? t("notifications.actions.markAsRead") : t("notifications.actions.markAsUnread")}
                    sx={(theme: Theme) => ({ color: theme.custom.translucidFontColor })}
                >
                    {isUnread ? <VisibilityOutlinedIcon fontSize="small" /> : <VisibilityOffOutlinedIcon fontSize="small" />}
                </IconButton>

                <IconButton
                    size="small"
                    onClick={(event) => { event.stopPropagation(); onGoToDetail(notification); }}
                    aria-label={t("notifications.actions.viewDetail")}
                    sx={(theme: Theme) => ({ color: theme.custom.translucidFontColor })}
                >
                    <ArrowForwardIcon fontSize="small" />
                </IconButton>
            </Box>
        </Box>
    );
};

export default NotificationListItem;
