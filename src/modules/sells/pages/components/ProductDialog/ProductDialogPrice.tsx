import { Grid, Typography } from "@mui/material";
import type { DialogDataPriceType } from "../../../../../typings/sells/sellsComponentTypes";

const ProductDialogPrice = ({values}: DialogDataPriceType): React.ReactNode => {

    if(values?.productId === "") return;

    if(values?.productStock === 0) return;

    return (
        <Grid
            container
            display={'flex'}
            flexDirection={'row'}
            sx={({
                ml: { xs: '0.1em'}
            })}
        >
            <Typography>Total : {values?.productPrice * values?.productStock} $</Typography>
        </Grid>
    )
}

export default ProductDialogPrice;
