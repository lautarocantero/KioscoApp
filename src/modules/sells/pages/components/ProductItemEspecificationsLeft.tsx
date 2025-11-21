import { Grid } from "@mui/material";
import type { ProductEspecifications } from "../../../../typings/sells/sellsTypes";
import ProductItemData from "./ProductItemData";
import ProductItemImage from "./ProductItemImage";

const ProductItemEspecificationsLeft = ({name = 'product', stock = 0, price = 0} : ProductEspecifications): React.ReactNode => {

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
            <ProductItemData title={name} stock={stock} price={price} />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        </Grid>
    )
}

export default ProductItemEspecificationsLeft;