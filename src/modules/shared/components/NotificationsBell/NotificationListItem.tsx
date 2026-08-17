import { Box, IconButton, Typography, type Theme } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useTranslation } from "react-i18next";
import type { NotificationListItemProps } from "@typings/notifications/notificationComponentTypes";
import { NotificationStatusEnum, NotificationTypeEnum } from "@typings/notifications/notificationEnums";
import { getNotificationMessage } from "../../../notifications/helpers/getNotificationMessage";
import { getRelativeTime } from "../../../notifications/helpers/getRelativeTime";

const getIconColor = (theme: Theme, type: NotificationTypeEnum): string =>
    type === NotificationTypeEnum.LowStock ? theme.custom.accents.gold : theme.custom.accents.green;

const NotificationListItem = ({ notification, onToggleRead }: NotificationListItemProps): React.ReactNode => {
    const { t } = useTranslation();

    const { title } = getNotificationMessage(notification, t);
    const isUnread = notification.status === NotificationStatusEnum.NotReadYet;
    const isLowStock = notification.type === NotificationTypeEnum.LowStock;

    return (
        <Box
            sx={(theme: Theme) => ({
                display: "flex",
                alignItems: "flex-start",
                gap: 1.5,
                px: 2.5,
                py: 1.5,
                borderLeft: "3px solid",
                borderLeftColor: isUnread ? getIconColor(theme, notification.type) : "transparent",
                opacity: isUnread ? 1 : 0.6,
            })}
        >
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
                    bgcolor: `${getIconColor(theme, notification.type)}26`,
                    color: getIconColor(theme, notification.type),
                })}
            >
                {isLowStock ? <WarningAmberOutlinedIcon fontSize="small" /> : <ShoppingCartOutlinedIcon fontSize="small" />}
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
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
                    sx={(theme: Theme) => ({ display: "block", color: theme.custom.translucidFontColor })}
                >
                    {getRelativeTime(notification.createdAt, t)}
                </Typography>
            </Box>

            <IconButton
                size="small"
                onClick={() => onToggleRead(notification._id)}
                aria-label={isUnread ? t("notifications.actions.markAsRead") : t("notifications.actions.markAsUnread")}
                sx={(theme: Theme) => ({ color: theme.custom.translucidFontColor, flexShrink: 0 })}
            >
                {isUnread ? <VisibilityOutlinedIcon fontSize="small" /> : <VisibilityOffOutlinedIcon fontSize="small" />}
            </IconButton>
        </Box>
    );
};

export default NotificationListItem;
