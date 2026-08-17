import { type GridColDef } from "@mui/x-data-grid";
import type { Seller, BuildSellerColumnsArgs } from "@typings/seller/sellerTypes";
import { SellerStatus } from "@typings/seller/sellerEnums";
import { getRoleLabel } from "../../../../shared/helpers/getRoleLabel";
import RowActionsCell from "../../../../shared/components/DataTable/RowActionsCell";
import { CellCenter } from "../../../../shared/components/DataTable/CellCenter";
import { chipColumn, dateColumn } from "../../../../shared/components/DataTable/ColumnHelpers";
import { getSellerStatusLabel } from "../../../helpers/getSellerStatusLabel";

export const buildColumnsForSellers = ({
    onDeleteRequest,
    onEditRequest,
    navigate,
}: BuildSellerColumnsArgs): GridColDef<Seller>[] => [
    { field: "name", headerName: "Nombre", flex: 1.5, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 200 },
    {
        field: "role",
        headerName: "Rol",
        flex: 0.8,
        minWidth: 120,
        valueFormatter: (value: string) => getRoleLabel(value),
    },
    chipColumn<Seller>(
        { field: "user_status", headerName: "Estado", flex: 0.8, minWidth: 130 },
        (value) => getSellerStatusLabel(value as SellerStatus),
        (value) => (value === SellerStatus.Online ? "success" : "default"),
        "filled",
    ),
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
                    onDelete={onDeleteRequest ? () => onDeleteRequest(params.row._id, params.row.name) : undefined}
                />
            </CellCenter>
        ),
    },
];