import React from "react";
import { useTranslation } from "react-i18next";
import PointOfSaleOutlinedIcon from "@mui/icons-material/PointOfSaleOutlined";
import DataTable from "../../../shared/components/DataTable/DataTable";
import TableIconHeader from "../../../shared/components/DataTable/TableIconHeader";
import TableFilterTabs from "../../../shared/components/DataTable/TableFilterTabs";
import AppLayout from "../../../shared/layout/AppLayout";
import { useSells } from "../../../../hooks/sells/useSells";
import type { Sell } from "@typings/sells/sellTypes";
import { SellFilterEnum } from "@typings/sells/sellsEnum";
import { SELL_FILTER_OPTIONS } from "../../helpers/sellFilterOptions";
import SettleDebtDialog from "./components/SettleDebtDialog";

const SellsListPage = (): React.ReactNode => {
    const { t } = useTranslation();
    const {
        sells,
        loading,
        error,
        deleteDialog,
        clearError,
        handleDeleteCancel,
        handleDeleteConfirm,
        searchTerm,
        setSearchTerm,
        filter,
        setFilter,
        counts,
        columns,
        settleDebtDialog,
        settleDebtIsSubmitting,
        settleDebtErrorMessage,
        handleSettleDebtCancel,
        handleSettleDebtConfirm,
    } = useSells();

    return (
        <AppLayout fullWidth>
            <TableIconHeader
                icon={<PointOfSaleOutlinedIcon />}
                title={t("sells.table.header.title")}
                subtitle={t("sells.table.header.subtitle")}
            />

            <DataTable<Sell>
                rows={sells}
                columns={columns}
                getRowId={(row) => row._id}
                loading={loading}
                error={error}
                onClearError={clearError}
                emptyMessage={t("sells.table.emptyMessage")}
                height={"35em"}
                search={{ value: searchTerm, onChange: setSearchTerm, placeholder: t("sells.table.searchPlaceholder") }}
                newItem={{
                    label: t("sells.table.newItem"),
                    href: "/new-sell",
                }}
                filters={
                    <TableFilterTabs
                        ariaLabel={t("sells.table.header.title")}
                        value={filter}
                        onChange={setFilter}
                        options={SELL_FILTER_OPTIONS.map((option) => ({
                            value: option,
                            label: option === SellFilterEnum.All ? t("sells.filters.all") : t(`sells.status.${option}`),
                            count: counts[option],
                        }))}
                    />
                }
                deleteDialog={{
                    open: deleteDialog.open,
                    title: t("sells.table.deleteDialog.title"),
                    description: (
                        <>{t("sells.table.deleteDialog.descriptionPrefix")} <strong>{deleteDialog.name}</strong>{t("sells.table.deleteDialog.descriptionSuffix")}</>
                    ),
                    warningText: t("sells.table.deleteDialog.warningText"),
                    confirmLabel: t("sells.table.deleteDialog.confirmLabel"),
                    onConfirm: () => void handleDeleteConfirm(),
                    onCancel: handleDeleteCancel,
                }}
            />

            <SettleDebtDialog
                settleDebtDialog={settleDebtDialog}
                isSubmitting={settleDebtIsSubmitting}
                errorMessage={settleDebtErrorMessage}
                onConfirm={() => void handleSettleDebtConfirm()}
                onCancel={handleSettleDebtCancel}
            />
        </AppLayout>
    );
};

export default SellsListPage;