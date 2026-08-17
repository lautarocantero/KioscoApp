import { Box, Typography, type Theme } from "@mui/material";
import type { NotificationsDropdownSectionProps } from "@typings/notifications/notificationComponentTypes";
import NotificationListItem from "./NotificationListItem";

const NotificationsDropdownSection = ({
    title,
    emptyMessage,
    notifications,
    onToggleRead,
    onGoToDetail,
}: NotificationsDropdownSectionProps): React.ReactNode => (
    <Box component="section" aria-label={title} sx={(theme: Theme) => ({ borderTop: `1px solid ${theme.custom.darkGray}` })}>
        <Typography
            component="h3"
            variant="overline"
            sx={(theme: Theme) => ({ px: 2.5, pt: 1.5, display: "block", color: theme.custom.translucidFontColor })}
        >
            {title}
        </Typography>

        <Box sx={{ maxHeight: 260, overflowY: "auto", display: "flex", flexDirection: "column" }}>
            {notifications.length === 0 && (
                <Typography
                    variant="body2"
                    sx={(theme: Theme) => ({ px: 2.5, py: 2, color: theme.custom.translucidFontColor })}
                >
                    {emptyMessage}
                </Typography>
            )}

            {notifications.map((notification) => (
                <NotificationListItem
                    key={notification._id}
                    notification={notification}
                    onToggleRead={onToggleRead}
                    onGoToDetail={onGoToDetail}
                />
            ))}
        </Box>
    </Box>
);

export default NotificationsDropdownSection;
