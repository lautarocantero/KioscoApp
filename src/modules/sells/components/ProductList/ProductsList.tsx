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
          viewMode === "grid" ? "repeat(auto-fill, minmax(230px, 1fr))" : undefined,
        rowGap: 2,         // solo espacio vertical
        columnGap: 0,      // sin espacio horizontal
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