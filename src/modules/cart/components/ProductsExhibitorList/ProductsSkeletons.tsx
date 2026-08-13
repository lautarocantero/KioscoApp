// ProductsSkeletons.tsx
import { Box } from "@mui/material";
import type { ReactNode } from "react";
import ProductItemSkeleton from "./ProductsItemSkeleton";
import type { ProductsSkeletonsProps } from "@typings/cart/cartComponentTypes";
import { SKELETON_COUNT } from "../../../../config/constants";


const ProductsSkeletons = ({ isLoading = false, gridSx }: ProductsSkeletonsProps): ReactNode => {

  if (!isLoading) return null;

  return (
    <Box sx={gridSx}>
      {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
        <ProductItemSkeleton key={i} />
      ))}
    </Box>
  );
};

export default ProductsSkeletons;