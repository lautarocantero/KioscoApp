import { type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import type { Product } from "@typings/product/productTypes";
import DataTable from "../../../shared/components/DataTable/DataTable";
import TableIconHeader from "../../../shared/components/DataTable/TableIconHeader";
import { getTableActionButtonSx } from "../../../shared/components/DataTable/getTableActionButtonSx";
import AppLayout from "../../../shared/layout/AppLayout";
import { useProducts } from "../../../../hooks/products/useProducts";
import { useShopRestockReport } from "../../../../hooks/shop/useShopRestockReport";
import { useInitialPageLoading } from "@hooks/ui/useInitialPageLoading";
import LoadingScreen from "../../../shared/components/LoadingScreen/LoadingScreen";

const ProductsListPage = (): ReactNode => {
    const { t } = useTranslation();
    const {
        productsWithPresentations,
        loading,
        error,
        deleteDialog,
        clearError,
        handleDeleteCancel,
        handleDeleteConfirm,
        searchTerm,
        setSearchTerm,
        columns,
    } = useProducts();
    const restockReport = useShopRestockReport();
    const isPageLoading = useInitialPageLoading(loading);

    if (isPageLoading) return <LoadingScreen label="Cargando productos..." />;

    return (
        <AppLayout fullWidth>
            <TableIconHeader
                icon={<Inventory2OutlinedIcon />}
                title={t("products.header.title")}
                subtitle={t("products.header.subtitle")}
            />

            <DataTable<Product>
                rows={productsWithPresentations}
                columns={columns}
                loading={loading}
                error={error}
                onClearError={clearError}
                emptyMessage={t("products.table.emptyMessage")}
                height={"35em"}
                search={{
                    value: searchTerm,
                    onChange: setSearchTerm,
                    placeholder: t("products.table.searchPlaceholder"),
                }}
                newItem={{
                    label: t("products.table.newItem"),
                    href: "/product-create",
                }}
                extraActions={
                    <Button
                        startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: "1.1rem" }} />}
                        onClick={restockReport.handleDownload}
                        disabled={restockReport.isDownloadDisabled}
                        sx={(theme) => getTableActionButtonSx(theme, "primary")}
                    >
                        {t("products.restockReport.viewButton")}
                    </Button>
                }
                deleteDialog={{
                    open: deleteDialog.open,
                    title: t("products.deleteDialog.title"),
                    description: (
                        <>
                            {t("products.deleteDialog.descriptionPrefix")}{" "}
                            <strong>{deleteDialog.name}</strong>
                            {t("products.deleteDialog.descriptionSuffix")}
                        </>
                    ),
                    warningText: t("products.deleteDialog.warningText"),
                    confirmLabel: t("products.deleteDialog.confirmLabel"),
                    onConfirm: () => void handleDeleteConfirm(),
                    onCancel: handleDeleteCancel,
                }}
            />
        </AppLayout>
    );
};

export default ProductsListPage;