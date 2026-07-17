import { type GridColDef } from "@mui/x-data-grid";
import type { BuildColumnsArgs, PresentationSummary, Product } from "@typings/product/productTypes";
import RowActionsCell from "../../../../shared/components/DataTable/RowActionsCell";
import GenericListCell from "../../../../shared/components/DataTable/GenericListCell";
import { CellCenter } from "modules/shared/components/DataTable/CellCenter";
import { dateColumn, truncatedTextColumn } from "../../../../../modules/shared/components/DataTable/ColumnHelpers";

export const buildColumnsForProducts = ({
    onDeleteRequest,
    navigate,
}: BuildColumnsArgs): GridColDef<Product>[] => [
    {
        field: "name",
        headerName: "Nombre",
        flex: 1.5,
        minWidth: 150,
        maxWidth: 150,
    },
    {
        field: "brand",
        headerName: "Marca",
        flex: 1,
        minWidth: 200,
        maxWidth: 200,
    },
    truncatedTextColumn<Product>(
        {
            field: "description",
            headerName: "Descripción",
            flex: 2,
            minWidth: 250,
            maxWidth: 250,
        },
        60
    ),
    {
        field: "presentations",
        headerName: "Presentaciones",
        flex: 1,
        minWidth: 200,
        renderCell: (params) => (
            <GenericListCell<PresentationSummary>
                items={params.value ?? []}
                emptyLabel="Sin presentaciones"
                maxVisible={2}
                getLabel={(p) => {
                    const label = `${p.model_type} ${p.model_size}`;
                    return label.length > 20 ? `${label.slice(0, 20)}…` : label;
                }}
                getTooltipLine={(p) => `${p.model_type} ${p.model_size} · ${p.stock} u. · ${p.sku}`}
                getKey={(p, i) => `${p.sku}-${i}`}
            />
        ),
    },
    dateColumn<Product>({
        field: "created_at",
        headerName: "Creado",
        width: 110,
    }),
    dateColumn<Product>({
        field: "updated_at",
        headerName: "Actualizado",
        width: 120,
    }),
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
                    onPresentations={() => navigate(`/products/${params.row._id}/presentations`)}
                    onView={() => navigate(`/product/${params.row._id}`)}
                    onEdit={() => navigate(`/products/${params.row._id}/edit`)}
                    onDelete={() => onDeleteRequest(params.row._id, params.row.name)}
                />
            </CellCenter>
        ),
    },
];