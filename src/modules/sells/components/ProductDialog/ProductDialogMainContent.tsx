import { Box } from "@mui/material";
import React, { type ReactNode } from "react";
import ProductDialogSelector from "./ProductDialogSelector";
import ProductDialogDataComponent from "./ProductDialogDataComponent";
import type { ProductDialogMainContentProps } from "@typings/sells/SellComponentTypes";

const ProductDialogMainContentComponent = ({ 
  product, 
  products, 
}: ProductDialogMainContentProps): ReactNode => {

  const { description } = product;

  return (
    <Box display={'flex'} flexDirection={'column'} gap={2} width={"100%"} sx={{ minHeight: 0, overflow: 'auto' }}>
        <ProductDialogDataComponent
          product={product}
          description={description}
        />

        <ProductDialogSelector
          products={products}
        />
    </Box>
  );
};

export default React.memo(ProductDialogMainContentComponent);