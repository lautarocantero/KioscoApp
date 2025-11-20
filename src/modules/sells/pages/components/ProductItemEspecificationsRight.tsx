import { Grid } from "@mui/material";

import ProductItemAmountData from "./ProductItemAmountData";
import ProductItemButton from "./ProductItemButton";


const ProductItemEspecificationsRight = (): React.ReactNode => {

    return (
        <Grid 
            container 
            display={'flex'} 
            flexDirection={'column'} 
            alignItems="center"
            height={'100%'}
            // size={6}
        >
            <ProductItemAmountData />
            <ProductItemButton />
        </Grid>
    )
}

export default ProductItemEspecificationsRight;