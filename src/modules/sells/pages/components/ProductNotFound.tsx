import { Grid, Typography } from "@mui/material";


const ProductsNotFound = ():React.ReactNode => {
    return (
        <Grid 
            margin={'5em auto'}
        >
            <Typography>No se encontraron Productos...</Typography>
        </Grid>
    )
}

export default ProductsNotFound;