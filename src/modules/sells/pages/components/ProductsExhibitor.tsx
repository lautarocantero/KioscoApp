import { Grid, Typography, type Theme } from "@mui/material";
import type { ProductInterface } from "../../../../typings/sells/sellsTypes";
import ProductsList from "./ProductsList";
import ProductsNotFound from "./ProductNotFound";

const ProductsExhibitor = ({ products, title }: { products: ProductInterface[], title: string }): React.ReactNode => {
  if (!products || !Array.isArray(products)) return <ProductsNotFound />;

  return (
    <Grid
      container
      spacing={{ xs: 1, md: 2 }}
      sx={(theme: Theme) => ({
        position: 'relative',
        backgroundColor: theme?.custom?.backgroundDark,
        borderRadius: '1em',
        margin: { xs: "5em 0.4em 1em", md: "5em auto 1em"},
        padding: { xs: '0.1em' ,md: '0.5em'},
        width: { xs: '100%', md: '90%'},
      })}
    > 
      <Typography 
        sx={(theme: Theme) => ({ 
          position: 'absolute',
          top: '0.5em',
          left: '0.5em',
          color: theme?.custom?.fontColorTransparent,
          fontWeight: 600,
          zIndex: 1,
        })}
      >
        {title}
      </Typography>
      <ProductsList products={products}/>
    </Grid>
  );
};

export default ProductsExhibitor;
