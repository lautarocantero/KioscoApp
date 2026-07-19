import React from "react";
import DataTable from "../../../shared/components/DataTable/DataTable";
import AppLayout from "../../../shared/layout/AppLayout";
import { useSells } from "../../../../hooks/sells/useSells";
import type { SellType } from "@typings/sells/types";

const SellsListPage = (): React.ReactNode => {
    const { sells, loading, error, deleteDialog, clearError, handleDeleteCancel, handleDeleteConfirm, searchTerm, setSearchTerm, columns } = useSells();

    return (
        <AppLayout fullWidth>
            <DataTable<SellType>
                title={"Ventas"}
                rows={sells}
                columns={columns}
                getRowId={(row) => row._id}
                loading={loading}
                error={error}
                onClearError={clearError}
                emptyMessage="No hay ventas registradas"
                height={"35em"}
                search={{ value: searchTerm, onChange: setSearchTerm, placeholder: "Ticket o vendedor..." }}
                newItem={{
                    label: "Nueva venta",
                    href: "/new-sell",
                }}
                deleteDialog={{
                    open: deleteDialog.open,
                    title: "Confirmar eliminación",
                    description: (
                        <>¿Estás seguro de que querés eliminar la venta <strong>{deleteDialog.name}</strong>? Esta acción no se puede deshacer.</>
                    ),
                    warningText: "Esta acción eliminará la venta de forma permanente.",
                    confirmLabel: "Eliminar",
                    onConfirm: () => void handleDeleteConfirm(),
                    onCancel: handleDeleteCancel,
                }}
            />
        </AppLayout>
    );
};

export default SellsListPage;