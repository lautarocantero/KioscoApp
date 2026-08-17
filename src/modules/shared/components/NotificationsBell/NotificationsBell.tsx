import { lazy, Suspense } from "react";
import { Badge, IconButton, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { useTranslation } from "react-i18next";
import { useNotificationsBell } from "../../../../hooks/notifications/useNotificationsBell";

const NotificationsDropdown = lazy(() => import("./NotificationsDropdown"));

const NotificationsBell = (): React.ReactNode => {
    const { t } = useTranslation();

    const {
        anchorEl,
        open,
        unreadCount,
        importantNotifications,
        alertNotifications,
        loading,
        handleOpen,
        handleClose,
        handleToggleRead,
        handleGoToDetail,
        handleMarkAllAsRead,
        handleViewAll,
    } = useNotificationsBell();

    return (
        <>
            <IconButton
                onClick={handleOpen}
                aria-label={unreadCount > 0
                    ? t("notifications.unreadBadgeLabel", { count: unreadCount })
                    : t("notifications.bellLabel")}
                sx={(theme: Theme) => ({
                    bgcolor: theme.custom.background,
                    border: "0.5px solid",
                    borderColor: theme.custom.darkGray,
                    boxShadow: `0 1px 3px ${alpha(theme.custom.black, 0.06)}`,
                })}
            >
                <Badge color="primary" badgeContent={unreadCount} max={9}>
                    <NotificationsNoneOutlinedIcon sx={(theme: Theme) => ({ color: theme.custom.fontColor })} />
                </Badge>
            </IconButton>

            {open && (
                <Suspense fallback={null}>
                    <NotificationsDropdown
                        anchorEl={anchorEl}
                        open={open}
                        importantNotifications={importantNotifications}
                        alertNotifications={alertNotifications}
                        unreadCount={unreadCount}
                        loading={loading}
                        onClose={handleClose}
                        onToggleRead={handleToggleRead}
                        onGoToDetail={handleGoToDetail}
                        onMarkAllAsRead={handleMarkAllAsRead}
                        onViewAll={handleViewAll}
                    />
                </Suspense>
            )}
        </>
    );
};

export default NotificationsBell;
