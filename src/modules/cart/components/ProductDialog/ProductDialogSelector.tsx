import { Box, Typography } from "@mui/material";
import React, { type ReactNode } from "react";
import ProductDialogSelectorHeaderComponent from "./ProductDialogSelectorHeader";
import ProductDialogTable from "./ProductDialogTable";
import type { ProductDialogSelectorProps } from "@typings/cart/cartComponentTypes";
import useProductDialogSelector from "@hooks/cart/useProductDialogSelector";


const ProductDialogSelectorComponent = ({ product, products }: ProductDialogSelectorProps): ReactNode => {
  const { isEmpty } = useProductDialogSelector(products, product);

  if (isEmpty) return (<Box><Typography>No se han encontrado Productos</Typography></Box>);

  return (
    <Box display={'flex'} flexDirection={'column'} gap={1}>
        <ProductDialogSelectorHeaderComponent products={products} />
        <ProductDialogTable products={products} product={product} />
    </Box>
  );
};

export default React.memo(ProductDialogSelectorComponent);