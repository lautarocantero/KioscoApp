import { Box } from "@mui/material";
import ProductsSkeletons from "./ProductsSkeletons";
import EmptyProductsList from "./EmptyProductsList";
import type { ReactNode } from "react";
import { ViewMode } from "@typings/seller/sellerEnums";
import ProductExhibitorTable from "./ProductExhibitorTable";
import type { ProductsExhibitorListProps } from "@typings/seller/sellerComponentTypes";
import type { Product } from "@typings/product/productTypes";
import ProductItemComponent from "../ProductItem/ProductItemComponent";

const ProductsExhibitorList = ({
  products,
  paginatedProducts,
  viewMode = ViewMode.Grid,
  isLoading = false,
  isEmpty = false,
  gridSx,
  columns,
}: ProductsExhibitorListProps): ReactNode => {

  if (isLoading) return <ProductsSkeletons isLoading={isLoading} gridSx={gridSx}/>;

  if (isEmpty) return <EmptyProductsList isEmpty={isEmpty}/>;

  if (viewMode === ViewMode.List) {
    return <ProductExhibitorTable products={products} isLoading={isLoading} columns={columns}/>;
  }

  if (viewMode === ViewMode.Collapsed) {
    return null;
  }

  return (
    <Box sx={gridSx}>
      {paginatedProducts.map((prod: Product) => (
        <ProductItemComponent key={prod._id} product={prod} viewMode={viewMode} />
      ))}
    </Box>
  );
};

export default ProductsExhibitorList;