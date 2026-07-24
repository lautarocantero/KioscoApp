import { Box, Typography } from "@mui/material";
import type { ProductDialogSelectorProps } from "@typings/sells/SellComponentTypes";
import React, { type ReactNode } from "react";
import useProductDialogSelector from "../../../../hooks/sells/useProductDialogSelector";
import ProductDialogSelectorHeaderComponent from "./ProductDialogSelectorHeader";
import ProductDialogTable from "./ProductDialogTable";

const ProductDialogSelectorComponent = ({ products }: ProductDialogSelectorProps): ReactNode => {
  const {
    isEmpty,
  } = useProductDialogSelector(products);

  if (isEmpty) return (<Box><Typography>No se han encontrado Productos</Typography></Box>);

  return (
    <Box display={'flex'} flexDirection={'column'} gap={1}>

        <ProductDialogSelectorHeaderComponent products={products} />

        <ProductDialogTable products={products}/>
    </Box>
  );
};

export default React.memo(ProductDialogSelectorComponent);