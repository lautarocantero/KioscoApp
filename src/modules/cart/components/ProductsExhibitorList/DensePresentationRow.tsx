import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import type { DensePresentationRowProps } from "@typings/cart/cartComponentTypes";
import { StockStatus } from "@typings/cart/cartEnums";
import { getPresentationStockStatus, isAddDisabled } from "../../helpers/getPresentationStockStatus";
import { formatCurrency } from "../../helpers/formatCurrency";

const STOCK_STATUS_TOKEN: Record<StockStatus, (theme: Theme) => string> = {
  [StockStatus.Low]: (theme) => theme.custom?.accents?.orange,
  [StockStatus.Ok]: (theme) => theme.custom?.darkSecondary,
  [StockStatus.Weight]: (theme) => theme.custom?.darkWhite,
};

const cellSx = (theme: Theme) => ({
  padding: "0.5em 0.8em",
  borderBottom: `1px solid ${theme.custom?.darkGray}`,
  color: theme.custom?.fontColor,
  whiteSpace: "nowrap" as const,
});

const DensePresentationRow = ({ row, onAdd }: DensePresentationRowProps): ReactNode => {
  const { t } = useTranslation();
  const { status, label: stockLabel } = getPresentationStockStatus(row.stock, row.minStock, row.isWeight, t);
  const isDisabled = isAddDisabled(row.stock, row.isWeight);

  return (
    <Box
      component="tr"
      sx={(theme: Theme) => ({ "&:hover": { backgroundColor: theme.custom?.lightGray } })}
    >
      <Box component="td" sx={cellSx}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>{row.product}</Typography>
      </Box>
      <Box component="td" sx={cellSx}>{row.presentation}</Box>
      <Box component="td" sx={cellSx}>{row.sku}</Box>
      <Box component="td" sx={cellSx}>{row.category || "-"}</Box>
      <Box component="td" sx={cellSx}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>{formatCurrency(row.price)}</Typography>
        <Typography variant="caption" sx={(theme: Theme) => ({ display: "block", color: STOCK_STATUS_TOKEN[status](theme) })}>
          {stockLabel}
        </Typography>
      </Box>
      <Box component="td" sx={{ ...cellSx, textAlign: "center" }}>
        <IconButton
          size="small"
          disabled={isDisabled}
          aria-label={t("cart.catalog.searchResult.addAriaLabel", { name: row.product })}
          onClick={() => onAdd(row.presentationData)}
          sx={(theme: Theme) => ({
            width: "1.75em",
            height: "1.75em",
            borderRadius: "8px",
            backgroundColor: theme.palette.primary.main,
            color: theme.custom?.white,
            "&:hover": { backgroundColor: theme.palette.primary.dark },
            "&.Mui-disabled": { backgroundColor: theme.custom?.darkGray },
          })}
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default DensePresentationRow;
