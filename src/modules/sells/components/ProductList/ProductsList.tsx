import { Box, CircularProgress } from "@mui/material";
import type { Product } from "../../../../typings/product/productTypes";
import ProductItemComponent from "../ProductItem/ProductItemComponent";
import type { ProductListProps } from "@typings/sells/SellComponentTypes";


const ProductsList = ({ products, viewMode = "grid" }: ProductListProps): React.ReactNode => {
  if (products.length === 0) return <CircularProgress />;


  return (
    <Box
      sx={{
        display: viewMode === "grid" ? "grid" : "flex",
        flexDirection: viewMode === "list" ? "column" : undefined,
        gridTemplateColumns:
          viewMode === "grid" ? "repeat(auto-fill, minmax(320px, 1fr))" : undefined,
        gap: 2,
        width: "100%",
      }}
    >
      {products.map((prod: Product) => (
        <ProductItemComponent key={prod._id} product={prod} viewMode={viewMode} />
      ))}
    </Box>
  );
};

export default ProductsList;