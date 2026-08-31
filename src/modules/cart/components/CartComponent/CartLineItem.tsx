import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton, InputBase, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import type { CartLineItemProps } from "@typings/cart/cartComponentTypes";
import { formatCurrency } from "../../helpers/formatCurrency";
import { formatPresentationVariantLabel } from "../../helpers/formatPresentationVariantLabel";
import { formatCartQuantityLabel } from "../../helpers/formatCartQuantityLabel";
import { formatCartPriceLabel } from "../../helpers/formatCartPriceLabel";
import { isWeightSaleType } from "../../../shared/helpers/saleTypeHelper";
import CartProductRowActionCell from "./CartProductRowActionCell";

const stepperButtonSx = (theme: Theme) => ({
  width: "1.6em",
  height: "1.6em",
  borderRadius: 0,
  backgroundColor: theme.custom?.lightGray,
});

const CartLineItem = ({ product, onIncrease, onDecrease, onItemDiscountChange }: CartLineItemProps): ReactNode => {
  const { t } = useTranslation();
  const isWeight = isWeightSaleType(product.sale_type);
  const variantLabel = formatPresentationVariantLabel(product, t);
  const qtyLabel = formatCartQuantityLabel(product.stock_required, isWeight, t);
  const priceLabel = formatCartPriceLabel(product.price, isWeight, t);

  return (
    <Box
      component="li"
      sx={(theme: Theme) => ({
        display: "flex",
        flexDirection: "column",
        gap: "0.3em",
        listStyle: "none",
        padding: "0.45em 0.5em",
        marginBottom: "0.3em",
        borderRadius: "10px",
        border: `1px solid ${theme.custom?.darkGray}`,
        color: theme.custom?.fontColor,
      })}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: "0.4em" }}>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography variant="body2" noWrap sx={(theme: Theme) => ({ color: theme.custom?.fontColor, fontWeight: 600, lineHeight: 1.3 })}>
            {product.name}
          </Typography>
          <Typography variant="caption" noWrap sx={(theme: Theme) => ({ color: theme.custom?.darkWhite, lineHeight: 1.3 })}>
            {variantLabel} · {priceLabel}
          </Typography>
        </Box>

        <CartProductRowActionCell product={product} />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: "0.6em" }}>
        <Box
          sx={(theme: Theme) => ({
            display: "flex",
            alignItems: "center",
            border: `1px solid ${theme.custom?.darkGray}`,
            borderRadius: "8px",
            overflow: "hidden",
            flexShrink: 0,
          })}
        >
          <IconButton size="small" onClick={() => onDecrease(String(product._id))} aria-label={t("cart.table.decreaseAriaLabel")} sx={stepperButtonSx}>
            <RemoveIcon fontSize="inherit" sx={(theme: Theme) => ({ color: theme.custom?.fontColor })} />
          </IconButton>
          <Typography
            variant="caption"
            sx={(theme: Theme) => ({ minWidth: "3.5em", textAlign: "center", fontWeight: 600, color: theme.custom?.fontColor, fontVariantNumeric: "tabular-nums" })}
          >
            {qtyLabel}
          </Typography>
          <IconButton size="small" onClick={() => onIncrease(String(product._id))} aria-label={t("cart.table.increaseAriaLabel")} sx={stepperButtonSx}>
            <AddIcon fontSize="inherit" sx={(theme: Theme) => ({ color: theme.custom?.fontColor })} />
          </IconButton>
        </Box>

        <Box
          component="label"
          sx={(theme: Theme) => ({ display: "flex", alignItems: "center", gap: "0.3em", fontSize: "0.7rem", color: theme.custom?.darkWhite, flexShrink: 0 })}
        >
          {t("cart.table.itemDiscountLabel")}
          <InputBase
            value={product.discountPercentage || ""}
            onChange={(e) => onItemDiscountChange(String(product._id), e.target.value)}
            inputMode="numeric"
            slotProps={{ input: { "aria-label": t("cart.table.itemDiscountAriaLabel") } }}
            sx={(theme: Theme) => ({
              width: "2.4em",
              border: `1px solid ${theme.custom?.darkGray}`,
              borderRadius: "6px",
              padding: "0.15em 0.3em",
              fontSize: "0.75rem",
              textAlign: "right",
              color: theme.custom?.fontColor,
            })}
          />
          %
        </Box>

        <Typography
          variant="body2"
          sx={(theme: Theme) => ({ marginLeft: "auto", fontWeight: 600, color: theme.custom?.fontColor, fontVariantNumeric: "tabular-nums" })}
        >
          {formatCurrency(product.subtotal ?? 0)}
        </Typography>
      </Box>
    </Box>
  );
};

export default CartLineItem;
