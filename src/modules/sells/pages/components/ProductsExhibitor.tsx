import { Grid } from "@mui/material";
import type { ProductInterface } from "../../../../typings/sells/sellsTypes";
import ProductItem from "./ProductItem";

const ProductsExhibitor = ({ products }: { products: ProductInterface[] }): React.ReactNode => {
  if (!products || !Array.isArray(products)) return null;

  return (
    <Grid
      container
      sx={{
        margin: { xs: "5em 0.4em 1em", sm: "5em 1em 1em" },
        width: "100%",
        overflow: 'scroll'
      }}
    >
        {products.map((prod: ProductInterface) => 
            (<ProductItem product={prod} key={prod._id}/>)
        )}
    </Grid>
  );
};

export default ProductsExhibitor;
