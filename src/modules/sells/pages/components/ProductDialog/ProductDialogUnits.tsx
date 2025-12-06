import { Grid } from "@mui/material";
import NumberField from "../../../../shared/components/NumberField/NumberField";
import type { DialogDataDisplayType } from "../../../../../typings/sells/sellsComponentTypes";

const ProductDialogUnits = ({values,setFieldValue, label }: DialogDataDisplayType ): React.ReactNode => {

    if(values?.productId === "") return;

    return (
        <Grid
            container
            display={'flex'}
            flexDirection={'row'}
        >
            <NumberField 
                label={label}
                min={1}
                max={values?.productAvailableStock}
                size="small"
                defaultValue={0}
                onValueChange={(val: number | null) => {
                    if(val !== null)
                        setFieldValue('productStock', String(val))
                }}
            />
        </Grid>
    )
}

export default ProductDialogUnits;
