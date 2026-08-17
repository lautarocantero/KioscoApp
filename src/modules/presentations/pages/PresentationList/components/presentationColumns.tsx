import { type GridColDef } from "@mui/x-data-grid";
import type { PresentationStatus } from "@typings/presentation/presentationEnum";
import type { BuildColumnsArgs, Presentation } from "@typings/presentation/presentationTypes";
import RowActionsCell from "../../../../shared/components/DataTable/RowActionsCell";
import { formatPrice } from "../../../../shared/helpers/formarPrice";
import { centeredTextColumn, chipColumn, priceColumn, truncatedTextColumn } from "../../../../../modules/shared/components/DataTable/ColumnHelpers";
import { STATUS_CONFIG } from "../../../../../config/constants";
import { CellCenter } from "../../../../shared/components/DataTable/CellCenter";

export const buildColumnsForPresentations = ({
    onDeleteRequest,
    onRestockRequest,
    navigate,
    t,
}: BuildColumnsArgs): GridColDef<Presentation>[] => [
    centeredTextColumn<Presentation>({
        field: "sku",
        headerName: t("presentations.table.columns.sku"),
        width: 200,
        minWidth: 200,
        maxWidth: 200,
    }),
    centeredTextColumn<Presentation>({
        field: "name",
        headerName: t("presentations.table.columns.name"),
        flex: 1.5,
        minWidth: 170,
        maxWidth: 170,
    }),
    truncatedTextColumn<Presentation>(
        {
            field: "description",
            headerName: t("presentations.table.columns.description"),
            flex: 2,
            minWidth: 200,
            maxWidth: 250,
        },
        60
    ),
    chipColumn<Presentation>(
        {
            field: "model_size",
            headerName: t("presentations.table.columns.content"),
            width: 200,
            minWidth: 200,
            maxWidth: 200,
        },
        (value) => (value as string) ?? "—"
    ),
    chipColumn<Presentation>(
        {
            field: "stock",
            headerName: t("presentations.table.columns.stock"),
            width: 200,
            minWidth: 200,
            maxWidth: 200,
            type: "number",
        },
        (value) => String(value ?? 0),
        (value, row) => ((value as number) <= (row.min_stock ?? 0) ? "error" : "success"),
        "filled"
    ),
    chipColumn<Presentation>(
        {
            field: "status",
            headerName: t("presentations.table.columns.status"),
            width: 250,
            minWidth: 250,
            maxWidth: 250,
        },
        (value) => t(`presentations.table.status.${(value as PresentationStatus) ?? "unavailable"}`),
        (value) => STATUS_CONFIG[(value as PresentationStatus) ?? "unavailable"].color,
        "filled"
    ),
    priceColumn<Presentation>(
        {
            field: "price",
            headerName: t("presentations.table.columns.price"),
            width: 230,
            minWidth: 230,
            maxWidth: 230,
        },
        formatPrice
    ),
    {
        field: "actions",
        headerName: t("presentations.table.columns.actions"),
        width: 260,
        minWidth: 260,
        maxWidth: 260,
        sortable: false,
        filterable: false,
        align: "center",
        headerAlign: "center",
        renderCell: (params) =>
            (
                    <CellCenter>
                        <RowActionsCell
                            onView={() =>
                                navigate(`/products/${params.row.product_id}/presentation/${params.row._id}`)
                            }
                            onEdit={() =>
                                navigate(`/products/${params.row.product_id}/presentation/${params.row._id}/presentation-edit`)
                            }
                            onRestock={() => onRestockRequest(params.row)}
                            restockLabel={t("presentations.table.actions.restock")}
                            viewLabel={t("presentations.table.actions.view")}
                            editLabel={t("presentations.table.actions.edit")}
                            deleteLabel={t("presentations.table.actions.delete")}
                            onDelete={() => onDeleteRequest(params.row._id, params.row.name)}
                        />
                    </CellCenter>
        ),
    },
];