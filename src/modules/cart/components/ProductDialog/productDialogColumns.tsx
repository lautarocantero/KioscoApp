import { type GridColDef } from "@mui/x-data-grid";
import { Box, Chip, IconButton, Stack, Typography, type Theme } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import type { BuildColumnsForProductDialogInterface } from "@typings/sells/sellTypes";
import type { Presentation } from "@typings/presentation/presentationTypes";
import { isWeightSaleType } from "../../../shared/helpers/saleTypeHelper";
import { getStockStatus } from "../../../shared/helpers/stockHandler";
import NumberField from "../../../shared/components/NumberField/NumberField";
import { clampStock } from "../../../../utils/formatter/clampStock";


export const buildColumnsForProductDialog = ({
  getQuantity,
  handleQuantityChange,
  handleAddToCart,
  fallbackImage,
  t,
}: BuildColumnsForProductDialogInterface): GridColDef<Presentation>[] => [
  {
    field: "name",
    headerName: t("cart.productDialog.table.columns.presentation"),
    flex: 1.5,
    minWidth: 220,
    renderCell: (params) => {
      const imageSrc =
        params.row.image_url
        || fallbackImage
        || '/images/stocko_images/empty_product.png';

      return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, height: "100%" }}>
          <Box
            component="img"
            src={imageSrc}
            alt={params.row.name}
            sx={{ width: 32, height: 32, objectFit: "contain", borderRadius: "0.4em" }}
          />
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="body2" fontWeight={500} noWrap>
              {params.row.name}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    field: "stock",
    headerName: t("cart.productDialog.table.columns.stock"),
    flex: 1,
    minWidth: 160,
    renderCell: (params) => {
      const stock = clampStock(params.row.stock ?? 0);
      const minStock = params.row.min_stock ?? 0;
      const isWeight = isWeightSaleType(params.row.sale_type);
      const status = getStockStatus({stock, minStock});
      return (
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography sx={(theme: Theme) => ({ color: theme?.custom?.fontColor, fontWeight: 'bold' })}>
            {isWeight ? `${stock}g` : stock}
          </Typography>
          <Chip label={status.label} size="small" color={status.color} />
        </Stack>
      );
    },
  },
  {
    field: "quantity",
    headerName: t("cart.productDialog.table.columns.quantity"),
    minWidth: 110,
    width: 110,
    sortable: false,
    filterable: false,
    renderCell: (params) => {
      const stock = clampStock(params.row.stock ?? 0);
      const isWeight = isWeightSaleType(params.row.sale_type);
      return (
        <NumberField
          label={isWeight ? t("cart.productDialog.table.columns.quantityWeight") : t("cart.productDialog.table.columns.quantity")}
          min={isWeight ? 100 : 1}
          step={isWeight ? 100 : 1}
          max={stock}
          size="small"
          defaultValue={isWeight ? 100 : 1}
          value={getQuantity(String(params.row._id))}
          onValueChange={(value: number | null) => handleQuantityChange(String(params.row._id), value)}
        />
      );
    },
  },
  {
    field: "actions",
    headerName: t("cart.productDialog.table.columns.actions"),
    minWidth: 90,
    width: 90,
    sortable: false,
    filterable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      const stock = clampStock(params.row.stock ?? 0);
      const quantity = getQuantity(String(params.row._id));
      const canAdd = stock > 0 && quantity > 0;
      return (
        <IconButton
          type="button"
          disabled={!canAdd}
          onClick={() => handleAddToCart({ presentation: params.row, quantity })}
          sx={(theme: Theme) => ({
            backgroundColor: theme?.palette?.primary?.main,
            color: theme?.palette?.primary?.contrastText ?? theme?.custom?.white,
            borderRadius: '0.4em',
            width: '1.5em',
            height: '1.5em',
            '&:hover': { backgroundColor: theme?.palette?.primary?.dark },
            '&.Mui-disabled': { opacity: 0.4 },
          })}
        >
          <ShoppingCartIcon fontSize="small" />
        </IconButton>
      );
    },
  },
];