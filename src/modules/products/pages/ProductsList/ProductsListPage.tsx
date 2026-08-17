import { type ReactNode } from "react";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import type { Product } from "@typings/product/productTypes";
import DataTable from "../../../shared/components/DataTable/DataTable";
import TableIconHeader from "../../../shared/components/DataTable/TableIconHeader";
import AppLayout from "../../../shared/layout/AppLayout";
import { useProducts } from "../../../../hooks/products/useProducts";

const ProductsListPage = (): ReactNode => {
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

    return (
        <AppLayout fullWidth>
            <TableIconHeader
                icon={<Inventory2OutlinedIcon />}
                title="Productos"
                subtitle="Gestioná el catálogo de productos de tu negocio."
            />

            <DataTable<Product>
                rows={productsWithPresentations}
                columns={columns}
                loading={loading}
                error={error}
                onClearError={clearError}
                emptyMessage="No hay productos registrados"
                height={"35em"}
                search={{
                    value: searchTerm,
                    onChange: setSearchTerm,
                    placeholder: "Azúcar 600gr...",
                }}
                newItem={{
                    label: "Nuevo producto",
                    href: "/product-create",
                }}
                deleteDialog={{
                    open: deleteDialog.open,
                    title: "Confirmar eliminación",
                    description: (
                        <>
                            ¿Estás seguro de que querés eliminar el producto{" "}
                            <strong>{deleteDialog.name}</strong>? Esta acción no se puede deshacer.
                            También se eliminarán sus presentaciones y stock asociado.
                        </>
                    ),
                    warningText: "Esta acción eliminará el producto de forma permanente.",
                    confirmLabel: "Eliminar",
                    onConfirm: () => void handleDeleteConfirm(),
                    onCancel: handleDeleteCancel,
                }}
            />
        </AppLayout>
    );
};

export default ProductsListPage;