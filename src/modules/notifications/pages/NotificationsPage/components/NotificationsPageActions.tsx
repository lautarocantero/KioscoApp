import { Box, Button, IconButton, Tooltip } from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useTranslation } from "react-i18next";
import type { NotificationsPageActionsProps } from "@typings/notifications/notificationComponentTypes";

const NotificationsPageActions = ({ onMarkAllAsRead, onDeleteAll, disabled }: NotificationsPageActionsProps): React.ReactNode => {
    const { t } = useTranslation();

    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
                size="small"
                startIcon={<DoneAllIcon fontSize="small" />}
                onClick={onMarkAllAsRead}
                disabled={disabled}
            >
                {t("notifications.markAllAsRead")}
            </Button>

            <Tooltip title={t("notifications.deleteAll")}>
                <span>
                    <IconButton
                        size="small"
                        color="error"
                        onClick={onDeleteAll}
                        disabled={disabled}
                        aria-label={t("notifications.deleteAll")}
                    >
                        <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                </span>
            </Tooltip>
        </Box>
    );
};

export default NotificationsPageActions;
