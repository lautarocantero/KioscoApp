import { Box } from "@mui/material";
import type { Product } from "../../../../typings/product/productTypes";
import ProductItemComponent from "../ProductItem/ProductItemComponent";
import ProductsSkeletons from "./ProductsSkeletons";
import EmptyProductsList from "./EmptyProductsList";
import type { ReactNode } from "react";
import type { ProductsExhibitorListProps } from "@typings/sells/SellComponentTypes";
import { ViewMode } from "@typings/seller/sellerEnums";
import ProductExhibitorTable from "./ProductExhibitorTable";

const ProductsExhibitorList = ({
  products,
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

  return (
    <Box sx={gridSx}>
      {products.map((prod: Product) => (
        <ProductItemComponent key={prod._id} product={prod} viewMode={viewMode} />
      ))}
    </Box>
  );
};

export default ProductsExhibitorList;