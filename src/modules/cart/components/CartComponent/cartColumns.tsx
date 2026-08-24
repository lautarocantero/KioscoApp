import { type GridColDef } from "@mui/x-data-grid";
import { Box, IconButton, Typography, type Theme } from "@mui/material";
import type { ProductTicketWithStockType } from "@typings/sells/sellTypes";
import type { TFunction } from "i18next";
import { formatCurrency } from "../../helpers/formatCurrency";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CartProductRowActionCell from "./CartProductRowActionCell";
import { formatStockQuantity, isWeightSaleType } from "../../../shared/helpers/saleTypeHelper";
import EditableNumberCell from "../../../shared/components/DataTable/EditableNumberCell";
import { getPublicAssetUrl } from "../../../shared/helpers/getPublicAssetUrl";

export const buildColumnsForCartProducts = (
  onIncrease: (_id: string) => void,
  onDecrease: (_id: string) => void,
  onSubtotalChange: (_id: string, value: number) => void,
  onQuantityChange: (_id: string, value: number) => void,
  t: TFunction,
): GridColDef<ProductTicketWithStockType>[] => [
  {
    field: "name",
    headerName: t("cart.table.columns.product"),
    flex: 1.5,
    minWidth: 100,
    width: 300,
    maxWidth: 1000,
    renderCell: (params) => (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, height: "100%" }}>
        <Box
          component="img"
          src={params.row.image_url || getPublicAssetUrl("images/stocko_images/empty_product.png")}
          alt={params.row.name}
          sx={{ width: 32, height: 32, objectFit: "contain", borderRadius: "0.4em" }}
        />
        <Box sx={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
          <Typography variant="body2" noWrap>
            {params.row.name}
          </Typography>
          <Typography
            variant="caption"
            noWrap
            sx={(theme: Theme) => ({ color: theme?.custom?.translucidWhite })}
          >
            {params.row.model_size}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    field: "price",
    headerName: t("cart.table.columns.unitPrice"),
    flex: 0.8,
    minWidth: 100,
    width: 140,
    maxWidth: 1000,
    align: "center",
    headerAlign: "center",
    valueGetter: (_value, row) => formatCurrency(row.price),
  },
  {
    field: "stock",
    headerName: t("cart.table.columns.stock"),
    flex: 0.6,
    minWidth: 80,
    width: 100,
    maxWidth: 1000,
    align: "center",
    headerAlign: "center",
    sortable: false,
    renderCell: (params) => (
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
        <Typography variant="body2" sx={(theme: Theme) => ({ color: theme?.custom?.translucidWhite })}>
          {formatStockQuantity(params.row.stock, params.row.sale_type)}
        </Typography>
      </Box>
    ),
  },
  {
    field: "stock_required",
    headerName: t("cart.table.columns.quantity"),
    flex: 1,
    minWidth: 100,
    width: 160,
    maxWidth: 1000,
    align: "center",
    headerAlign: "center",
    sortable: false,
    renderCell: (params) => {
      const isWeight = isWeightSaleType(params.row.sale_type);

      // Producto por peso: cantidad libre, se puede tipear cualquier valor en gramos
      if (isWeight) {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.5,
              height: "100%",
            }}
          >
            <EditableNumberCell
              productId={String(params.row._id)}
              value={params.row.stock_required}
              onChange={onQuantityChange}
            />
            <Typography
              variant="caption"
              sx={(theme: Theme) => ({ color: theme?.custom?.translucidWhite })}
            >
              {t("cart.table.weightUnit")}
            </Typography>
          </Box>
        );
      }

      // Producto por unidad: se mantiene el stepper +/-
      const displayValue = formatStockQuantity(params.row.stock_required, params.row.sale_type);
      return (
        <Box sx={() => ({ display: "flex", alignItems: "center", alignContent: "center", justifyContent: "center", gap: 1, borderRadius: "0.6em", padding: "0.6em 0.4em" })}>
          <IconButton size="small" onClick={() => onDecrease(String(params.row._id))} sx={(theme: Theme) => ({ border: `1px solid ${theme?.palette.primary.main}` })}>
            <KeyboardArrowDownIcon fontSize="inherit" sx={(theme: Theme) => ({ color: theme?.palette?.primary?.main })} />
          </IconButton>
          <Typography sx={(theme: Theme) => ({ color: theme?.palette.primary.main, minWidth: "2.5em", textAlign: "center" })}>
            {displayValue}
          </Typography>
          <IconButton size="small" onClick={() => onIncrease(String(params.row._id))} sx={(theme: Theme) => ({ border: `1px solid ${theme?.palette.primary.main}` })}>
            <ExpandLessIcon fontSize="inherit" sx={(theme: Theme) => ({ color: theme?.palette?.primary?.main })} />
          </IconButton>
        </Box>
      );
    },
  },
  {
    field: "subtotal",
    headerName: t("cart.table.columns.subtotal"),
    flex: 0.8,
    minWidth: 100,
    width: 140,
    maxWidth: 1000,
    align: "center",
    headerAlign: "center",
    sortable: false,
    renderCell: (params) => (
      <EditableNumberCell
        productId={String(params.row._id)}
        value={params.row.subtotal ?? 0}
        onChange={onSubtotalChange}
      />
    ),
  },
  {
    field: "actions",
    headerName: t("cart.table.columns.actions"),
    minWidth: 100,
    width: 100,
    maxWidth: 100,
    sortable: false,
    filterable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => <CartProductRowActionCell product={params.row} />,
  },
];