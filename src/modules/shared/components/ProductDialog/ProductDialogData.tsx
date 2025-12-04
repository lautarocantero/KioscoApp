import { Grid } from "@mui/material";
// import ProductDialogDataDisplay from "./ProductDialogDataDisplay";
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ProductDialogSelector from "./ProductDialogSelector";
import type { ProductVariant } from "../../../../typings/productVariant/productVariant";

const ProductDialogData = ( {products} : {products: ProductVariant[]} ):React.ReactNode => {

    return (
        <Grid
            container
            display={'flex'}
            flexDirection={'column'}
            spacing={1}
            sx={{
                mt: '2em',
            }}
        >
            <ProductDialogSelector products={products} />
            {/* <ProductDialogDataDisplay data={`${stock}`} label={'Unidades: '}/> */}
            {/* <ProductDialogDataDisplay data={`${price}`} label={'Total: '} icon={<AttachMoneyIcon />}/> */}
        </Grid>
    )
};

export default ProductDialogData;