import { type GridColDef } from "@mui/x-data-grid";

import type { BuildColumnsForSellsArgs, ProductTicketType, SellTicketType } from "@typings/sells/sellTypes";
import { SellStatusEnum } from "@typings/sells/sellsEnum";
import RowActionsCell from "../../../../shared/components/DataTable/RowActionsCell";
import GenericListCell from "../../../../shared/components/DataTable/GenericListCell";
import { chipColumn, dateColumn } from "../../../../../modules/shared/components/DataTable/ColumnHelpers";
import { CellCenter } from "../../../../shared/components/DataTable/CellCenter";
import { SELL_STATUS_CONFIG } from "./sellStatusConfig";
import { formatCurrency } from "../../../../cart/helpers/formatCurrency";



export const buildColumnsForSells = ({
    onDeleteRequest,
    onSettleDebtRequest,
    navigate,
    t,
    isAdmin,
}: BuildColumnsForSellsArgs): GridColDef<SellTicketType>[] => [
    dateColumn<SellTicketType>({ field: "purchase_date", headerName: t("sells.table.columns.date"), width: 130 }),
    {
        field: "_id",
        headerName: t("sells.table.columns.ticket"),
        flex: 0.8,
        minWidth: 160,
        maxWidth: 220,
    },
    {
        field: "products",
        headerName: t("sells.table.columns.products"),
        flex: 2.5,
        minWidth: 320,
        renderCell: (params) => (
            <GenericListCell<ProductTicketType>
                items={params.value ?? []}
                emptyLabel={t("sells.table.columns.noProducts")}
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
    { field: "seller_name", headerName: t("sells.table.columns.seller"), flex: 1, minWidth: 140, maxWidth: 200 },
    {
        field: "payment_method",
        headerName: t("sells.table.columns.paymentMethod"),
        flex: 0.8,
        minWidth: 130,
        maxWidth: 180,
        renderCell: (params) => t(`paymentMethod.${params.row.payment_method}`),
    },
    chipColumn<SellTicketType>(
        { field: "status", headerName: t("sells.table.columns.status"), flex: 0.7, minWidth: 130, maxWidth: 170 },
        (value) => t(`sells.status.${value as SellStatusEnum}`),
        (value) => SELL_STATUS_CONFIG[value as SellStatusEnum]?.color ?? "default",
        "filled",
    ),
    {
        field: "total_amount",
        headerName: t("sells.table.columns.total"),
        flex: 0.8,
        minWidth: 110,
        maxWidth: 160,
        align: "right",
        headerAlign: "right",
        renderCell: (params) => formatCurrency(params.row.total_amount, params.row.currency),
    },
    {
        field: "actions",
        headerName: t("sells.table.columns.actions"),
        width: 100,
        sortable: false,
        filterable: false,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => (
            <CellCenter>
                <RowActionsCell
                    onView={() => navigate(`/sell/${params.row._id}`)}
                    viewLabel={t("sells.table.actions.view")}
                    // onEdit={() => navigate(`/sell/${params.row._id}/sell-edit`)} // comentado hasta planearlo mejor
                    onSettleDebt={params.row.status === SellStatusEnum.Parcial ? () => onSettleDebtRequest(params.row) : undefined}
                    settleDebtLabel={t("sells.settleDebtDialog.actionLabel")}
                    onDelete={() => onDeleteRequest(params.row._id, params.row._id)}
                    deleteLabel={t("sells.table.actions.delete")}
                    deleteDisabled={!isAdmin}
                    deleteDisabledReason={t("permissions.adminOnly")}
                />
            </CellCenter>
        ),
    },
];