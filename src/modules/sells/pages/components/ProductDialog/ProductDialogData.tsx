import { Box } from "@mui/material";
import ProductDialogSelector from "./ProductDialogSelector";
import type { DialogDataType } from "../../../../../typings/sells/sellsComponentTypes";
import ProductDialogUnits from "./ProductDialogUnits";
import ProductDialogPrice from "./ProductDialogPrice";

const ProductDialogData = ( {products, values, setFieldValue } : DialogDataType ):React.ReactNode => {

    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            component={'form'}
            sx={{
                m: '2em 0.2em 0em',
            }}
            gap={2}
        >
            <ProductDialogSelector 
                products={products} 
                values={values}
                setFieldValue={setFieldValue}
            />
             <ProductDialogUnits
                values={values}
                setFieldValue={setFieldValue}
                label={'Unidades'}
             />
              <ProductDialogPrice
                values={values}
             />
        </Box>
    )
};

export default ProductDialogData;



