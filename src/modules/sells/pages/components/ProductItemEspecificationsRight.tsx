import { Grid } from "@mui/material";

import ProductItemAmountData from "./ProductItemAmountData";
import ProductItemButton from "./ProductItemButton";


const ProductItemEspecificationsRight = (): React.ReactNode => {

    return (
        <Grid 
            container 
            display={'flex'} 
            flexDirection={'column'} 
            alignItems="end"
            justifyContent={'space-between'}
            height={'100%'}
            width={'50%'}
        >
            <ProductItemAmountData />
            <ProductItemButton />
        </Grid>
    )
}

export default ProductItemEspecificationsRight;