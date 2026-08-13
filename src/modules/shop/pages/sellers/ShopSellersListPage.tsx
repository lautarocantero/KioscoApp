import React, { type ReactNode, useState } from "react";
import DataTable from "../../../shared/components/DataTable/DataTable";
import AppLayout from "../../../shared/layout/AppLayout";
import { useSellers } from "../../../../hooks/sellers/useSellers";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { GridColDef } from "@mui/x-data-grid";
import RowActionsCell from "../../../shared/components/DataTable/RowActionsCell";
import { CellCenter } from "../../../shared/components/DataTable/CellCenter";
import { dateColumn } from "../../../shared/components/DataTable/ColumnHelpers";
import { deleteSellerThunk, selectSellerThunk } from "../../../../store/seller/sellerThunks";

const ShopSellersListPage = (): ReactNode => {
    const { sellers, loading, error, clearError } = useSellers();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id?: string; name?: string }>({ open: false });

    const handleDeleteRequest = (id: string, name?: string) => setDeleteDialog({ open: true, id, name });
    const handleDeleteCancel = () => setDeleteDialog({ open: false });
    const handleDeleteConfirm = async () => {
        if (!deleteDialog.id) return;
        // dispatch delete thunk
        // @ts-ignore
        await dispatch(deleteSellerThunk(deleteDialog.id));
        setDeleteDialog({ open: false });
    };

    const columns: GridColDef[] = [
        { field: "name", headerName: "Nombre", flex: 1.5, minWidth: 150 },
        { field: "email", headerName: "Email", flex: 1, minWidth: 200 },
        { field: "rol", headerName: "Rol", flex: 0.8, minWidth: 120 },
        dateColumn<any>({ field: "created_at", headerName: "Creado", width: 110 }),
        {
            field: "actions",
            headerName: "Acciones",
            width: 160,
            sortable: false,
            filterable: false,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => (
                <CellCenter>
                    <RowActionsCell
                        onView={() => navigate(`/shop-sellers/${params.row._id}`)}
                        onEdit={() => {
                            // select seller in store so edit page can read it
                            // @ts-ignore
                            dispatch(selectSellerThunk(params.row));
                            navigate(`/shop-sellers-edit`);
                        }}
                        onDelete={() => handleDeleteRequest(params.row._id, params.row.name)}
                    />
                </CellCenter>
            ),
        },
    ];

    return (
        <AppLayout fullWidth>
            <DataTable<any>
                title={"Vendedores"}
                rows={sellers}
                columns={columns}
                loading={loading}
                error={error}
                onClearError={clearError}
                emptyMessage="No hay vendedores registrados"
                height={"35em"}
                search={undefined}
                newItem={{ label: "Nuevo vendedor", href: "/shop-sellers-create" }}
                deleteDialog={{
                    open: deleteDialog.open,
                    description: (<>{`¿Eliminar vendedor ${deleteDialog.name ?? ""}?`}</>),
                    onCancel: handleDeleteCancel,
                    onConfirm: handleDeleteConfirm,
                }}
            />
        </AppLayout>
    );
};

export default ShopSellersListPage;
