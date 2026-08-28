import { Box } from "@mui/material";
import ProductsSkeletons from "./ProductsSkeletons";
import EmptyProductsList from "./EmptyProductsList";
import type { ReactNode } from "react";
import { ViewMode } from "@typings/cart/cartEnums";
import ProductExhibitorTable from "./ProductExhibitorTable";
import DensePresentationList from "./DensePresentationList";
import type { ProductsExhibitorListProps } from "@typings/cart/cartComponentTypes";
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
  presentationRows,
  onAddPresentation,
}: ProductsExhibitorListProps): ReactNode => {

  if (isLoading) return <ProductsSkeletons isLoading={isLoading} gridSx={gridSx}/>;

  if (isEmpty) return <EmptyProductsList isEmpty={isEmpty}/>;

  if (viewMode === ViewMode.List) {
    return <ProductExhibitorTable products={products} isLoading={isLoading} columns={columns}/>;
  }

  if (viewMode === ViewMode.Collapsed) {
    return <DensePresentationList rows={presentationRows} onAdd={onAddPresentation} />;
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