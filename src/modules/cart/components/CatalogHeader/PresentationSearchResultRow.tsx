import AddIcon from "@mui/icons-material/Add";
import { Box, Chip, IconButton, Typography, alpha, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import type { PresentationSearchResultRowProps } from "@typings/cart/cartComponentTypes";
import { StockStatus } from "@typings/cart/cartEnums";
import { getPresentationStockStatus, isAddDisabled } from "../../helpers/getPresentationStockStatus";
import { formatCurrency } from "../../helpers/formatCurrency";

const STOCK_STATUS_TOKEN: Record<StockStatus, (theme: Theme) => string> = {
  [StockStatus.Low]: (theme) => theme.custom?.accents?.orange,
  [StockStatus.Ok]: (theme) => theme.custom?.darkSecondary,
  [StockStatus.Weight]: (theme) => theme.custom?.darkWhite,
};

const PresentationSearchResultRow = ({
  row,
  isHighlighted,
  onSelect,
  onMouseEnter,
}: PresentationSearchResultRowProps): ReactNode => {
  const { t } = useTranslation();
  const { status, label: stockLabel } = getPresentationStockStatus(row.stock, row.minStock, row.isWeight, t);
  const isDisabled = isAddDisabled(row.stock, row.isWeight);

  return (
    <Box
      role="option"
      aria-selected={isHighlighted}
      onMouseEnter={onMouseEnter}
      onClick={() => !isDisabled && onSelect(row)}
      sx={(theme: Theme) => ({
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        px: 1.5,
        py: 1,
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled ? 0.5 : 1,
        backgroundColor: isHighlighted ? alpha(theme.palette.primary.main, 0.12) : "transparent",
        "&:hover": {
          backgroundColor: isDisabled ? "transparent" : alpha(theme.palette.primary.main, 0.12),
        },
      })}
    >
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography variant="body2" noWrap sx={(theme: Theme) => ({ color: theme.custom?.fontColor, fontWeight: 600 })}>
          {row.product}
          {row.presentation ? ` · ${row.presentation}` : ""}
        </Typography>
        <Typography variant="caption" noWrap sx={(theme: Theme) => ({ color: theme.custom?.darkWhite })}>
          {t("cart.catalog.searchResult.sku", { sku: row.sku || "-" })}
        </Typography>
      </Box>

      {row.category && (
        <Chip
          label={row.category}
          size="small"
          sx={(theme: Theme) => ({
            backgroundColor: alpha(theme.palette.primary.main, 0.12),
            color: theme.palette.primary.main,
            display: { xs: "none", sm: "flex" },
          })}
        />
      )}

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", minWidth: "6em" }}>
        <Typography variant="body2" sx={(theme: Theme) => ({ color: theme.custom?.fontColor, fontWeight: 600 })}>
          {formatCurrency(row.price)}
        </Typography>
        <Typography variant="caption" sx={(theme: Theme) => ({ color: STOCK_STATUS_TOKEN[status](theme) })}>
          {stockLabel}
        </Typography>
      </Box>

      <IconButton
        size="small"
        disabled={isDisabled}
        aria-label={t("cart.catalog.searchResult.addAriaLabel", { name: row.product })}
        onClick={(event) => {
          event.stopPropagation();
          if (!isDisabled) onSelect(row);
        }}
        sx={(theme: Theme) => ({
          backgroundColor: theme.palette.primary.main,
          color: theme.custom?.white,
          "&:hover": { backgroundColor: theme.palette.primary.dark },
          "&.Mui-disabled": { backgroundColor: theme.custom?.darkGray },
        })}
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default PresentationSearchResultRow;
