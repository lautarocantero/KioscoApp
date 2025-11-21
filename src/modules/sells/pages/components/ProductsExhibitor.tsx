import { Grid } from "@mui/material";
import type { ProductInterface } from "../../../../typings/sells/sellsTypes";
import ProductItem from "./ProductItem";

const ProductsExhibitor = ({ products }: { products: ProductInterface[] }): React.ReactNode => {
  if (!products || !Array.isArray(products)) return null;

  return (
    <Grid
      container
      spacing={{ xs: 1, md: 2 }}
      sx={{
        margin: { xs: "5em 0.4em 1em", md: "5em auto"},
        width: { xs: '100%', md: '90%'},
      }}
    >
        {products.map((prod: ProductInterface) => 
            (<ProductItem product={prod} key={prod._id}/>)
        )}
    </Grid>
  );
};

export default ProductsExhibitor;
