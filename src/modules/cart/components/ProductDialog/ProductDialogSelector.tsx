import { Box, Typography } from "@mui/material";
import React, { type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import ProductDialogSelectorHeaderComponent from "./ProductDialogSelectorHeader";
import ProductDialogTable from "./ProductDialogTable";
import type { ProductDialogSelectorProps } from "@typings/cart/cartComponentTypes";
import useProductDialogSelector from "@hooks/cart/useProductDialogSelector";


const ProductDialogSelectorComponent = ({ product, products }: ProductDialogSelectorProps): ReactNode => {
  const { t } = useTranslation();
  const { isEmpty } = useProductDialogSelector(products, product);

  if (isEmpty) return (<Box><Typography>{t("cart.productDialog.selector.empty")}</Typography></Box>);

  return (
    <Box display={'flex'} flexDirection={'column'} gap={1}>
        <ProductDialogSelectorHeaderComponent products={products} />
        <ProductDialogTable products={products} product={product} />
    </Box>
  );
};

export default React.memo(ProductDialogSelectorComponent);