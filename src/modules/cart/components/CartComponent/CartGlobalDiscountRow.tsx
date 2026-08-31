import { Box, InputBase, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import type { CartGlobalDiscountRowProps } from "@typings/cart/cartComponentTypes";
import { formatCurrency } from "../../helpers/formatCurrency";

const CartGlobalDiscountRow = ({ globalDiscount, onGlobalDiscountChange, discountAmount }: CartGlobalDiscountRowProps): ReactNode => {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Box
        component="label"
        sx={(theme: Theme) => ({ display: "flex", alignItems: "center", gap: "0.4em", color: theme.custom?.translucidFontColor, fontSize: theme.typography?.body2?.fontSize })}
      >
        {t("cart.summary.discountLabel")}
        <InputBase
          value={globalDiscount === "0" ? "" : globalDiscount}
          onChange={(e) => onGlobalDiscountChange(e.target.value)}
          inputMode="numeric"
          slotProps={{ input: { "aria-label": t("cart.summary.discountAriaLabel") } }}
          sx={(theme: Theme) => ({
            width: "2.8em",
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

      <Typography sx={(theme: Theme) => ({ color: theme.custom?.darkSecondary, fontVariantNumeric: "tabular-nums", fontWeight: 600 })}>
        − {formatCurrency(discountAmount)}
      </Typography>
    </Box>
  );
};

export default CartGlobalDiscountRow;
