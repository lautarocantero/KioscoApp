import { type GridColDef } from "@mui/x-data-grid";
import type { BuildColumnsForSellsArgs, ProductTicketType, SellTicketType } from "@typings/sells/sellTypes";
import RowActionsCell from "../../../../shared/components/DataTable/RowActionsCell";
import GenericListCell from "../../../../shared/components/DataTable/GenericListCell";
import { dateColumn } from "../../../../../modules/shared/components/DataTable/ColumnHelpers";
import { CellCenter } from "../../../../shared/components/DataTable/CellCenter";


export const buildColumnsForSells = ({
    onDeleteRequest,
    navigate,
}: BuildColumnsForSellsArgs): GridColDef<SellTicketType>[] => [
    dateColumn<SellTicketType>({ field: "purchase_date", headerName: "Fecha", width: 130 }),
    {
        field: "_id",
        headerName: "Ticket",
        flex: 0.8,
        minWidth: 160,
        maxWidth: 220,
    },
    {
        field: "products",
        headerName: "Productos",
        flex: 2.5,
        minWidth: 320,
        renderCell: (params) => (
            <GenericListCell<ProductTicketType>
                items={params.value ?? []}
                emptyLabel="Sin productos"
                maxVisible={2}
                getLabel={(p) => {
                    const label = `${p.name} ${p.model_type} ${p.model_size} x ${p.stock_required}`;
                    return label.length > 30 ? `${label.slice(0, 30)}…` : label;
                }}
                getTooltipLine={(p) => `${p.name} · ${p.model_type} ${p.model_size} · req: ${p.stock_required} u.`}
                getKey={(p, i) => `${p.sku}-${i}`}
            />
        ),
    },
    { field: "seller_name", headerName: "Vendedor", flex: 1, minWidth: 140, maxWidth: 200 },
    { field: "payment_method", headerName: "Método de pago", flex: 0.8, minWidth: 130, maxWidth: 180 },
    {
        field: "total_amount",
        headerName: "Total",
        flex: 0.8,
        minWidth: 110,
        maxWidth: 160,
        align: "right",
        headerAlign: "right",
        renderCell: (params) => `${params.row.currency} ${params.row.total_amount}`,
    },
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