import { type ReactNode } from "react";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { NotificationEntity } from "@typings/notifications/notificationTypes";
import { NotificationFilterEnum } from "@typings/notifications/notificationEnums";
import DataTable from "../../../shared/components/DataTable/DataTable";
import AppLayout from "../../../shared/layout/AppLayout";
import ConfirmDialog from "../../../shared/components/ConfirmDialog/ConfirmDialog";
import { useNotificationsPage } from "../../../../hooks/notifications/useNotificationsPage";
import NotificationsPageHeader from "./components/NotificationsPageHeader";
import NotificationsPageActions from "./components/NotificationsPageActions";
import NotificationsFilterTabs from "./components/NotificationsFilterTabs";

const NotificationsPage = (): ReactNode => {
    const { t } = useTranslation();

    const {
        loading,
        error,
        clearError,
        filter,
        setFilter,
        counts,
        rows,
        columns,
        deleteDialog,
        handleDeleteCancel,
        handleDeleteConfirm,
        deleteAllDialogOpen,
        handleDeleteAllRequest,
        handleDeleteAllCancel,
        handleDeleteAllConfirm,
        handleMarkAllAsRead,
    } = useNotificationsPage();

    return (
        <AppLayout fullWidth>
            <NotificationsPageHeader />

            <DataTable<NotificationEntity>
                rows={rows}
                columns={columns}
                loading={loading}
                error={error}
                onClearError={clearError}
                emptyMessage={t("notifications.emptyMessage")}
                height="35em"
                getRowId={(row) => row._id}
                extraActions={
                    <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", gap: 2 }}>
                        <NotificationsFilterTabs filter={filter} counts={counts} onChange={setFilter} />
                        <NotificationsPageActions
                            onMarkAllAsRead={handleMarkAllAsRead}
                            onDeleteAll={handleDeleteAllRequest}
                            disabled={counts[NotificationFilterEnum.All] === 0}
                        />
                    </Box>
                }
                deleteDialog={{
                    open: deleteDialog.open,
                    title: t("notifications.deleteDialog.title"),
                    description: deleteDialog.name,
                    confirmLabel: t("notifications.deleteDialog.confirm"),
                    onConfirm: () => void handleDeleteConfirm(),
                    onCancel: handleDeleteCancel,
                }}
            />

            <ConfirmDialog
                open={deleteAllDialogOpen}
                title={t("notifications.deleteAllDialog.title")}
                description={t("notifications.deleteAllDialog.description")}
                confirmLabel={t("notifications.deleteAllDialog.confirm")}
                onConfirm={() => void handleDeleteAllConfirm()}
                onCancel={handleDeleteAllCancel}
            />
        </AppLayout>
    );
};

export default NotificationsPage;
