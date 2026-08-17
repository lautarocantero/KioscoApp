import React from "react";
import { useTranslation } from "react-i18next";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import type { Presentation } from "@typings/presentation/presentationTypes";
import { usePresentations } from "../../../../hooks/presentations/usePresentations";
import AppLayout from "../../../../modules/shared/layout/AppLayout";
import DataTable from "../../../shared/components/DataTable/DataTable";
import TableIconHeader from "../../../shared/components/DataTable/TableIconHeader";
import RestockDialog from "./components/RestockDialog";


const PresentationListPage = (): React.ReactNode => {
    const { t } = useTranslation();

    const {
        productId,
        presentations,
        loading,
        error,
        deleteDialog,
        clearError,
        handleDeleteCancel,
        handleDeleteConfirm,
        searchTerm,
        setSearchTerm,
        columns,
        restockDialog,
        restockStockValue,
        restockIsSubmitting,
        restockErrorMessage,
        handleRestockStockChange,
        handleRestockCancel,
        handleRestockConfirm,
    } = usePresentations();


    return (
        <AppLayout fullWidth >
            <TableIconHeader
                icon={<CategoryOutlinedIcon />}
                title={t("presentations.header.title")}
                subtitle={t("presentations.header.subtitle")}
            />

            <DataTable<Presentation>
                rows={presentations}
                columns={columns}
                loading={loading}
                error={error}
                onClearError={clearError}
                emptyMessage={t("presentations.table.emptyMessage")}
                height={"35em"}
                search={{
                    value: searchTerm,
                    onChange: setSearchTerm,
                    placeholder: t("presentations.table.searchPlaceholder"),
                }}
                newItem={{
                    label: t("presentations.table.newItem"),
                    href: `/products/${productId}/presentation-create`,
                }}
                deleteDialog={{
                    open: deleteDialog.open,
                    title: t("presentations.deleteDialog.title"),
                    description: (
                        <>
                            {t("presentations.deleteDialog.descriptionPrefix")}{" "}
                            <strong>{deleteDialog.name}</strong>
                            {t("presentations.deleteDialog.descriptionSuffix")}
                        </>
                    ),
                    warningText: t("presentations.deleteDialog.warningText"),
                    confirmLabel: t("presentations.deleteDialog.confirmLabel"),
                    onConfirm: () => void handleDeleteConfirm(),
                    onCancel: handleDeleteCancel,
                }}
            />

            <RestockDialog
                restockDialog={restockDialog}
                stockValue={restockStockValue}
                isSubmitting={restockIsSubmitting}
                errorMessage={restockErrorMessage}
                onStockChange={handleRestockStockChange}
                onConfirm={() => void handleRestockConfirm()}
                onCancel={handleRestockCancel}
            />
        </AppLayout>
    );
};

export default PresentationListPage;