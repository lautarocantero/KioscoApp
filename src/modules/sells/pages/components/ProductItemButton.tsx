import { Button, Grid, type Theme } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const ProductItemButton = ():React.ReactNode => {

    return (
        <Grid 
            sx={{ width: {xs: '100%', sm: '50%' }}}
        >
            <Button
                variant="contained"
                size="small"
                sx={(theme: Theme) => ({
                    backgroundColor: theme?.custom?.blackTranslucid,
                    border: `0.1em solid ${theme?.palette?.primary?.main}`,
                    borderRadius: '0.7em',
                    color: theme?.custom?.fontColor,
                    textTransform: "none",
                    fontSize: theme?.typography?.caption?.fontSize,
                    padding: "0.3em 1em",
                    width: { xs: '100%'}
                })}
            >
                Añadir
                <AddShoppingCartIcon 
                    sx={(theme: Theme) => ({
                        backgroundColor: theme?.palette?.primary?.main,
                        borderRadius: '1em',
                        fontSize: theme?.typography?.h2?.fontSize,
                        padding: '0.1em',
                        marginLeft: '0.3em',
                    })}
                />
            </Button>
        </Grid>
    )
}

export default ProductItemButton;