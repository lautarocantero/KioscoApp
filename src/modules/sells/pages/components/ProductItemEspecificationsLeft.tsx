import { Grid } from "@mui/material";
import type { ProductImage } from "../../../../typings/sells/sellsTypes";
import ProductItemData from "./ProductItemData";
import ProductItemImage from "./ProductItemImage";

const ProductItemEspecificationsLeft = ({name, stock} : ProductImage): React.ReactNode => {

    return (
        <Grid 
            display="flex" 
            alignItems="center"
            height={'100%'}
            width={'50%'}
        >
            <ProductItemImage />
            <ProductItemData title={name} stock={stock}/>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        </Grid>
    )
}

export default ProductItemEspecificationsLeft;