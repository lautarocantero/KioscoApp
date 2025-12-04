import { Grid } from "@mui/material";
import ProductItemData from "./ProductItemData";
import ProductItemImage from "./ProductItemImage";
import type { EspecificationsLeftInterface } from "../../../../typings/sells/sellsComponentTypes";

const ProductItemEspecificationsLeft = ({name = 'product', variants = []} : EspecificationsLeftInterface ): React.ReactNode => {

    return (
        <Grid 
            display="flex" 
            flexDirection={{ md: 'column'}}
            alignItems="center"
            height={'100%'}
            width={{ xs: '50%', md: '100%'}}
            sx={{
                flex: 1,
            }}
        >
            <ProductItemImage />
            <ProductItemData name={name} variants={variants} />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        </Grid>
    )
}

export default ProductItemEspecificationsLeft;