import { Grid, Typography, type Theme } from "@mui/material"
import QuantityChip from "./ProductItemQuantityChip";

const ProductItemAmountData = ():React.ReactNode => {

    return (
    <Grid
        sx={(theme: Theme) => ({
            backgroundColor: theme?.custom?.blackTranslucid,
            borderRadius: '1em',
            marginBottom: '0.3em',
            padding: '0.2em 0.5em',
        })}
    >
        <Typography
            sx={(theme: Theme) => ({
                fontSize: theme?.typography?.caption?.fontSize,
                marginBottom: "0.5em",
            })}
        >
            <strong>ml</strong> 
            <QuantityChip  color="red" label="2L"/>
            <QuantityChip  color="green" label="1.5L"/>
            <QuantityChip  color="green" label="500ml"/>
        </Typography>
    </Grid>
    )
}

export default ProductItemAmountData;