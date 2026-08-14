import { type GridColDef } from "@mui/x-data-grid";
import type { Seller, BuildSellerColumnsArgs } from "@typings/seller/sellerTypes";
import RowActionsCell from "../../../../shared/components/DataTable/RowActionsCell";
import { CellCenter } from "../../../../shared/components/DataTable/CellCenter";
import { dateColumn } from "../../../../shared/components/DataTable/ColumnHelpers";

export const buildColumnsForSellers = ({
    onDeleteRequest,
    onEditRequest,
    navigate,
}: BuildSellerColumnsArgs): GridColDef<Seller>[] => [
    { field: "name", headerName: "Nombre", flex: 1.5, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 200 },
    { field: "role", headerName: "Rol", flex: 0.8, minWidth: 120 },
    dateColumn<Seller>({ field: "created_at", headerName: "Creado", width: 110 }),
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
                    onView={() => navigate(`/seller/${params.row._id}`)}
                    onEdit={() => onEditRequest(params.row)}
                    onDelete={() => onDeleteRequest(params.row._id, params.row.name)}
                />
            </CellCenter>
        ),
    },
];