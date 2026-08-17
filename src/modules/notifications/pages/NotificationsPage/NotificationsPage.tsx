import { type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import type { NotificationEntity } from "@typings/notifications/notificationTypes";
import { NotificationFilterEnum } from "@typings/notifications/notificationEnums";
import DataTable from "../../../shared/components/DataTable/DataTable";
import TableIconHeader from "../../../shared/components/DataTable/TableIconHeader";
import TableFilterTabs from "../../../shared/components/DataTable/TableFilterTabs";
import AppLayout from "../../../shared/layout/AppLayout";
import ConfirmDialog from "../../../shared/components/ConfirmDialog/ConfirmDialog";
import { useNotificationsPage } from "../../../../hooks/notifications/useNotificationsPage";
import NotificationsPageActions from "./components/NotificationsPageActions";
import { NOTIFICATION_FILTER_LABEL_KEYS, NOTIFICATION_FILTER_OPTIONS } from "../../helpers/notificationFilterOptions";

const NotificationsPage = (): ReactNode => {
    const { t } = useTranslation();

    const {
        loading,
        error,
        clearError,
        filter,
        setFilter,
        counts,
        searchTerm,
        setSearchTerm,
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
            <TableIconHeader
                icon={<NotificationsNoneOutlinedIcon />}
                title={t("notifications.title")}
                subtitle={t("notifications.subtitle")}
            />

            <DataTable<NotificationEntity>
                rows={rows}
                columns={columns}
                loading={loading}
                error={error}
                onClearError={clearError}
                emptyMessage={t("notifications.emptyMessage")}
                height="35em"
                getRowId={(row) => row._id}
                search={{
                    value: searchTerm,
                    onChange: setSearchTerm,
                    placeholder: t("notifications.searchPlaceholder"),
                }}
                filters={
                    <TableFilterTabs
                        ariaLabel={t("notifications.title")}
                        value={filter}
                        onChange={setFilter}
                        options={NOTIFICATION_FILTER_OPTIONS.map((option) => ({
                            value: option,
                            label: t(NOTIFICATION_FILTER_LABEL_KEYS[option]),
                            count: counts[option],
                        }))}
                    />
                }
                extraActions={
                    <NotificationsPageActions
                        onMarkAllAsRead={handleMarkAllAsRead}
                        onDeleteAll={handleDeleteAllRequest}
                        disabled={counts[NotificationFilterEnum.All] === 0}
                    />
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
