import AddIcon from "@mui/icons-material/Add";
import { alpha, Box, IconButton, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import type { ProductItemPresentationRowProps } from "@typings/cart/cartComponentTypes";
import { StockStatus } from "@typings/cart/cartEnums";
import { getPresentationStockStatus, isAddDisabled } from "../../helpers/getPresentationStockStatus";
import { formatCurrency } from "../../helpers/formatCurrency";
import { formatPresentationVariantLabel } from "../../helpers/formatPresentationVariantLabel";
import { isWeightSaleType } from "../../../shared/helpers/saleTypeHelper";

const STOCK_STATUS_TOKEN: Record<StockStatus, (theme: Theme) => string> = {
  [StockStatus.Low]: (theme) => theme.custom?.accents?.orange,
  [StockStatus.Ok]: (theme) => theme.custom?.darkSecondary,
  [StockStatus.Weight]: (theme) => theme.custom?.darkWhite,
};

const ProductItemPresentationRow = ({ presentation, onAdd }: ProductItemPresentationRowProps): ReactNode => {
  const { t } = useTranslation();
  const isWeight = isWeightSaleType(presentation.sale_type);
  const { status, label: stockLabel } = getPresentationStockStatus(presentation.stock, presentation.min_stock, isWeight, t);
  const isDisabled = isAddDisabled(presentation.stock, isWeight);

  return (
    <Box
      component="li"
      sx={(theme: Theme) => ({
        display: "flex",
        alignItems: "center",
        gap: 1,
        listStyle: "none",
        py: 0.6,
        "&:not(:last-of-type)": {
          borderBottom: `1px solid ${theme.custom?.darkGray}`,
        },
      })}
    >
      <Typography variant="caption" noWrap sx={(theme: Theme) => ({ color: theme.custom?.fontColor, flex: 1, minWidth: 0 })}>
        {formatPresentationVariantLabel(presentation, t)}
      </Typography>

      <Typography variant="caption" sx={(theme: Theme) => ({ color: STOCK_STATUS_TOKEN[status](theme), flexShrink: 0 })}>
        {stockLabel}
      </Typography>

      <Typography variant="caption" sx={(theme: Theme) => ({ color: theme.custom?.fontColor, fontWeight: 600, flexShrink: 0, minWidth: "3.5em", textAlign: "right" })}>
        {formatCurrency(presentation.price)}
      </Typography>

      <IconButton
        size="small"
        disabled={isDisabled}
        aria-label={t("cart.productItem.presentationRow.addAriaLabel", { name: presentation.name })}
        onClick={() => onAdd(presentation)}
        sx={(theme: Theme) => ({
          flexShrink: 0,
          width: "1.75em",
          height: "1.75em",
          p: 0,
          border: `1px solid ${theme.custom?.lightMain}`,
          borderRadius: "8px",
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
          color: theme.palette.primary.main,
          "&:hover": { backgroundColor: theme.palette.primary.main, color: theme.custom?.white },
          "&.Mui-disabled": { border: `1px solid ${theme.custom?.darkGray}`, color: theme.custom?.darkGray },
        })}
      >
        <AddIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );
};

export default ProductItemPresentationRow;
