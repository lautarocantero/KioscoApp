import { type GridColDef } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import type { TFunction } from "i18next";
import ProductRowActionCell from "./ProductRowActionCell";
import { FALLBACK_PRODUCT_IMAGE } from "../../../../config/constants";
import type { Product } from "@typings/product/productTypes";
import i18n from "@i18n/i18n";
import { clampStock } from "../../../../utils/formatter/clampStock";
import { formatPresentationVariantLabel } from "../../helpers/formatPresentationVariantLabel";
import { formatPresentationCategoryLabel } from "../../helpers/formatPresentationCategoryLabel";


export const buildColumnsForProductExhibitor = (t: TFunction): GridColDef<Product>[] => [
  {
    field: "name",
    headerName: t("cart.productsExhibitor.table.columns.product"),
    flex: 1.5,
    minWidth: 100,
    width: 300,
    maxWidth: 1000,
    renderCell: (params) => (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, height: "100%" }}>
        <Box
          component="img"
          src={params.row.image_url || FALLBACK_PRODUCT_IMAGE}
          alt={params.row.name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = FALLBACK_PRODUCT_IMAGE;
          }}
          sx={{ width: 32, height: 32, objectFit: "contain", borderRadius: "0.4em" }}
        />
        <Typography variant="body2" noWrap>
          {params.row.name}
        </Typography>
      </Box>
    ),
  },
  {
    field: "presentation",
    headerName: t("cart.productsExhibitor.table.columns.presentations"),
    flex: 1,
    minWidth: 100,
    width: 1200,
    maxWidth: 1000,
    valueGetter: (_value, row) => {
      const presentation = row.presentations?.[0];
      if (!presentation) return "-";
      return formatPresentationVariantLabel(presentation, i18n.t);
    },
  },
  {
    field: "category",
    headerName: t("cart.productsExhibitor.table.columns.category"),
    flex: 1,
    minWidth: 100,
    width: 250,
    maxWidth: 1000,
    valueGetter: (_value, row) => {
      const label = formatPresentationCategoryLabel(row.presentations?.[0]?.category, i18n.t);
      return label || "-";
    },
  },
  {
    field: "stock",
    headerName: t("cart.productsExhibitor.table.columns.stock"),
    flex: 0.6,
    minWidth: 100,
    width: 90,
    maxWidth: 1000,
    align: "center",
    headerAlign: "center",
    valueGetter: (_value, row) => clampStock(row.presentations?.[0]?.stock ?? 0),
  },
  {
    field: "actions",
    headerName: t("cart.productsExhibitor.table.columns.actions"),
    minWidth: 100,
    width: 100,
    maxWidth: 100,
    sortable: false,
    filterable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => <ProductRowActionCell product={params.row} />,
  },
];