import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton, Typography, type Theme } from "@mui/material";
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
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        listStyle: "none",
        py: 0.4,
      }}
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
          p: "0.15em",
          color: theme.palette.primary.main,
          "&.Mui-disabled": { color: theme.custom?.darkGray },
        })}
      >
        <AddIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );
};

export default ProductItemPresentationRow;
