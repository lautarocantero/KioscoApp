import { type GridColDef } from "@mui/x-data-grid";
import type { BuildColumnsArgs, PresentationSummary, Product } from "@typings/product/productTypes";
import RowActionsCell from "../../../../shared/components/DataTable/RowActionsCell";
import GenericListCell from "../../../../shared/components/DataTable/GenericListCell";
import { dateColumn, truncatedTextColumn } from "../../../../../modules/shared/components/DataTable/ColumnHelpers";
import { CellCenter } from "../../../../shared/components/DataTable/CellCenter";

export const buildColumnsForProducts = ({
    onDeleteRequest,
    navigate,
    t,
}: BuildColumnsArgs): GridColDef<Product>[] => [
    {
        field: "name",
        headerName: t("products.table.columns.name"),
        flex: 1.5,
        minWidth: 150,
        maxWidth: 150,
    },
    {
        field: "brand",
        headerName: t("products.table.columns.brand"),
        flex: 1,
        minWidth: 200,
        maxWidth: 200,
    },
    truncatedTextColumn<Product>(
        {
            field: "description",
            headerName: t("products.table.columns.description"),
            flex: 2,
            minWidth: 250,
            maxWidth: 250,
        },
        60
    ),
    {
        field: "presentations",
        headerName: t("products.table.columns.presentations"),
        flex: 1,
        minWidth: 200,
        renderCell: (params) => (
            <GenericListCell<PresentationSummary>
                items={params.value ?? []}
                emptyLabel={t("products.table.columns.noPresentations")}
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
        headerName: t("products.table.columns.createdAt"),
        width: 110,
    }),
    dateColumn<Product>({
        field: "updated_at",
        headerName: t("products.table.columns.updatedAt"),
        width: 120,
    }),
    {
        field: "actions",
        headerName: t("products.table.columns.actions"),
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
                    onEdit={() => navigate(`/product/${params.row._id}/product-edit`)}
                    onDelete={() => onDeleteRequest(params.row._id, params.row.name)}
                />
            </CellCenter>
        ),
    },
];