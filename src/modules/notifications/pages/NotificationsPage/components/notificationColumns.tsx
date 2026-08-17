import { type GridColDef } from "@mui/x-data-grid";
import { Box, Chip, Typography, type Theme } from "@mui/material";
import type { BuildNotificationColumnsArgs, NotificationEntity } from "@typings/notifications/notificationTypes";
import { NotificationStatusEnum, NotificationTypeEnum } from "@typings/notifications/notificationEnums";
import RowActionsCell from "../../../../shared/components/DataTable/RowActionsCell";
import { CellCenter } from "../../../../shared/components/DataTable/CellCenter";
import { getNotificationMessage } from "../../../helpers/getNotificationMessage";
import { getRelativeTime } from "../../../helpers/getRelativeTime";

const getCategoryColor = (theme: Theme, type: NotificationTypeEnum): string =>
    type === NotificationTypeEnum.LowStock ? theme.custom.accents.gold : theme.custom.accents.green;

export const buildColumnsForNotifications = ({
    onDeleteRequest,
    onToggleRead,
    onGoToDetail,
    t,
}: BuildNotificationColumnsArgs): GridColDef<NotificationEntity>[] => [
    {
        field: "message",
        headerName: t("notifications.columns.message"),
        flex: 2.4,
        minWidth: 280,
        sortable: false,
        renderCell: (params) => {
            const { title, subtitle } = getNotificationMessage(params.row, t);
            const isUnread = params.row.status === NotificationStatusEnum.NotReadYet;

            return (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, py: 1, minWidth: 0 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Chip
                            size="small"
                            label={t(`notifications.categories.${params.row.type === NotificationTypeEnum.LowStock ? "lowStock" : "sale"}`)}
                            sx={(theme: Theme) => ({
                                bgcolor: `${getCategoryColor(theme, params.row.type)}33`,
                                color: getCategoryColor(theme, params.row.type),
                                fontWeight: 600,
                            })}
                        />
                        <Typography
                            variant="caption"
                            sx={(theme: Theme) => ({ color: theme.custom.translucidFontColor })}
                        >
                            {getRelativeTime(params.row.createdAt, t)}
                        </Typography>
                    </Box>

                    <Typography
                        variant="body2"
                        title={title}
                        sx={(theme: Theme) => ({
                            fontWeight: isUnread ? 700 : 400,
                            color: isUnread ? theme.custom.fontColor : theme.custom.translucidFontColor,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        })}
                    >
                        {title}
                    </Typography>

                    <Typography
                        variant="caption"
                        title={subtitle}
                        sx={(theme: Theme) => ({
                            color: theme.custom.translucidFontColor,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        })}
                    >
                        {subtitle}
                    </Typography>
                </Box>
            );
        },
    },
    {
        field: "status",
        headerName: t("notifications.columns.status"),
        width: 140,
        sortable: false,
        renderCell: (params) => {
            const isUnread = params.row.status === NotificationStatusEnum.NotReadYet;

            return (
                <CellCenter>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        {isUnread && (
                            <Box
                                aria-hidden
                                sx={(theme: Theme) => ({
                                    width: 8,
                                    height: 8,
                                    borderRadius: "50%",
                                    bgcolor: theme.palette.primary.main,
                                })}
                            />
                        )}
                        <Typography
                            variant="body2"
                            sx={(theme: Theme) => ({
                                color: isUnread ? theme.custom.fontColor : theme.custom.translucidFontColor,
                            })}
                        >
                            {isUnread ? t("notifications.status.unread") : t("notifications.status.read")}
                        </Typography>
                    </Box>
                </CellCenter>
            );
        },
    },
    {
        field: "actions",
        headerName: t("notifications.columns.actions"),
        width: 160,
        sortable: false,
        filterable: false,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => {
            const { title } = getNotificationMessage(params.row, t);
            const isRead = params.row.status === NotificationStatusEnum.Readed;

            return (
                <CellCenter>
                    <RowActionsCell
                        isRead={isRead}
                        toggleReadLabel={isRead ? t("notifications.actions.markAsUnread") : t("notifications.actions.markAsRead")}
                        onToggleRead={() => onToggleRead(params.row._id, params.row.status)}
                        goToDetailLabel={t("notifications.actions.viewDetail")}
                        onGoToDetail={() => onGoToDetail(params.row)}
                        onDelete={() => onDeleteRequest(params.row._id, title)}
                    />
                </CellCenter>
            );
        },
    },
];
