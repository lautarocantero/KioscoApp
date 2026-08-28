import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, IconButton, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import type { CartLineItemProps } from "@typings/cart/cartComponentTypes";
import { formatCurrency } from "../../helpers/formatCurrency";
import { formatPresentationVariantLabel } from "../../helpers/formatPresentationVariantLabel";
import { isWeightSaleType } from "../../../shared/helpers/saleTypeHelper";
import { getPublicAssetUrl } from "../../../shared/helpers/getPublicAssetUrl";
import EditableNumberCell from "../../../shared/components/DataTable/EditableNumberCell";
import CartProductRowActionCell from "./CartProductRowActionCell";

const CartLineItem = ({ product, onIncrease, onDecrease, onSubtotalChange, onQuantityChange }: CartLineItemProps): ReactNode => {
  const { t } = useTranslation();
  const isWeight = isWeightSaleType(product.sale_type);
  const variantLabel = formatPresentationVariantLabel(product, t);

  return (
    <Box
      component="li"
      sx={(theme: Theme) => ({
        display: "flex",
        alignItems: "center",
        gap: 1,
        py: 1,
        borderBottom: `1px solid ${theme.custom?.darkGray}`,
        listStyle: "none",
      })}
    >
      <Box
        component="img"
        src={product.image_url || getPublicAssetUrl("images/stocko_images/empty_product.png")}
        alt={product.name}
        sx={{ width: 36, height: 36, objectFit: "contain", borderRadius: "0.4em", flexShrink: 0 }}
      />

      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography variant="body2" noWrap sx={(theme: Theme) => ({ color: theme.custom?.fontColor, fontWeight: 600 })}>
          {product.name}
        </Typography>
        <Typography variant="caption" noWrap sx={(theme: Theme) => ({ color: theme.custom?.darkWhite })}>
          {variantLabel} · {formatCurrency(product.price)}
        </Typography>
      </Box>

      {isWeight ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, flexShrink: 0 }}>
          <EditableNumberCell productId={String(product._id)} value={product.stock_required} onChange={onQuantityChange} />
          <Typography variant="caption" sx={(theme: Theme) => ({ color: theme.custom?.darkWhite })}>
            {t("cart.table.weightUnit")}
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, flexShrink: 0 }}>
          <IconButton size="small" onClick={() => onDecrease(String(product._id))} sx={(theme: Theme) => ({ border: `1px solid ${theme.palette.primary.main}` })}>
            <KeyboardArrowDownIcon fontSize="inherit" sx={(theme: Theme) => ({ color: theme.palette.primary.main })} />
          </IconButton>
          <Typography sx={(theme: Theme) => ({ color: theme.palette.primary.main, minWidth: "1.8em", textAlign: "center" })}>
            {product.stock_required}
          </Typography>
          <IconButton size="small" onClick={() => onIncrease(String(product._id))} sx={(theme: Theme) => ({ border: `1px solid ${theme.palette.primary.main}` })}>
            <ExpandLessIcon fontSize="inherit" sx={(theme: Theme) => ({ color: theme.palette.primary.main })} />
          </IconButton>
        </Box>
      )}

      <Box sx={{ minWidth: "4.5em", flexShrink: 0 }}>
        <EditableNumberCell productId={String(product._id)} value={product.subtotal ?? 0} onChange={onSubtotalChange} />
      </Box>

      <CartProductRowActionCell product={product} />
    </Box>
  );
};

export default CartLineItem;
