import { Box } from "@mui/material";
import React, { type ReactNode } from "react";
import ProductDialogImageComponent from "./ProductDialogImageComponent";
import ProductDialogMainContentComponent from "./ProductDialogMainContent";
import type { ProductDialogContentProps } from "@typings/seller/sellerComponentTypes";


const ProductDialogContentComponent = ({ 
  product, 
  products, 
}: ProductDialogContentProps): ReactNode => {
  return (
    <Box
        display={'flex'}
        flexDirection={{ xs: 'column', sm: 'row'}}
        gap={2}
        sx={{ height: "100%", minHeight: 0 }}
    >
      <ProductDialogImageComponent product={product} />
      <ProductDialogMainContentComponent product={product} products={products} />
    </Box>
  );
};

export default React.memo(ProductDialogContentComponent);