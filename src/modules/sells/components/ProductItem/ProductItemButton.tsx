//─────────────────── Componente 🧩: ProductItemButton ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Botón de acción para indicar que es interactuable el item.
// Anteriormente este boton mostraba el modal, se movio tras comprobar que los usuarios clickean la imagen en si y no el boton
// esperando que se abra el modal. 

//-----------------------------------------------------------------------------//

import { Button, Grid, type Theme } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const ProductItemButton = ():React.ReactNode => {

    return (
        <Grid 
            container
            sx={{ width: {xs: 'auto', sm: '50%', md: '100%' }}}
        >
            <Button
                variant="contained"
                size="small"
                sx={(theme: Theme) => ({
                    backgroundColor: {xs: theme?.custom?.blackTranslucid, md: theme?.palette?.primary?.main },
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