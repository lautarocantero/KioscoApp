// ProductsSkeletons.tsx
import { Box } from "@mui/material";
import type { ReactNode } from "react";
import ProductItemSkeleton from "./ProductsItemSkeleton";
import { SKELETON_COUNT } from "../../../../config/constants";
import type { ProductsSkeletonsProps } from "@typings/sells/SellComponentTypes";
import { useProductsExhibitor } from "../../../../hooks/sells/useProductsExhibitor";


const ProductsSkeletons = ({ isLoading = false }: ProductsSkeletonsProps): ReactNode => {
  const { gridSx } = useProductsExhibitor();

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