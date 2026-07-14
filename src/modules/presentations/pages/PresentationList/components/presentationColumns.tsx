import { type GridColDef } from "@mui/x-data-grid";
import type { PresentationStatus } from "@typings/presentation/presentationEnum";
import type { BuildColumnsArgs, Presentation } from "@typings/presentation/presentationTypes";
import { STATUS_CONFIG } from "config/constants";
import RowActionsCell from "../../../../shared/components/DataTable/RowActionsCell";
import { CellCenter } from "modules/shared/components/DataTable/CellCenter";
import { formatPrice } from "../../../../shared/helpers/formarPrice";
import { centeredTextColumn, chipColumn, priceColumn, truncatedTextColumn } from "../../../../../modules/shared/components/DataTable/ColumnHelpers";

export const buildColumnsForPresentations = ({
    productId,
    onDeleteRequest,
    navigate,
}: BuildColumnsArgs): GridColDef<Presentation>[] => [
    centeredTextColumn<Presentation>({
        field: "sku",
        headerName: "SKU",
        width: 200,
        minWidth: 200,
        maxWidth: 200,
    }),
    centeredTextColumn<Presentation>({
        field: "name",
        headerName: "Nombre",
        flex: 1.5,
        minWidth: 170,
        maxWidth: 170,
    }),
    truncatedTextColumn<Presentation>(
        {
            field: "description",
            headerName: "Descripción",
            flex: 2,
            minWidth: 200,
            maxWidth: 250,
        },
        60
    ),
    chipColumn<Presentation>(
        {
            field: "model_size",
            headerName: "Contenido",
            width: 200,
            minWidth: 200,
            maxWidth: 200,
        },
        (value) => (value as string) ?? "—"
    ),
    chipColumn<Presentation>(
        {
            field: "stock",
            headerName: "Stock",
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
            headerName: "Estado",
            width: 250,
            minWidth: 250,
            maxWidth: 250,
        },
        (value) => STATUS_CONFIG[(value as PresentationStatus) ?? "unavailable"].label,
        (value) => STATUS_CONFIG[(value as PresentationStatus) ?? "unavailable"].color,
        "filled"
    ),
    priceColumn<Presentation>(
        {
            field: "price",
            headerName: "Precio",
            width: 230,
            minWidth: 230,
            maxWidth: 230,
        },
        formatPrice
    ),
    {
        field: "actions",
        headerName: "Acciones",
        width: 230,
        minWidth: 230,
        maxWidth: 230,
        sortable: false,
        filterable: false,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => (
            <CellCenter>
                <RowActionsCell
                    onView={() =>
                        navigate(`/products/${productId}/presentations/${params.row._id}`)
                    }
                    onEdit={() =>
                        navigate(`/products/${productId}/presentations/${params.row._id}/edit`)
                    }
                    onDelete={() => onDeleteRequest(params.row._id, params.row.name)}
                />
            </CellCenter>
        ),
    },
];