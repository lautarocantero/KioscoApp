import { Grid } from "@mui/material";
// import SimpleDialogDataDisplay from "./SimpleDialogDataDisplay";
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SimpleDialogSelector from "./SimpleDialogSelector";
import type { ProductVariant } from "../../../../typings/productVariant/productVariant";

const SimpleDialogData = ( {products} : {products: ProductVariant[]} ):React.ReactNode => {

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
            <SimpleDialogSelector products={products} />
            {/* <SimpleDialogDataDisplay data={`${stock}`} label={'Unidades: '}/> */}
            {/* <SimpleDialogDataDisplay data={`${price}`} label={'Total: '} icon={<AttachMoneyIcon />}/> */}
        </Grid>
    )
};

export default SimpleDialogData;