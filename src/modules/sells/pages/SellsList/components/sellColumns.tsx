import { type GridColDef } from "@mui/x-data-grid";
import type { BuildColumnsForSellsArgs, SellTicketType } from "@typings/sells/sellTypes";
import RowActionsCell from "../../../../shared/components/DataTable/RowActionsCell";
import { dateColumn } from "../../../../../modules/shared/components/DataTable/ColumnHelpers";
import { CellCenter } from "../../../../shared/components/DataTable/CellCenter";


export const buildColumnsForSells = ({
    onDeleteRequest,
    navigate,
}: BuildColumnsForSellsArgs): GridColDef<SellTicketType>[] => [
    { field: "_id", headerName: "Ticket", flex: 1, minWidth: 200, maxWidth: 400 },
    { field: "seller_name", headerName: "Vendedor", flex: 1, minWidth: 160 },
    { field: "payment_method", headerName: "Método de pago", flex: 1, minWidth: 150 },
    {
        field: "total_amount",
        headerName: "Total",
        flex: 1,
        minWidth: 120,
        renderCell: (params) => `${params.row.currency} ${params.row.total_amount}`,
    },
    dateColumn<SellTicketType>({ field: "purchase_date", headerName: "Fecha", width: 130 }),
    {
        field: "actions",
        headerName: "Acciones",
        width: 100,
        sortable: false,
        filterable: false,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => (
            <CellCenter>
                <RowActionsCell 
                    onView={() => navigate(`/sell/${params.row._id}`)}
                    // onEdit={() => navigate(`/sell/${params.row._id}/sell-edit`)} // comentado hasta planearlo mejor
                    onDelete={() => onDeleteRequest(params.row._id, params.row._id)} 
                />
            </CellCenter>
        ),
    },
];