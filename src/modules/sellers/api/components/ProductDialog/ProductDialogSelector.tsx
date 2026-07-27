import { Box, Typography } from "@mui/material";
import React, { type ReactNode } from "react";
import ProductDialogSelectorHeaderComponent from "./ProductDialogSelectorHeader";
import ProductDialogTable from "./ProductDialogTable";
import useProductDialogSelector from "../../../../../hooks/sellers/useProductDialogSelector";
import type { ProductDialogSelectorProps } from "@typings/seller/sellerComponentTypes";


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