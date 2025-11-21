import { Grid } from "@mui/material";

import ProductItemAmountData from "./ProductItemAmountData";
import ProductItemButton from "./ProductItemButton";


const ProductItemEspecificationsRight = (): React.ReactNode => {

    return (
        <Grid 
            container 
            display={'flex'} 
            flexDirection={'column'} 
            alignItems={{xs: "end", md: 'center'}}
            justifyContent={'space-between'}
            height={'100%'}
            width={{ xs: '50%', md: '100%'}}
            sx={{
                flex: 1,
            }}
        >
            <ProductItemAmountData />
            <ProductItemButton />
        </Grid>
    )
}

export default ProductItemEspecificationsRight;