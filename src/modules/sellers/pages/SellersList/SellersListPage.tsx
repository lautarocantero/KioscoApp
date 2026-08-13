import { type ReactNode } from "react";
import DataTable from "../../../shared/components/DataTable/DataTable";
import AppLayout from "../../../shared/layout/AppLayout";
import { useSellers } from "../../../../hooks/sellers/useSellers";
import type { Seller } from "@typings/seller/sellerTypes";

const SellersListPage = (): ReactNode => {
    const {
        sellers,
        loading,
        error,
        clearError,
        deleteDialog,
        handleDeleteCancel,
        handleDeleteConfirm,
        columns,
    } = useSellers();

    return (
        <AppLayout fullWidth>
            <DataTable<Seller>
                title={"Vendedores"}
                rows={sellers}
                columns={columns}
                loading={loading}
                error={error}
                onClearError={clearError}
                emptyMessage="No hay vendedores registrados"
                height={"35em"}
                deleteDialog={{
                    open: deleteDialog.open,
                    title: "Confirmar eliminación",
                    description: (
                        <>
                            ¿Estás seguro de que querés eliminar el vendedor{" "}
                            <strong>{deleteDialog.name}</strong>? Esta acción no se puede deshacer.
                        </>
                    ),
                    confirmLabel: "Eliminar",
                    onConfirm: () => void handleDeleteConfirm(),
                    onCancel: handleDeleteCancel,
                }}
            />
        </AppLayout>
    );
};

export default SellersListPage;