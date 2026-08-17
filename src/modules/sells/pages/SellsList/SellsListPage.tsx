import React from "react";
import PointOfSaleOutlinedIcon from "@mui/icons-material/PointOfSaleOutlined";
import DataTable from "../../../shared/components/DataTable/DataTable";
import TableIconHeader from "../../../shared/components/DataTable/TableIconHeader";
import TableFilterTabs from "../../../shared/components/DataTable/TableFilterTabs";
import AppLayout from "../../../shared/layout/AppLayout";
import { useSells } from "../../../../hooks/sells/useSells";
import type { Sell } from "@typings/sells/sellTypes";
import { SELL_FILTER_LABELS, SELL_FILTER_OPTIONS } from "../../helpers/sellFilterOptions";

const SellsListPage = (): React.ReactNode => {
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
        columns
    } = useSells();

    return (
        <AppLayout fullWidth>
            <TableIconHeader
                icon={<PointOfSaleOutlinedIcon />}
                title="Ventas"
                subtitle="Historial de ventas registradas en tu negocio."
            />

            <DataTable<Sell>
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
                filters={
                    <TableFilterTabs
                        ariaLabel="Ventas"
                        value={filter}
                        onChange={setFilter}
                        options={SELL_FILTER_OPTIONS.map((option) => ({
                            value: option,
                            label: SELL_FILTER_LABELS[option],
                            count: counts[option],
                        }))}
                    />
                }
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