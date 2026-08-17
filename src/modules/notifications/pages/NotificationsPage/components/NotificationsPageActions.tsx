import { Box, Button } from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useTranslation } from "react-i18next";
import type { NotificationsPageActionsProps } from "@typings/notifications/notificationComponentTypes";
import { getTableActionButtonSx } from "../../../../shared/components/DataTable/getTableActionButtonSx";

const NotificationsPageActions = ({ onMarkAllAsRead, onDeleteAll, disabled }: NotificationsPageActionsProps): React.ReactNode => {
    const { t } = useTranslation();

    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Button
                disableElevation
                startIcon={<DoneAllIcon sx={{ fontSize: "1.1rem" }} />}
                onClick={onMarkAllAsRead}
                disabled={disabled}
                sx={(theme) => getTableActionButtonSx(theme, "secondary")}
            >
                {t("notifications.markAllAsRead")}
            </Button>

            <Button
                disableElevation
                startIcon={<DeleteOutlineIcon sx={{ fontSize: "1.1rem" }} />}
                onClick={onDeleteAll}
                disabled={disabled}
                sx={(theme) => getTableActionButtonSx(theme, "error")}
            >
                {t("notifications.deleteAll")}
            </Button>
        </Box>
    );
};

export default NotificationsPageActions;
