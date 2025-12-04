import { Grid, Typography, type Theme } from "@mui/material";
import ProductDialogImage from "./ProductDialogImage";

const ProductDialogIlustration = ({name}: {name: string}):React.ReactNode => {

    return (
        <Grid
          container
          sx={(theme: Theme) => ({
            backgroundColor: theme?.custom?.backgroundDark,
            borderRadius: '1em',
            padding: 1,
          })}
        >
            <ProductDialogImage />
            <Typography
                sx={(theme: Theme) => ({
                    fontSize: theme?.typography?.body1?.fontSize,
                    margin: '2em 0 1em',
                    textAlign: 'center',
                })}
            >
                {name}
            </Typography>
        </Grid>
    )
}

export default ProductDialogIlustration;