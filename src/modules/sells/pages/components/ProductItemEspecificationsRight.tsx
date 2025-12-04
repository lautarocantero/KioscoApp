import { Grid } from "@mui/material";
import ProductItemButton from "./ProductItemButton";
import ProductItemAmountData from "./ProductItemAmountData";
import type { ProductVariant } from "../../../../typings/productVariant/productVariant";
import type { EspecificationsRightType } from "../../../../typings/sells/sellsComponentTypes";


const ProductItemEspecificationsRight = ({product} : EspecificationsRightType): React.ReactNode => {

    const {variants} : {variants: ProductVariant[]} = product;

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
            <ProductItemAmountData variants={variants}/>
            <ProductItemButton product={product} />
        </Grid>
    )
}

export default ProductItemEspecificationsRight;